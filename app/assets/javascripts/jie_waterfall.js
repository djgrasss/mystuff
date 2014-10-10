function waterfall_pause(){
    $('.wf-area').each(function(index){
        $(this).waterfall('pause', function () {
            $('#waterfall-message').html('<p style="color:#666;">no more data...</p>');
        });
    });
}
function waterfall_it(wf_type){
    var wf_container = $('.wf-container').empty();
    var wf_area = $('<div class="wf-area" style="width: 1000px; margin: 0 auto;"></div>');
    wf_container.prepend(wf_area);
    wf_area.waterfall({
        itemCls: 'item',
        colWidth:222,
        gutterWidth:15,
        fitWidth:false,
        checkImagesLoaded:false,
        callbacks: {
            loadingFinished: function($loading, isBeyondMaxPage) {
                if ( !isBeyondMaxPage ) {
                    $loading.fadeOut();
                } else {
                    $loading.hide();
                    $('#page-navigation').show();
                }

                var count=0;
                var eruption=function() {
                    if (count<3) {
                        $('img').resize();
                        count++;
                    }
                    else
                        clearInterval(erupt);
                };
                var erupt=setInterval(eruption, 500);
                txt_wrap();
                tofu_bind();
                fancybox();
            },
            renderData: function (data, dataType) {
                var tpl,template;

                if (data.total < 30) {
                    waterfall_pause();
                } 

                if (data.total > 0){
                    if (dataType === 'json' || dataType === 'jsonp') { // json or jsonp format
                        tpl = $('#' + wf_type + '-waterfall-tpl').html();
                        template = Handlebars.compile(tpl);
                        return template(data);
                    } else { // html format
                        return data;
                    }
                }


            }
        },
        path:function(page) {
            return '/' + wf_type + '.json?page=' + page;
        }
    });
}
function another_waterfall(type){
    waterfall_pause();
    $('.wf_area').off("waterfall");
    waterfall_it(type);
}
