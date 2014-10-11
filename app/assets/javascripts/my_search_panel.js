var waterfall_type= {
    'All': 'items',
    'Image': 'images',
    'Text': 'texts'
};
$(document).on('ready page:load', function(){
    $('.search-panel .search-type').click(function(){
        clear_stuff_container();
        typename = $(this).val();
        if (typename == 'Doc'){
            $.getJSON('/documents.json',
                {},
                function (data, textStatus, jqXHR) {
                    if (data && data.status === 0){
                        var template = $("#documents-tpl").getTemplate();
                        $('.table-container').prepend(template(data));
                        doc_binding();
                    }
                }
            );
        }else if (typename == 'Calendar'){
            var template = $("#events-tpl").getTemplate();
            $('.calendar-container').prepend(template);
            calendar_display($('#calendar'));
            bind_calendar_event();
        }else{
            waterfall_it(waterfall_type[typename]);
        }
    });
});


