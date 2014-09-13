// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap.min
//= require waterfall.min.js
//= require handlebars.js



function txt_wrap(){
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
}
