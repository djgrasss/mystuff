var event_selected;
function calendar_display($calendar){
    $calendar.fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end) {
        },
        editable: true,

        eventLimit: true,
        height:500,
        events: "events",
        eventClick: function(calEvent, jsEvent, view) {

            event_selected = calEvent;
            var $cmodal=$('#calendar-modal');
            $cmodal.attr("event-id", calEvent.id);
            $cmodal.find('#title').val(calEvent.title);
            $cmodal.find('#description').val(calEvent.description);
            $cmodal.find('#stime').val(event_front_format(calEvent.start));
            $cmodal.find('#etime').val(event_front_format(calEvent.end));
            $cmodal.modal('show');
        },
        eventDrop: function(event, delta, revertFunc) {
            eventChange(event);
        },
        eventResize: function(event, delta, revertFunc) {
            eventChange(event);
        },
        dayClick: function(date, allDay, jsEvent, view) {
            // change the day's background color just for fun
            $calendar.fullCalendar('changeView', 'agendaDay');
            $calendar.fullCalendar('gotoDate', date);
        }

    });
}
function eventChange(event) {
    var start=event.start;
    if (start)
        start=event_back_format(start.format());
    var end=event.end;
    if (end)
        end=event_back_format(end.format());
    var id=event.id;
    var _event = {};
    _event.id=id;
    _event.title=event.title;
    _event.description=event.description;
    _event.begin_datetime=start;
    _event.end_datetime=end;
    $.ajax({
        url: "/events/"+id,
        type: "post",
        dataType: "json",
        data: {
            _method: "patch",
            event: _event
        },
        success: function (data) {
            if (data.status_code!==0) {
                revertFunc();
            }
        },
        error: function(){
            revertFunc();
        }
    });
}
$('#calendar-modal #save').click(function(){
    var event_id = $('#calendar-modal').attr("event-id");
    var $cmodal=$('#calendar-modal');
    var event = getEventFromCalendarModal($cmodal);
    $.ajax({
        url: "/events/" + event_id,
        type: "post",
        dataType: "json",
        data: {
            _method: "patch",
            event: event
        },
        success: function(data){
            if (data.status_code === 0){
                $('#calendar-modal').modal('hide');
                event_selected.title = event.title;
                event_selected.description = event.description;
                event_selected.start = event.begin_datetime;
                event_selected.end = event.end_datetime;
                $calendar.fullCalendar('updateEvent', event_selected);
            }else{
                alert("can't delete");
            }
        },
        error: function(){
            alert("error");
        }
    });
});

$('#calendar-modal #delete').click(function(){
    var event_id = $('#calendar-modal').attr("event-id");
    $.ajax({
        url: "/events/" + event_id,
        type: "post",
        dataType: "json",
        data: {"_method":"delete"},
        success: function(data){
            if (data.status_code === 0){
                $('#calendar-modal').modal('hide');
                $('#calendar').fullCalendar('removeEvents', event_id);
            }else{
                alert("can't delete");
            }
        },
        error: function(){
            alert("error");
        }
    });
});

var $calendar_add_modal =  $('#calendar-add-modal');
$calendar_add_modal.find('#add').click(function(){
    var event = getEventFromCalendarModal($calendar_add_modal);
    $.ajax({
        url: "/events",
        type: "post",
        dataType: "json",
        data: {
            event: event
        },
        success: function(data){
            if (data.status_code === 0){
                $calendar_add_modal.modal('hide');
            }else{
                alert("can't add");
            }
        },
        error: function(){
            alert("error");
        }
    });
});

$calendar_add_modal.find("#stime").change(function(){
    var startTime=$(this).val();
    if (startTime===null || startTime==="") {
        return;
    } else {
        startTime=moment(startTime);
        var $end=$calendar_add_modal.find("#etime");
        var endTime=$end.val();
        if (endTime===null || endTime==="" || startTime>moment(endTime)) {
            endTime=startTime.add(1, "hours");
            $end.val(event_front_format(endTime.format()));
        }
    }
});

$calendar_add_modal.find("#etime").change(function(){
    var endTime=$(this).val();
    if (endTime===null || endTime==="") {
        return;
    } else {
        endTime=moment(endTime);
        var $start=$calendar_add_modal.find("#stime");
        var startTime=$start.val();
        if (startTime===null || startTime==="" || moment(startTime)>endTime) {
            startTime=endTime.add(-1, "hours");
            $start.val(event_front_format(startTime.format()));
        }
    }
});

$calendar_add_modal.on('show.bs.modal', function(){
    $calendar_add_modal.find("#title").val("");
    $calendar_add_modal.find("#description").val("");
    $calendar_add_modal.find("#stime").val("");
    $calendar_add_modal.find("#etime").val("");
});
