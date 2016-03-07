$(function(){
 $('#srch_btn').click(function(e) {
        var param = $(this).prev().val();
        window.location = '/search/'+param;
        // var l = window.location = window.location.host+'/search/'+param;
    });
});
