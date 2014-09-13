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
                            if (count<3) {
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
                    return '/texts.json?page='+page;
                }
            });

        });
