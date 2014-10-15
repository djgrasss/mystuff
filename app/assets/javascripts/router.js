var waterfall_types={
    items: 'items',
    images: 'images', 
    texts: 'texts'
};
var tpl_types={
};
var no_login=['auth_facebook', 'auth_twitter', 'signin', 'signup'];
var colorbox_types={
    auth_facebook: '/auth/facebook',
    auth_twitter: '/auth/twitter'
};
var html_types={
    help: '/help', 
    team: '/team', 
    signin: '/signin',
    signup: '/signin',
};
function route(url){
    if ($.inArray(url, no_login) === -1 && !check_signedin())  url = "signin"; 
    clear_stuff_container();
    if (url === 'documents'){
        $.getJSON('/documents.json',
                  {},
                  function (data, textStatus, jqXHR) {
                      if (data  && data.status === 0 ){
                          var template = $("#documents-tpl").getTemplate();
                          $('.tpl-container').prepend(template(data));
                          doc_binding();
                      }
                  }
                 );
    }else if (url === '/events'){
        var template = $("#events-tpl").getTemplate();
        $('.calendar-container').prepend(template);
        calendar_display($('#calendar'));
        bind_calendar_event();
    }else if (url in html_types) {
        $.get(html_types[url],
              {},
              function (data, textStatus, jqXHR) {
                  if (signedin(data)) $('.html-container').prepend(data);
                  if (url === "signin" || url === "signup"){
                      $("#signupcb").colorbox({inline:true, open: (url === "signup")});
                      $signinform = $('#signin form');
                      $signinform.find(':submit').click(function(e){
                          e.preventDefault();
                          var data = $signinform.serializeFormJSON();
                          console.log(data);
                          $.ajax({
                              url: '/sessions',
                              type: 'post',
                              dataType: 'json',
                              data: data,
                              success: function (data, textStatus, jqXHR) {
                                  console.log(data);
                                  if (data.status_code === 0){
                                      window.location = "/";
                                  }else{
                                      console.log(data.response)
                                      alert("your login is not correct");
                                  }
                              }
                          });
                      });
                  }
              }
             );
    }else if (url in waterfall_types){
        waterfall_it(url);
    }else if (url in colorbox_types){
        console.log(colorbox_types[url]);
        $.colorbox({
            href: colorbox_types[url],
            iframe: true,
            width: 500,
            height:  500
        });
    }else if (url === "signup"){
    }else{
        waterfall_it("items");
    }
}

$(document).on('ready page:load', function(){
    if (page !== undefined) 
       route(page);
});

function appendData2Notice(data){
    $('#notice_modal').empty().append($.list(data));
}
