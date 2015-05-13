
getSource = function(){return $(document.all[0]).find("#source").val()};
getTranslation = function(){
	val = "";
	$(document.all[0]).find("#result_box span").each(function(){
		val += $(this).html() + " ";
	});
	return val;
};

getLanguages = function(){
	lang1 = "";
	lang2 = "";
	lang1 = $($(".jfk-button-checked")[0]).html();
	lang2 = $($(".jfk-button-checked")[1]).html();
	langArray = [lang1, lang2];
	console.log(lang1);
	console.log(lang2);
	return langArray;
}
checkLanguages = function(){
	langList = getLanguages();
	if (langList[0] == "English"){
		if(langList[1] == "Russian" || langList[1] == "English" || langList[1] == "Chinese" || langList[1] == "Yoruba" || langList[1] == "Telugu" || langList[1] == "Sinhala"){
			return true;
		}
		else{
			return false;
		}
	}
	return false;	
}


// utility & testing functions
setSource = function(val){
	$(document.all[0]).find("#source").val(val);
}

testFunctions = function(){
	console.log("getSource: ", getSource());
	console.log("getTranslation: ", getTranslation());	
}
// testFunctions();

queryValidator = function(i,o){
	var contentType ="application/x-www-form-urlencoded; charset=utf-8";
 
	if(window.XDomainRequest) //for IE8,IE9
	    contentType = "text/plain";

	if (checkLanguages()){
		chrome.runtime.sendMessage({
			method: 'GET',
	    	action: 'xhttp',
	    	url: 'http://localhost:3000/results?srcTxt='+getSource()+'&dstTxt='+getTranslation()+'&srcLang='+checkLanguages()[0]+'&dstLang='+checkLanguages[1]
	    	//data:{srcTxt: ""+getSource(), dstTxt: ""+getTranslation()}
		}, function(responseText) {
			responseText = responseText.substring(1, responseText.length -1);
			responseText = responseText.replace(/["'"]+/g, '')
	    	// repsonseText = responseText.split(",");
	    	responseArray = responseText.split(",");
	    	console.log(responseArray);

			alert("Predicted translation type: " + responseArray[0] + " prediction\n" + "Prediction confidence percentage: " + responseArray[1] + "% prob\n" + "Classifier's word-to-word equivalence threshold percentage " + responseArray[2] + "%\n");

		});
	}else{
		alert('nonononononon!');
	}
/*
	chrome.runtime.sendMessage({
    method: 'POST',
    action: 'xhttp',
    url: 'http://localhost:3000/run',
    data:{srcTxt: ""+getSource(), dstTxt: ""+getTranslation()}
}, function(responseText) {
    alert(responseText);
   
});
*/
	/* 
	$.ajax({
	     url:"http://localhost:3000/results?first=" + getSource() + "&second=" + getTranslation() ,
	     type:"GET",
	     contentType:contentType,    
	     success:function(data)
	     {
	        alert("Data from Server"+JSON.stringify(data));
	     },
	     error:function(jqXHR,textStatus,errorThrown)
	     {
	        alert("BAD!! "+errorThrown);
	     }
    });
*/
}




// alert( queryValidator(getSource(), getTranslation()) );
// 



// addButton(){
// 	button = $("body #gt-lang-submit").html();
// 	("body #gt-lang-submit").insertAfter(button);
// }
// 
// 
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    queryValidator(getSource(), getTranslation());
});
