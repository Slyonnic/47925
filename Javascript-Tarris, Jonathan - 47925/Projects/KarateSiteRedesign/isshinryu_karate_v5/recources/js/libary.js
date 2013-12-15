//Libary Javascript repository for Isshinryu Karate site redesign
//Author: Jonathan Tarris

//Dynamic Form Valitation
function valForm(form){//contactForm validation
	for(var i = 0; i < document.forms.length; i++){ //loop through all forms on page and check which one is
		if(document.forms[i].name == form){         //curently being validated
			var curForm = document.forms[i];
			break;
		}
	}
	for(var i = 0; i < curForm.elements.length; i++){ //loops though the elements of the form and validates them
		var curEle = curForm.elements[i];//identifes the current element
		if(curEle.getAttribute("regExp") == null) continue; //will skip to next element if it has no regular expression to check
		var re = new RegExp(curEle.getAttribute("regExp"));//pulls the regular expression from the attributes
		if(!(re.test(curEle.value))){//tests the regular expression aginst the elements value
			curEle.className = "invalid" //changes background color to red
			alert(curEle.getAttribute("errorMsg"));//sends error msg to user
			return false;
		}else{
			curEle.className = "";	//changes background color back to normal
		}
	}			
	return true;
}

//Split form info into name value pairs
function getFormInfo(url){
	var info=url.split("?");//split first part of url
	var nameValuePairs=info[1].split("&");//seperate all value pairs from each other
	var obj=new Object();
	for(var i=0;i<nameValuePairs.length;i++){
		var map=nameValuePairs[i].split("=");//seperate name from value
		var name=map[0];
		var value=map[1];
		obj[name]=value;//asign to object
	}
	return obj;
}