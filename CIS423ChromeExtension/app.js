
getSource = function(){return $(document.all[0]).find("#source").val()};
getTranslation = function(){
	val = "";
	$(document.all[0]).find("#result_box span").each(function(){
		val += $(this).html() + " ";
	});
	return val;
};

checkLanguage = function(){
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

chrome.runtime.sendMessage({
	method: 'GET',
    action: 'xhttp',
    url: 'http://localhost:3000/results?srcTxt='+getSource()+'&dstTxt='+getTranslation()
    //data:{srcTxt: ""+getSource(), dstTxt: ""+getTranslation()}
}, function(responseText) {
    alert(JSON.stringify(responseText));
   
});
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
