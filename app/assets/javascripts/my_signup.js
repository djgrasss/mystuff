$(document).on('ready page:load', function(){
    $signupform = $('#signup form');
    $signupform.find(':submit').click(function(e){
        e.preventDefault();
        var data = $signupform.serializeFormJSON();
        $.ajax({
            url: '/users',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                if (data.status_code === 0){
                    window.location = "/";
                }else{
                    $.each(data.response, function(name, arr){
                        var ele = $signupform.find('[name*="'+name+'"]');
                        if (name === 'password' || name === "password_confirmation") ele.val(''); 
                        //ele.attr('placeholder', arr[0]).find('-webkit-input-placeholder').css('color', 'red')
                        ele.attr('placeholder', arr[0]);
                    });
                }
            }
        });
    });
});
