installMP();
installJQMethods();
$(function() {

    $("#my_search").autocomplete({
        source: function(request, response) {
            // организуем кроссдоменный запрос
            $.ajax({
                url: "/persons",
                // параметры запроса, передаваемые на сервер (последний - подстрока для поиска):
                data: {
                    search: request.term
                },
                // обработка успешного выполнения запроса
                success: function(data) {
                    window.results = data
                    console.log('done', data)
                        // приведем полученные данные к необходимому формату и передадим в предоставленную функцию response
                    response($.map(data, function(item) {
                            return {
                                name: item.name,
                                image: item.image,
                                other: "other info"
                            }
                        }

                    ));
                }
            });
        },
        minLength: 2,
        create: function() {
            $(this).data('ui-autocomplete')._renderItem = function(ul, item) {
                console.log(item)
                var str = [];

                str = '<li class="col-md-12 row form-group clearfix"><div class="col-md-1"><img class ="img-fluid"src="/images/' + item.image + '"/></div><div class="col-md-11"><p>' + item.name + '</p><p>' + item.other + '</p></div></li>'
                return $(str).appendTo(ul);

            };
        },
        focus: function(e, ui) {
            $(this).val(ui.item.name)
            console.log($(this), ui);
            return false
        },
        select: function(e, ui) {
            $(this).val(ui.item.name)
            window.location = '/post'
            return false
        }
    });
    $('.ui-autocomplete').addClass('clearfix row')

    window.froala_defaults = {
        htmlAllowedEmptyTags: ['div'],
        language: 'ru',
        // imageUploadParam: 'file',
        imagePaste: false,
        // Set the image upload URL.
        // imageUploadURL: '/',

        // Set request type.
        // imageUploadMethod: 'POST',

        // Allow to upload PNG and JPG.
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
        toolbarButtonsMD: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
        toolbarButtonsSM: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
    }
})

function changeimg(str) {

        if (typeof str === "object") {
            str = str.target.result; // file reader
             window.editor.html.insert('<img style="width:300px;" src=' + (str).toString() + ' alt ="inserted">');
        }
}
/////////////////////
// Magnific Popups //
/////////////////////
function installMP() {
    // magnific popups
    window.mp = {};
    // замена стандартному алерту
    window.mp.alert = function(html) {
        var popup = $('<div></div>');
        popup.addClass('white-popup');
        // popup.append('<h3>Внимание!</h3>');
        popup.append(html);

        $.magnificPopup.open({
            items: {
                src: popup,
                type: 'inline'
            }
        });
    }
    // замена стандартному confirm
    window.mp.confirm = function(html, cb) {
        var popup = $('<div class="white-popup-block"></div>');
        popup.append('<div class="col-md-12 form-group row"><label>Введите название диаграммы</label><input class="form-control text" type="text"></div>');
        popup.append('<div class="wp-wrapper"></div>');
        popup.append(html);

        var btns = $('<div></div>');
            var ok = $('<span class="btn btn-secondary">ОК</span>');
                ok.bind('click', function() {
                    cb();
                    $.magnificPopup.close();
                });
            var cancel = $('<span class="btn btn-secondary">Отмена</span>');
                cancel.bind('click', function() {
                    $.magnificPopup.close();
                });
            btns.append(ok);
            btns.append(cancel);
        popup.append(btns);

        $.magnificPopup.open({
            items: {
                src: popup,
                type: 'inline'
            },
            modal: true
        });
    }
}

// JQuery methods on elements $().mask(), ...
function installJQMethods() {
    // disable interface parts
    $.fn.mask = function(state) {
        if(state === undefined || state) {
            // add mask
            var mask = $("<div id='mask'><img src='/images/loading.gif'/></div>");
            if (this.find('#mask').length > 0) return;
            this.append(mask);

        }
        else {
            // remove mask
            this.find('#mask').fadeOut(500, function(){ $(this).remove();});
        }

        $('#mask img').css('margin-top',($('body').scrollTop())+200);
    }
    $.fn.unmask = function() {
        this.mask(false);
    }

    // уведомление об результате действия
    // state - true/false (success/fail)
    // cb - cb.
    $.fn.done = function(state, cb) {
        var el = this;
        if (typeof cb !== 'function') cb = function() {};
        var mask;
        if(state) {
            mask = $("<div id='done'><img src='/img/success.png' /></div>");
        }
        else {
            mask = $("<div id='done'><img src='/img/fail.png' /></div>");
        }
        if (el.find('#done').length > 0) return;
        el.append(mask);
        setTimeout(function() {
            el.find('#done').fadeOut(200, function(){ $(this).remove();});
            cb();
        }, 300);
    }
}
