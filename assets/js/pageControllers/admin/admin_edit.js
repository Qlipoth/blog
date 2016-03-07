$(function() {

    $('#tags').tagsinput();

    var preview;
    // добавление кнопки "Превью"
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
            this.html.insert('<hr>\n');
        },

        // Called when the button state might have changed.
        refresh: function($btn) {
            // The current context is the editor instance.
            // console.log(this.selection.element());
        }
    });
    // Добавление кнопки построения графиков
    $.FroalaEditor.DefineIcon('сhart', { NAME: 'pie-chart' });
    $.FroalaEditor.RegisterCommand('сhart', {
        // Button title.
        title: 'Построение графиков',
        // Save the button action into undo stack.
        undo: true,
        // Focus inside the editor before the callback.
        focus: true,
        // Refresh the buttons state after the callback.
        refreshAfterCallback: true,
        // Called when the button is hit.
        callback: function() {
            // this.html.insert('<hr>\n');
        },

        // Called when the button state might have changed.
        refresh: function($btn) {
            // The current context is the editor instance.
            // console.log(this.selection.element());
        }
    });
    var froala_settings = {
        toolbarButtons: ['preview','chart','|'],
        toolbarButtonsMD: ['preview','chart','|'],
        toolbarButtonsSM: ['preview','chart','|'],
        toolbarButtonsXS: ['preview','chart','|'],
    }

    var fr = new FileReader;
    fr.onload = function(e) {
        $('#content').froalaEditor('html.insert', '<img class="fr-dib" style="width:300px;" src=' + e.target.result + ' alt ="inserted">', false);
    }
    $('#content').froalaEditor(_.mergeWith(window.froala_defaults, froala_settings))
        .on('froalaEditor.image.beforeUpload', function(e, editor, images) {
            var file;
            if (images) {
                file = images[0];
                fr.readAsDataURL(file);
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

    $('#content').froalaEditor('html.insert', window.post.description, false);
    $('#content').froalaEditor('html.insert', '<hr>' + window.post.content, false);

    $('#update').click(function(e) {

        var post = $('#content').froalaEditor('html.get', true).split('<hr>');
        var preview = post.splice(0, 1).join();
        var content = post.join('<hr>');
        var tags = [];
        var $update = $(this);
        var id = $update.attr('data-id');
        var title = $('#title').val();

        $('.tag').each(function(item) {
            tags.push($(this).text());
        });

        $.post('/post/update', {
                id: id,
                title: title,
                tags: tags,
                description: preview,
                content: content
            })
            .done(function(res) {
                console.log('done')
                window.location = '/admin';
            })
            .fail(function() {
                alert("error");
            });
    })
})
