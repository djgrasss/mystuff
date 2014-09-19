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
    console.log("hah");
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

$(function() {
    $('.directUpload').find("input:file").each(function(i, elem) {
        var fileInput    = $(elem);
        var form         = $(fileInput.parents('form:first'));
        var submitButton = form.find('input[type="submit"]');
        var progressBar  = $("<div class='bar'></div>");
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

$(document).ready(function(){
    $('.fancybox').fancybox({
        width: 500,
        height: 500
    });
});
