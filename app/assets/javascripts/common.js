/**
 * Created by john on 10/4/14.
 */
function event_front_format(time_str){
    return moment(time_str).format("YYYY-MM-DD HH:mm");
}

function event_back_format(time_str){
    return moment(time_str).format("YYYY-MM-DDTHH:mm");
}

(function($) {
    $.fn.serializeFormJSON = function() {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

function txt_wrap(){
    $('.txt_wrap').each(function(){
        var $wrap=$(this);
        var $txt=$wrap.find(".selection_text");
        var wrap_height=parseInt($wrap.innerHeight(),10);
        var txt_height=parseInt($txt[0].scrollHeight,10);
        if (txt_height>wrap_height) {
            var $more=$wrap.parent().find('.more');
            $more.click(function(){
                var $span=$more.find('span');
                if ($wrap.hasClass('height_limit')) {
                    $wrap.removeClass('height_limit');
                    $span.html("Less");
                    $span.removeClass('glyphicon-arrow-down');
                    $span.addClass('glyphicon-arrow-up');
                } else {
                    $wrap.addClass('height_limit');
                    $span.html("More");
                    $span.removeClass('glyphicon-arrow-up');
                    $span.addClass('glyphicon-arrow-down');
                }
                $('.item').resize();
            });
            $more.show();

        }
    });
}

function tofu_bind() {
    $('.delete-item').on('click', function() {
        $('#item_delete_modal').attr({
            'item-id': $(this).attr('item-id')
        });
    });
}

function fancybox() {
    $(".fancybox-thumbs").click(function(e){
        e.preventDefault();
    }).fancybox({
        type: "image",
        //prevEffect	: 'none',
        nextEffect	: 'none',

        helpers	: {
            buttons : {
                //position : 'top'
            },
            title : {
            },
            thumbs	: {
                width	: 50,
                height	: 50
            }
        }
    });
}


//= hidden_field_tag('s3_direct_post_url', @s3_direct_post.url)
//= hidden_field_tag('s3_direct_post_fields', @s3_direct_post.fields)


function getEventFromCalendarModal($cmodal){
    return {
        title: $cmodal.find('#title').val(),
        description: $cmodal.find('#description').val(),
        begin_datetime: event_back_format($cmodal.find('#stime').val()),
        end_datetime: event_back_format($cmodal.find('#etime').val())
    };
}
