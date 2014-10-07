//$(document).ready(function(){
//    $('.navbar .dropdown').hover(function() {
//        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
//    }, function() {
//        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(105)
//    });
//})



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
    }
}
$(document).ready(function(){
    $('.fancybox').fancybox({
        width: 500,
        height: 500
    });
    $('.dpicker').datetimepicker({
        format:'Y-m-d H:i',
        onShow: function() {
        }
    });
});




$(document).ready(function(){
    calendar_bind=function(){
        var event_selected;
        var $calendar = $('#calendar');   $calendar.fullCalendar({
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
                $('#calendar').fullCalendar('changeView', 'agendaDay');
                $('#calendar').fullCalendar('gotoDate', date);
            }

        });

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
                    if (data.status_code==0) {

                    } else {
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
                    if (data.status_code == 0){
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
            })
        });

        $('#calendar-modal #delete').click(function(){
            var event_id = $('#calendar-modal').attr("event-id");
            $.ajax({
                url: "/events/" + event_id,
                type: "post",
                dataType: "json",
                data: {"_method":"delete"},
                success: function(data){
                    if (data.status_code == 0){
                        $('#calendar-modal').modal('hide');
                        $('#calendar').fullCalendar('removeEvents', event_id);
                    }else{
                        alert("can't delete");
                    }
                },
                error: function(){
                    alert("error");
                }
            })
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
                    if (data.status_code == 0){
                        $calendar_add_modal.modal('hide');
                    }else{
                        alert("can't add");
                    }
                },
                error: function(){
                    alert("error");
                }
            })
        });

        $calendar_add_modal.find("#stime").change(function(){
            var startTime=$(this).val();
            if (startTime==null || startTime=="") {
                return;
            } else {
                startTime=moment(startTime);
                var $end=$calendar_add_modal.find("#etime");
                var endTime=$end.val();
                if (endTime==null || endTime=="" || startTime>moment(endTime)) {
                    endTime=startTime.add(1, "hours");
                    $end.val(event_front_format(endTime.format()));
                }
            }
        });

        $calendar_add_modal.find("#etime").change(function(){
            var endTime=$(this).val();
            if (endTime==null || endTime=="") {
                return;
            } else {
                endTime=moment(endTime);
                var $start=$calendar_add_modal.find("#stime");
                var startTime=$start.val();
                if (startTime==null || startTime=="" || moment(startTime)>endTime) {
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
    }

    var $add_image_modal =  $('#add-image-modal');
    var $add_image_finished_modal =  $('#add-image-finished-modal');
    $add_image_modal.find('.btn-primary').click(function(e){
        var data = $add_image_modal.find('form').serializeFormJSON();
        console.log(data);
        $.ajax({
            url: '/images',
            type: 'post',
            dataType: 'json',
            data: data,
            complete: function (jqXHR, textStatus) {
                // callback
            },
            success: function (data, textStatus, jqXHR) {
                if (data.status_code === 0){
                    $add_image_modal.modal('hide');
                    $add_image_finished_modal.find('.modal-body a').attr("href", data.response.image_url);
                    $add_image_finished_modal.modal();
                }else{
                    alert("error");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // error callback
            }
        });
    });
    $add_image_modal.on('shown.bs.modal', function() {
        $.ajax({
            url: '/v1/images/new_aws_params',
            type: 'get',
            dataType: 'json',
            complete: function (jqXHR, textStatus) {
                // callback
            },
            success: function (data, textStatus, jqXHR) {
                var image_aws_params = data.response;
                var fileInput    = $add_image_modal.find('input:file'),
                    barContainer = $add_image_modal.find('.progress'),
                    progressBar  = barContainer.find('.bar'),
                    submitButton = $add_image_modal.find('.btn-primary');


                fileInput.fileupload({
                    fileInput:       fileInput,
                    url:             image_aws_params.s3_direct_post_url,
                    type:            'POST',
                    autoUpload:       true,
                    formData:         $.parseJSON(image_aws_params.s3_direct_post_fields),
                    paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
                    dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
                    replaceFileInput: false,
                    progressall: function (e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        progressBar.css('width', progress + '%');
                    },
                    start: function (e) {
                        submitButton.prop('disabled', true);

                        progressBar.
                            css('background', 'green').
                            css('display', 'block').
                            css('width', '0%').
                            text("Loading...");
                    },
                    done: function(e, data) {
                        submitButton.prop('disabled', false);
                        progressBar.text("Uploading done");

                        // extract key and generate URL from response
                        var url = $(data.jqXHR.responseXML).find("Location").text();
                        //var url   = '//' + url_host + '/' + key;

                        // create hidden field
                        var input = $("<input />", { type:'hidden', name: fileInput.attr('name'), value: url });
                        $add_image_modal.find('form').append(input);
                    },
                    fail: function(e, data) {
                        submitButton.prop('disabled', false);
                        progressBar.
                            css("background", "red").
                            text("Failed");
                    }
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // error callback
            }
        });
    });

});

