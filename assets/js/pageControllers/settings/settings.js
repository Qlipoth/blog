$(function(){
    Cropper.install({
        src: $('#avatar'),
        upload: {
            from: '/profile/',
            as: 'cropped',
            to: '/api/upload_cropped',
        },
        defaults: {
            aspectRatio: 150 / 174,
        },
    });
  $('#save_profile').click(function(e) {
        e.preventDefault();
        var email;
        var password = $('#password').val();
        var id = $(this).attr('data-id');
        if ($("#conf_password").val() === password){
          email = $("#email").val();
        }
        else{
          alert('Пароли не совпадают!!!');
          return 0
        }


        $.post('/update_user', {
                email:email,
                password: password,
                id: id
            })
            .done(function(res) {
              console.log('done',res)
                window.location = '/settings';
            })
            .fail(function() {
                alert("error");
            });
    });
});

$('#avatar img').click(function(e) {
        $('#avatar .file').click();
    });

    $('#avatar .file').change(function(e) {
        $('#avatar form').submit();
    });
