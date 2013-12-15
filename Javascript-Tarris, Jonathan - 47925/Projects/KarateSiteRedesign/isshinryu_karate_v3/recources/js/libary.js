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
		if(curEle.type != "text" || curEle.getAttribute("regExp") == null) continue; //will skip to next element if it is not text or has no regular expression to check
		var re = new RegExp(curEle.getAttribute("regExp"));//pulls the regular expression from the attributes
		if(!(re.test(curEle.value))){//tests the regular expression aginst the elements value
			alert(curEle.getAttribute("errorMsg"));//sends error msg to user
			return false;
		}
	}			
	return true;
}