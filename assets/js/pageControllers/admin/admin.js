$(function() {

    var preview;
    var pieData = [{
        value: 25,
        label: 'Java',
        color: '#811bd6'
    }, {
        value: 10,
        label: 'Scala',
        color: '#9cbaba'
    }, {
        value: 35,
        label: 'HTML',
        color: '#6ae128'
    }];
    var froala_settings = {
        toolbarButtons: ['insert', 'preview', '|'],
        toolbarButtonsMD: ['insert', 'preview', '|'],
        toolbarButtonsSM: ['insert', 'preview', '|'],
        toolbarButtonsXS: ['insert', 'preview', '|']
    }
    var fr = new FileReader;
    var file;

    function initCanvas() {

        $('.chart').each(function(i, chart) {
            new Chart(chart.getContext('2d')).Pie(pieData);
        })
    }
    $('#tags').tagsinput();
    // Построить круговую диаграмму
    $.FroalaEditor.DefineIcon('insert', { NAME: 'pie-chart' });
    $.FroalaEditor.RegisterCommand('insert', {
        title: 'Построить круговую диаграмму',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            this.html.insert('<canvas class="chart" width="300" height="300"></canvas><br>');

            initCanvas();
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
        },

        // Called when the button state might have changed.
        refresh: function($btn) {

            // The current context is the editor instance.
            // console.log(this.selection.element());
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
        .on('froalaEditor.contentChanged', function(e, editor) {
            initCanvas();// Do something here.
        });

    // .on('froalaEditor.image.removed', function(e, editor, $img) {
    //     console.log($img)
    //     $.post('/removeFromTemp', {
    //             src: $img.attr('src')
    //         })
    //         .done(function(data) {
    //             console.log('image was deleted');
    //         })
    //         .fail(function() {
    //             console.log('image delete problem');
    //         });
    // });



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
