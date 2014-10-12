var waterfall_types= ['items','images', 'texts'];
var other_types=['/help', '/team', '/signin', '/signup'];
$(document).on('ready page:load', function(){
    $('.goto').click(function(e){
        e.preventDefault();
        var gotourl = $(this).attr('gotourl');
        if (gotourl !== '/signin' && gotourl !== '/signup' && !check_signedin()) return;
        clear_stuff_container();
        console.log(gotourl);
        if (gotourl == '/documents'){
            $.getJSON('/documents.json',
                {},
                function (data, textStatus, jqXHR) {
                    if (data  && data.status === 0 ){
                        var template = $("#documents-tpl").getTemplate();
                        $('.table-container').prepend(template(data));
                        doc_binding();
                    }
                }
            );
        }else if (gotourl == '/events'){
            var template = $("#events-tpl").getTemplate();
            $('.calendar-container').prepend(template);
            calendar_display($('#calendar'));
            bind_calendar_event();
        }else if ($.inArray(gotourl, other_types) !== -1) {
            $.get(gotourl,
                {},
                function (data, textStatus, jqXHR) {
                    if (signedin(data)) $('.html-container').prepend(data);
                }
            );
        }else if ($.inArray(gotourl, waterfall_types) !== -1){
            waterfall_it(gotourl);
        }
    });
});


