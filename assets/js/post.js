$(function() {

    $('#create_post').click(function(e) {
        console.log('clicked');
        $.post('/post/create', {
                title: $('.title').val(),
                description: $('.description').val(),
                content: $('.content').val(),

            })
            .done(function(res) {
              var id = res.id;
              console.log(id);
              var t = $(templatizer["mixins"]["renderCurrentPost"]($('.title').val(),$('.description').val(),id));
              $('.col-md-10').append(t);
            })
            .fail(function() {
    alert( "error" );
  })


    })
})
