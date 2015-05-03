

getSource = function(){return $(document.all[0]).find("#source").val()};
getTranslation = function(){
	val = "";
	$(document.all[0]).find("#result_box span").each(function(){
		val += $(this).html() + " ";
	});
	return val;
};


// utility & testing functions
setSource = function(val){
	$(document.all[0]).find("#source").val(val);
}

testFunctions = function(){
	console.log("getSource: ", getSource());
	console.log("getTranslation: ", getTranslation());	
}
// testFunctions();

queryValidator = function(){
	return "validity:" + "10%";
}


alert( queryValidator(getSource(), getTranslation()) );