/*global event_front_format: true, 
 event_back_format: true,
 revertFunc: true,
 getEventFromCalendarModal: true,
 $calendar: true,
 moment: true,
 txt_wrap: true,
 tofu_bind: true,
 fancybox: true,
 Handlebars: true,
 wf_type: true
 */
$(document).on('ready page:load', function(){
    $( window ).unload(function() {
      alert( "Handler for .unload() called." );
    });

    $('.fancybox').fancybox({
        width: 500,
        height: 500
    });
    $('.dpicker').datetimepicker({
        format:'Y-m-d H:i',
        onShow: function() {
        }
    });

    var $add_image_modal =  $('#add-image-modal');
    var $add_image_finished_modal =  $('#add-image-finished-modal');
    $add_image_modal.find('.btn-primary').click(function(e){
        var data = $add_document_modal.find('form').serializeFormJSON();
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
                    $add_document_modal.modal('hide');
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
            url: '/v1/aws/new_params',
            type: 'get',
            dataType: 'json',
            complete: function (jqXHR, textStatus) {
                // callback
            },
            success: function (data, textStatus, jqXHR) {
                var aws_params = data.response;
                var fileInput    = $add_document_modal.find('input:file'),
                barContainer = $add_document_modal.find('.progress'),
                progressBar  = barContainer.find('.bar'),
                submitButton = $add_document_modal.find('.btn-primary');


                fileInput.fileupload({
                    fileInput:       fileInput,
                    url:             aws_params.s3_direct_post_url,
                    type:            'POST',
                    autoUpload:       true,
                    formData:         $.parseJSON(aws_params.s3_direct_post_fields),
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
                        $add_document_modal.find('form').append(input);
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





    var $add_document_modal = $('#add-document-modal');
    var $add_document_finished_modal =  $('#add-document-finished-modal');
    $add_document_modal.find('.btn-primary').click(function(e){
        var data = $add_document_modal.find('form').serializeFormJSON();
        console.log(data);
        $.ajax({
            url: '/documents',
            type: 'post',
            dataType: 'json',
            data: data,
            complete: function (jqXHR, textStatus) {
                // callback
            },
            success: function (data, textStatus, jqXHR) {
                if (data.status_code === 0){
                    $add_document_modal.modal('hide');
                    $add_document_finished_modal.find('.modal-body a').attr("href", data.response.url);
                    $add_document_finished_modal.modal();
                }else{
                    alert("error");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // error callback
            }
        });
    });
    $add_document_modal.on('shown.bs.modal', function() {
        $.ajax({
            url: '/v1/aws/new_params',
            type: 'get',
            dataType: 'json',
            complete: function (jqXHR, textStatus) {
                // callback
            },
            success: function (data, textStatus, jqXHR) {
                var aws_params = data.response;
                var fileInput    = $add_document_modal.find('input:file'),
                barContainer = $add_document_modal.find('.progress'),
                progressBar  = barContainer.find('.bar'),
                submitButton = $add_document_modal.find('.btn-primary');


                fileInput.fileupload({
                    fileInput:       fileInput,
                    url:             aws_params.s3_direct_post_url,
                    type:            'POST',
                    autoUpload:       true,
                    formData:         $.parseJSON(aws_params.s3_direct_post_fields),
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
                        $add_document_modal.find('form').append(input);
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


    $(".fancybox.qr_code").fancybox({
        fitToView: true, // avoids scaling the image to fit in the viewport
        beforeShow: function () {
            this.width = 700;
            this.height = 700;
        }
    });

    $('.directUploadForm').find("input:file").each(function(i, elem) {
        var fileInput    = $(elem);
        var form         = $(fileInput.parents('form:first'));
        var submitButton = form.find('input[type="submit"]');
        var progressBar  = $("<div class='bar'></div>").css('height', '1.5em');
        var barContainer = $("<div class='progress'></div>").append(progressBar);
        var url = form.find('#s3_direct_post_url').val();
        var url_host = form.find('#s3_direct_post_url_host').val();
        var formData = form.find('#s3_direct_post_fields').val();
        console.log(formData);
        console.log(typeof formData);
        fileInput.after(barContainer);
        fileInput.fileupload({
            fileInput:       fileInput,
            url:             url,
            type:            'POST',
            autoUpload:       true,
            formData:         $.parseJSON(formData),
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

                var url = $(data.jqXHR.responseXML).find("Location").text();
                var input = $("<input />", { type:'hidden', name: fileInput.attr('name'), value: url });
                form.append(input);
            },
            fail: function(e, data) {
                submitButton.prop('disabled', false);
                progressBar.
                    css("background", "red").
                    text("Failed");
            }
        });
    });

    if ($('.wf-container').size()){
        waterfall_it("items");
        var availableTags = [
            "items",
            "images",
            "texts"
        ];
        var s_input = $("#search-input");
        s_input.autocomplete({
            source: availableTags
        }).keyup(function(event){
            if(event.keyCode === 13){
                another_waterfall(s_input.val());
            }
        });
    }
    $('#search-confirm').click(function(){
        another_waterfall(s_input.val());
    });
});
