// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function(){
    $('#container').waterfall({
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
                    if (count<10) {
                        $('img').resize();
                        count++;
                    }
                    else
                        clearInterval(erupt);
                };
                var erupt=setInterval(eruption, 500);
                txt_wrap();
            },
            renderData: function (data, dataType) {
                var tpl,template;
//                data['image'].each(function(key, value){
//                })
//                var result = $.merge(data['image'], data['text']);
//                result.sort(function(item1, item2){
//                    return item1["id"] - item2["id"]
//                })
                console.log(JSON.stringify(data))
//                data['result'] = result
                if ( dataType === 'json' ||  dataType === 'jsonp'  ) { // json or jsonp format
                    if ( data.total < 20) {
                        //setTimeout(function() {
                        $('#container').waterfall('pause', function () {
                            $('#waterfall-message').html('<p style="color:#666;">no more data...</p>');
                            //alert('no more data');
                        });
                        // },500);
                    }

                    tpl = $('#waterfall-tpl').html();
                    template = Handlebars.compile(tpl);
                    return template(data);
                } else { // html format
                    return data;
                }
            }
        },
        path:function(page) {
            return '/items.json?page='+page;
        }
    });

});
Handlebars.registerHelper('isImage', function(block, options) {
    console.log(options)
    if (this.actable_type == "Image") {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
