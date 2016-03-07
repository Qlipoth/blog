window.Cropper = {
    src: $('#logo'),
    upload: {
        from: '/profile/',
        as: 'cropped',
        to: '/api/upload_cropped',
    },
    defaults: {
        strict: false,
        responsive: true,
        guides: true,
        autoCrop: true,
        autoCropArea: 0.75,
        highlight: false,
        dragCrop: false,
        dragMode:'move',
        cropBoxMovable: false,
        cropBoxResizable: false,
    },
    install: function(params) {

        var me = this;
        _.merge(me, params);

        var $src = me.src;

        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = '/styles/cropper.css';
        link.media = 'all';
        head.appendChild(link);

        $src.append($('<input id="changeLogoInput" type="file" name="files" class="hidden">'))
        $src.append($('<span id="cancelLogo" class="cropperIcon editorIcon tt tooltipstered" title="Edit"><i class="fa fa-close"></i></span>').attr('title',"Отмена"))
        $src.append($('<span id="saveLogo" class="cropperIcon editorIcon tt tooltipstered"><i class="fa fa-crop"></i></span>').attr('title',"Сохранить"))
        $src.append($('<span id="changeLogo" class="cropperIcon tt tooltipstered"><i class="fa fa-pencil"></i></span>').attr('title',"Редактировать"))

        $('#changeLogo').click(function() {
            $('#changeLogoInput').click();
        })

        $('#cancelLogo').click(function() {
            me._installPhotoView(function() {
                me._destroy(function() {
                    console.log('destroyed');
                })
            })
        })

        $('#saveLogo').click(function() {
            var $img = me.src.find('>img');
            var user_id = $("#save_profile").attr('data-id');
            var canvas = $img.cropper('getCroppedCanvas');
            var blob = canvas.toDataURL("image/png", 1); // last - quality

            var formData = new FormData();
            formData.append(me.upload.as, blob);
            formData.append('path', me.upload.from+user_id);

            $.ajax(me.upload.to, {
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                  console.log('done')
                    var newFile = response.filename;
                    var fullPath = '/uploads/tmp'+me.upload.from+user_id;
                    me._installPhotoView(function() {
                        me._destroy(function() {
                            var photo = $img;
                            photo.attr('src', fullPath+'/'+newFile);
                            photo.attr('data-filename', newFile);
                        })
                    })
                },
                error: function(err) {
                    console.error(err)
                }
            });
        })

        $('#changeLogoInput').change(function() {
            var input = this;
            var $img = me.src.find('>img');
            var URL = window.URL || window.webkitURL;
            var files = input.files;
            var file;
            me._installCropperView(function() {
                me._init(function() {
                    if (files && files.length) {
                        file = files[0];
                        if (/^image\/\w+$/.test(file.type)) {
                            blobURL = URL.createObjectURL(file);
                            $img.one('built.cropper', function() {
                                URL.revokeObjectURL(blobURL); // Revoke when load complete
                            }).cropper('reset').cropper('replace', blobURL);
                            $('#changeLogoInput').val('');
                        }
                        else {
                            console.warn('Please choose an image file.', 'warning');
                        }
                    }


                })
            });
        })

    },



    _init: function(cb) {
        var me = this;
        var $img = me.src.find('>img');
        if (!$img.data('cropper')) {
            $img.cropper(_.extend(_.clone(me.defaults), {
                built: cb,
            }));
        }
        else {
            cb();
        }
    },
    _destroy: function(cb) {
        var me = this;
        var $img = me.src.find('>img');
        if ($img.data('cropper')) {
            $img.cropper('destroy');
        }
        $('#acc_box > div').removeClass('full-width');
        cb();
    },
    _installCropperView: function(cb) {
        var me = this;
        var src = me.src;
        var img = src.find('>img');
        img.attr('src', '/images/avatar.png');
        var neighbor = src.next();
        img.css('opacity', '0');
        neighbor
            .removeClass('col-md-8')
            .addClass('col-md-3')

        src
            .removeClass('col-md-3')
            .addClass('col-md-8')
            .addClass('editor')

        setTimeout(function() {
            $('#acc_box > div').addClass('full-width');
            img.css('opacity', '1');
            if (src.hasClass('editor')) {
                src.find('.editorIcon')
                    .css('opacity', '1')
                    .css('display', 'block')
            }
            cb();
        }, 300)
    },
    _installPhotoView: function(cb) {

        var me = this;
        var src = me.src;
        var img = src.find('>img');
        var neighbor = src.next();
        src.find('>.cropper-container')
            .css('opacity', '1')
            .css('transition', 'opacity 0.3s')
            .css('opacity', '0')
        neighbor
            .addClass('col-md-8')
            .removeClass('col-md-3')

        if (src.hasClass('editor')) {
            src.find('.editorIcon')
                .css('opacity', '0')
                .css('display', 'none')
        }

        src
            .addClass('col-md-3')
            .removeClass('col-md-8')
            .removeClass('editor')

        setTimeout(function() {
            cb();
        }, 300)
    },
}
