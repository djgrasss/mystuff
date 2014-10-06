$(document).ready(function(){
    $('#images-container').waterfall({
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
                    if (count<10) {
                        $('img').resize();
                        count++;
                    }
                    else
                        clearInterval(erupt);
                };
                var erupt=setInterval(eruption, 500);
                tofu_bind();
                fancybox();
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
            return '/images.json?page='+page;
        }
    });
    $('.directUpload').find("input:file").each(function(i, elem) {
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

                // extract key and generate URL from response
                var url = $(data.jqXHR.responseXML).find("Location").text();
                //var url   = '//' + url_host + '/' + key;

                // create hidden field
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

});
