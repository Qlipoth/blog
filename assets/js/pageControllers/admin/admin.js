$(function() {
    $('.color').change(function() {
        $(this).prev().text($(this).val())
        $("h1").css('background', $(this).val());
    });
    var preview;

    var froala_settings = {
        toolbarButtons: [,'insert','preview','popup', '|'],
        toolbarButtonsMD: [,'insert','preview','popup', '|'],
        toolbarButtonsSM: [,'insert','preview','popup', '|'],
        toolbarButtonsXS: [,'insert','preview','popup', '|']
    }
    var pieData = [];

    var fr = new FileReader;
    var file;
    var wp_markup = ['<div class="popup-content">',
        '<div class="col-md-12 form-group"><label>Введите название диаграммы</label><input class="form-control text" type="text"></div>',
        '<div class="col-md-6 form-group">',
        '<label>Введите название единицы</label>',
        '<input class="form-control unit" type="text">',
        '</div>',
        '<div class="col-md-6 form-group">',
        '<label>Значение в %</label>',
        '<input class="form-control" type="number" min="0">',
        '</div>'
    ].join('');
    var wp_addbtn = '<span class="btn btn-info add_b">добавить данные</span>'
    $(document).on('click', '.add_b', function() {
        $(this).prev().append(wp_markup)
    })
    $('#tags').tagsinput();

// добавление попапа(копипаста с сайта)
// Define popup template.
$.extend($.FroalaEditor.POPUP_TEMPLATES, {
  'customPlugin.popup': '[_BUTTONS_][_CUSTOM_LAYER_]'
});

// Define popup buttons.
$.extend($.FroalaEditor.DEFAULTS, {
  popupButtons: ['popupClose', '|'],
});

// The custom popup is defined inside a plugin (new or existing).
$.FroalaEditor.PLUGINS.customPlugin = function (editor) {
  // Create custom popup.
  function initPopup () {
    // Load popup template.
    var template = $.FroalaEditor.POPUP_TEMPLATES.customPopup;
    if (typeof template == 'function') template = template.apply(editor);

    // Popup buttons.
    var popup_buttons = '';

    // Create the list of buttons.
    if (editor.opts.popupButtons.length > 1) {
      popup_buttons += '<div class="fr-buttons">';
      popup_buttons += editor.button.buildList(editor.opts.popupButtons);
      popup_buttons += '</div>';
    }

    // Load popup template.
    var template = {
      buttons: popup_buttons,
      custom_layer: wp_addbtn
    };

    // Create popup.
    var $popup = editor.popups.create('customPlugin.popup', template);

    return $popup;
  }

  // Show the popup
  function showPopup () {
    // Get the popup object defined above.
    var $popup = editor.popups.get('customPlugin.popup');

    // If popup doesn't exist then create it.
    // To improve performance it is best to create the popup when it is first needed
    // and not when the editor is initialized.
    if (!$popup) $popup = initPopup();

    // Set the editor toolbar as the popup's container.
    editor.popups.setContainer('customPlugin.popup', editor.$tb);

    // If the editor is not displayed when a toolbar button is pressed, then set BODY as the popup's container.
    // editor.popups.setContainer('customPlugin.popup', $('body'));

    // Trigger refresh for the popup.
    // editor.popups.refresh('customPlugin.popup');

    // This custom popup is opened by pressing a button from the editor's toolbar.
    // Get the button's object in order to place the popup relative to it.
    var $btn = editor.$tb.find('.fr-command[data-cmd="popup"]');

    // Compute the popup's position.
    var left = $btn.offset().left + $btn.outerWidth() / 2;
    var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

    // Show the custom popup.
    // The button's outerHeight is required in case the popup needs to be displayed above it.
    editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
  }

  // Hide the custom popup.
  function hidePopup () {
    editor.popups.hide('customPlugin.popup');
  }

  // Methods visible outside the plugin.
  return {
    showPopup: showPopup,
    hidePopup: hidePopup
  }
}

// Define an icon and command for the button that opens the custom popup.
$.FroalaEditor.DefineIcon('popup', { NAME: 'star'})
$.FroalaEditor.RegisterCommand('popup', {
  title: 'Show Popup',
  undo: false,
  focus: false,
  plugin: 'customPlugin',
  callback: function () {
    this.selection.save();
    this.customPlugin.showPopup();
  }
});

// Define custom popup close button icon and command.
$.FroalaEditor.DefineIcon('popupClose', { NAME: 'times' });
$.FroalaEditor.RegisterCommand('popupClose', {
  title: 'Close',
  undo: false,
  focus: false,
  callback: function () {
    this.customPlugin.hidePopup();
    this.selection.restore();
  }
});


        // нарисовать картинку графика
    function initCanvas(text) {
        $('.chart').highcharts({
            chart: {
                animation: false,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },
            title: {
                text: text
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    animation: false,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: pieData.pop()
            }]
        });
        var src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent($('.chart').highcharts().getSVG())));
        $('.chart').remove();
        return src
    }

    // Построить круговую диаграмму
    $.FroalaEditor.DefineIcon('insert', { NAME: 'pie-chart' });
    $.FroalaEditor.RegisterCommand('insert', {
        title: 'Построить круговую диаграмму',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            var self = this;

            self.html.insert('<div class="chart"></div>');
            self.selection.save();
            // initCanvas();
            return mp.confirm(wp_addbtn, function() {

                var arr = [];
                $('.popup-content').each(function(i, el) {
                    $el = $(el);
                    var data = {
                        y: parseFloat($el.find('input[type="number"]').val()),
                        name: $el.find('.unit').val(),
                    }
                    arr.push(data);
                })
                if (arr.length) {
                    pieData.push(arr)
                }
                var text = $('.text').val();
                var src = initCanvas(text);
                setTimeout(function() {

                    $('.fr-view p').last().append('<img class="fr-dib" alt="pic" src=' + src + '><br>&nbsp;');

                    // $('#content').froalaEditor('html.insert', '<img class="fr-dib" alt="pic" src=' + src + '>', false);
                }, 100)

            });
        }
    });
    $.FroalaEditor.DefineIcon('preview', { NAME: 'newspaper-o' });
    $.FroalaEditor.RegisterCommand('preview', {
        // Button title.
        title: 'Превью',
        // Save the button action into undo stack.
        undo: true,
        // Focus inside the editor before the callback.
        focus: true,
        // Refresh the buttons state after the callback.
        refreshAfterCallback: true,
        // Called when the button is hit.
        callback: function() {
            this.html.insert('<hr>');
        }
    });

  

    
    fr.onload = function(e) {
        console.log(e);
        var str = e.target.result;
        if (str.indexOf('image/jpeg') !== -1) {
            $('#content').froalaEditor('html.insert', '<img class="fr-dib" style="width:300px;" src=' + str + ' alt ="inserted">', false);
        } else {
            $('#content').froalaEditor('html.insert', '<a class="fr-file"  href=' + str + '>' + file.name + '</a>', false);
            console.log('file')
                // $('.progress').remove();
        }
    }
    $('#content').froalaEditor(_.mergeWith(window.froala_defaults, froala_settings))
        .on('froalaEditor.image.beforeUpload', function(e, editor, images) {
            console.log(images[0])

            if (images) {
                file = images[0];
                fr.readAsDataURL(file);
            }
            return false
                // Return false if you want to stop the image upload.
        })
        .on('froalaEditor.file.beforeUpload', function(e, editor, files) {
            console.log(files[0])
            if (files) {
                file = files[0];
                console.log(fr.readAsDataURL(file));
            }
            return false
                // Return false if you want to stop the image upload.
        })
        .on('froalaEditor.image.error', function(e, editor, error, response) {
            // Bad link.
            if (error.code == 1) { console.log('err1') }

            // No link in upload response.
            else if (error.code == 2) { console.log('err2') }

            // Error during image upload.
            else if (error.code == 3) { console.log('err3') }

            // Parsing response failed.
            else if (error.code == 4) { console.log('err4') }

            // Image too text-large.
            else if (error.code == 5) { console.log('err5') }

            // Invalid image type.
            else if (error.code == 6) { console.log('err6') }

            // Image can be uploaded only to same domain in IE 8 and IE 9.
            else if (error.code == 7) { console.log('err7') }

            // Response contains the original server response to the request if available.
        })
        // создание поста
    $('#create_post').click(function(e) {

        var post = $('#content').froalaEditor('html.get', true).split('<hr>');
        var preview = post.splice(0, 1).join();
        var content = post.join('<hr>');
        var tags = [];

        $('.tag').each(function(item) {
            tags.push($(this).text());
        });
        console.log($('#content').froalaEditor('html.getSelected'))

        $.post('/post/create', {
                title: $('#title').val(),
                tags: tags,
                description: preview,
                content: content,
            })
            .done(function(res) {

                window.location = '/post/watch/' + res.post_id;
            })
            .fail(function() {
                alert("error");
            });
    });
    // удаление
    $('.delete_button').click(function(e) {
        var $remove_button = $(this);
        var id = $remove_button.attr('data-id');
        var title = $remove_button.parent().prev().find('a').text();
        console.log(id, title);
        $.post('/post/delete/', {
                id: id,
                title: title
            })
            .done(function(res) {
                console.log('done', res)
                $remove_button.closest('tr').remove();
            })
            .fail(function() {
                alert("error");
            });
    })
});
