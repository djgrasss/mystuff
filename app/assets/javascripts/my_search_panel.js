var waterfall_types= ['items','images', 'texts'];
var colorbox_types=['/signup'];
var html_types=['/help', '/team', '/signin'];
$(document).on('ready page:load', function(){
    $(".inlinecb").colorbox({inline:true});
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
        }else if ($.inArray(gotourl, html_types) !== -1) {
            $.get(gotourl,
                {},
                function (data, textStatus, jqXHR) {
                    if (signedin(data)) $('.html-container').prepend(data);
                    if (gotourl === "/signin"){
                        $(".inlinecb").colorbox({inline:true});
                        $signinform = $('#signin form');
                        $signinform.find(':submit').click(function(e){
                            e.preventDefault();
                            var data = $signinform.serializeFormJSON();
                            console.log(data);
                            $.ajax({
                                url: '/sessions',
                                type: 'post',
                                dataType: 'json',
                                data: data,
                                success: function (data, textStatus, jqXHR) {
                                    console.log(data);
                                    if (data.status_code === 0){
                                        window.location = "/";
                                    }else{
                                        alert("your login is not correct");
                                    }
                                }
                            });
                        })
                    }
                }
            );
        }else if ($.inArray(gotourl, waterfall_types) !== -1){
            waterfall_it(gotourl);
        }else if ($.inArray(gotourl, colorbox_types) !== -1){
        }
    });
});


