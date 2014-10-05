/**
 * Created by john on 10/4/14.
 */
function event_front_format(time_str){
    return moment(time_str).format("YYYY-MM-DD HH:mm");
}

function event_back_format(time_str){
    return moment(time_str).format("YYYY-MM-DDTHH:mm");
}

