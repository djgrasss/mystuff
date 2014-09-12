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

                        $('.txt_wrap').each(function(){
                            var $wrap=$(this);
                            var $txt=$wrap.find(".selection_text");
                            var wrap_height=parseInt($wrap.innerHeight(),10);
                            var txt_height=parseInt($txt[0].scrollHeight,10);
                            if (txt_height>wrap_height) {
                                var $more=$wrap.parent().find('.more');
                                $more.click(function(){
                                    if ($wrap.hasClass('height_limit')) {
                                        $wrap.removeClass('height_limit');
                                        var $span=$more.find('span');
                                        $span.html("Less");
                                        $span.removeClass('glyphicon-arrow-down');
                                        $span.addClass('glyphicon-arrow-up');
                                        $('.item').resize();
                                    } else {
                                        $wrap.addClass('height_limit');
                                        var $span=$more.find('span');
                                        $span.html("More");
                                        $span.removeClass('glyphicon-arrow-up');
                                        $span.addClass('glyphicon-arrow-down');
                                        $('.item').resize();
                                    }
                                });
                                $more.show();

                            }

                        });
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
