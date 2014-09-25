// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
    $('#calendar').fullCalendar({
        defaultDate: '2014-09-12',
        editable: true,
        eventLimit: true,
        height:500,
        events: "events"
    });

});