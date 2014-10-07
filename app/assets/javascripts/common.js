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
