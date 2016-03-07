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
        htmlAllowedEmptyTags: ['canvas'],
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
