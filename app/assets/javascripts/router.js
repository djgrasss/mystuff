var waterfall_types={
    items: 'items',
    images: 'images', 
    texts: 'texts'
};
var tpl_types={
};
var colorbox_types={
};
var html_types={
    help: '/help', 
    team: '/team', 
    signin: '/signin',
    signup: '/signin',
};
function route(url){
    if (url !== 'signin' && url !== 'signup' && !check_signedin()) return;
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
    }else if (url, colorbox_types){
    }else if (url === "signup"){
    }else{
        waterfall_it("items");
    }
}

$(document).on('ready page:load', function(){
    route(page);
});

