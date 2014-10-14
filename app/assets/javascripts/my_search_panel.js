$(document).on('ready page:load', function(){
    $('.goto').click(function(e){
        e.preventDefault();
        var gotourl = $(this).attr('gotourl');
        route(gotourl);
    });
});


