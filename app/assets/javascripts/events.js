// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var v;
$(document).ready(function(){
    $('#calendar').fullCalendar({
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

            var $cmodal=$('#calendar-modal');
            $cmodal.find('#title').val(calEvent.title);
            $cmodal.find('#description').val(calEvent.description);
            $cmodal.find('#stime').val(calEvent.start);
            $cmodal.find('#etime').val(calEvent.end);
            $cmodal.modal('show');
            $('#cal')
        },
        eventDrop: function(event, delta, revertFunc) {
            console.log(event);
            console.log(delta);
            alert(event.title + " was dropped on " + event.start.format());
            if (!confirm("Are you sure about this change?")) {
                revertFunc();
            }
        }

    });

    $('#calendar-modal save').click(function(){
        $.ajax({
            //url: ,

        });
        alert("svae");
    });
});