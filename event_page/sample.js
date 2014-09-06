var tmp = chrome.cookies.get(
	{url:'localhost',name:'mystuff_token'}
	,
	function(cookie){
		if(cookie && cookie.value) {
			xhr.setRequestHeader('X-CSRFToken', cookie.value);
			alert(cookie.value);
			
		}
		
		return;
		
		/*
		$.ajax({
            url  : 'http://localhost:3000/images.json',
			type : 'POST',
			data : data,
			dataType : 'json',
			beforeSend : function(xhr, settings) {
				if(cookie && cookie.value) {
					xhr.setRequestHeader('X-CSRFToken', cookie.value);
					alert(cookie.value);
					
				}
			},
			success : function(data,status,xhr) {
                console.log(data)
				if( data.status_code == 1 ) {
					$("#gosee").data('image_url', data.image_url);
					$("#wrap_add,#fancyit").hide();
					$("#wrap_success").show();

					$('body').trigger('mouseup.scroll');
				} else {
					var msg = data.message || 'An error occured while requesting the server.\nPlease try again later.';
					window.close();
				}
			}
		});
		*/
	}
);

alert(tmp);

function onClickHandler(info, tab) {
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
	
	var selectMsg = info.selectionText;
	
	alert(selectMsg);
	
};

chrome.contextMenus.onClicked.addListener(onClickHandler);



chrome.runtime.onInstalled.addListener(function() {
  var contexts = ["page","selection","link","editable","image","video",
                  "audio"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});
    console.log("'" + context + "' item:" + id);
  }
  // Create a parent item and two children.
});
