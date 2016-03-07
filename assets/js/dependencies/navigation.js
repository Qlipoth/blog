$(function() {
    var i_am_here = window.location.pathname.split('/')[1];
    console.log(i_am_here)
    if (!i_am_here) {
        $('#nav li').first().addClass('active');
    }
    $('#nav li a').each(function() {
        var el = $(this);
        if (i_am_here && el.attr('href').indexOf(i_am_here) !== -1) {
            el.parent().addClass('active');
            // return false;
        }
    })
})
