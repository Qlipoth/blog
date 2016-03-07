$(function() {
    $('.remove_comment').click(function(e) {
        var arr = [];

        var com_id = $(this).attr('data-id');
        arr.push(com_id)
        findChildren($(this), arr);
        $(this).addClass('deleted_comment');
        $.post('/remove_comment', {
                comments: arr
            })
            .done(function(res) {
                $('.deleted_comment').closest('.comment').remove();
            })
            .fail(function() {
                alert("error");
            })
    })
})

function findChildren(el, arr) {
    var rez = el.closest('.comment').find('.comment')
    if (rez.attr('data-id')) {
        arr.push(rez.attr('data-id'));
    }
    if (el.length) {
        return findChildren(rez, arr)
    } else {
        return arr
    }

}
