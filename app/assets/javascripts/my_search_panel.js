$(document).on('ready page:load', function(){
    $(document).on('click', '.goto', function(e){
        e.preventDefault();
        var gotourl = $(this).attr('gotourl');
        route(gotourl);
    });
});


