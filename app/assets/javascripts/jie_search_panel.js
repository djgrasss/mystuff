var waterfall_type= {
    'All': 'items',
    'Image': 'images',
    'Text': 'texts'
};
$(document).on('ready page:load', function(){
    $('.search-panel .search-type').click(function(){
        typename = $(this).val();
        if (typename == 'Doc'){
            waterfall_pause();
            $('.wf-container').empty();
            $('.wf_area').off("waterfall");
        }else{
            another_waterfall(waterfall_type[typename]);
        }
    });
});
