$(function() {
    $('.send').click(function(e) {
      e.preventDefault();
      $(this).closest('form').addClass('answered')
        var com_id = $(this).parent().closest('.answer-wrapper').parent().find('.answer_comment').attr('data-id');
        console.log(com_id)

          var post_id = $('.answered').find('.post_id').val()
        $.post('/create_comment', {
                comment: com_id,
                content: $('.answered').find('.form-control').val(),
                com_author: $('.answered').find('.com_author').val(),
                post_id: $('.answered').find('.post_id').val()
            })
            .done(function(res) {
                console.log('ответил!!!')
                window.location = '/post/watch/'+post_id
            })
            .fail(function() {
                alert("error");
            })
    })

    
})
