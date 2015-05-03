chrome.browserAction.onClicked.addListener(function(tab){
	var tabURL;
	chrome.tabs.query({action: true, lastFocusedWindow: true}, (function(arrayOfTabs){
		var activeTab = arrayOfTabs[0];
		tabURL = activeTab.url;
	}));
	if (tabURL == "https://translate.google.com"){
		console.log(tabURL);
	}
	else{
		chrome.tabs.update({url: "https://translate.google.com"})
	}
});