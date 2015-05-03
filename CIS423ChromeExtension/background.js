chrome.browserAction.onClicked.addListener(function(tab){
	var tabURL = "about:black";
	chrome.tabs.query({active: true, lastFocusedWindow: true}, 
			(function(arrayOfTabs){
				var activeTab = arrayOfTabs[0];
				//alert(activeTab.url + " ## ");
				tabURL = activeTab.url;
				//alert(tabURL);

				if (CheckURL(tabURL) == true){
					alert(tabURL);			//action when button is pushed and user is on google translate
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