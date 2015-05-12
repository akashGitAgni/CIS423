chrome.browserAction.onClicked.addListener(function(tab){
	var tabURL = "about:black";


	chrome.tabs.query({active: true, lastFocusedWindow: true}, 
			(function(arrayOfTabs){
				var activeTab = arrayOfTabs[0];
				//alert(activeTab.url + " ## ");
				tabURL = activeTab.url;
				//alert(tabURL);

				if (CheckURL(tabURL) == true){
					// alert(tabURL);			//action when button is pushed and user is on google translate
					registerValidityRequest();
				}
				else{
					chrome.tabs.update({url: "https://translate.google.com"});
				}

			}
		)
	);

});

function CheckURL(testURL){
	var tempURL = "https://translate.google.com/";
	for (i = 0; i < tempURL.length; i++){
			if (tempURL[i] != testURL[i]){
				return false;
			}
	}
	return true;
};


function registerValidityRequest(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	    console.log(response.farewell);
	  });
	});
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == "xhttp") {
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback();
        };
        xhttp.open(method, request.url, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhttp.send(request.data);
        return true; // prevents the callback from being called too early on return
    }
});