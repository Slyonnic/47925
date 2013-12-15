//Javascript Libary for Servey Site
//Author: Jonathan Tarris

function Question(quesNum ,type, quesText, answers){//question number,type of question, question text, and an array 
																						//containting answers
	//answers is not required when the type is text
	/*Question Class stores quesNum which is its place in the ques array in Servey Class
	*type of input for form, the question text that will be displayed, as well as an array containing
	*the possible anwsers to the questions if any
	*/
	this.quesNum = quesNum;
	this.type = type;
	this.quesText = quesText;
	this.answers = answers;
	
	this.pushAns = function(ans){//pushes new answers into the answers array
		if(this.answers == null){
			this.answers = [ans];	
		}else{
			this.answers.push(ans);
		}
	}
	
	this.getResult = function(){//returns a string of the question
		var str = "";
		switch(type){
			case "radio"://Multiple Choice
				str += quesText + "<br />";
				for(var i = 0; i < this.answers.length; i++){
					str += "<input type='radio' name='" + quesNum + "' value='" + this.answers[i] + "'/>";
					str += this.answers[i] + "<br />";
				}
				break;
			case "checkbox"://Check all that Apply
				str += quesText + "<br />";
				for(var i = 0; i < this.answers.length; i++){
					str += "<input type='checkbox' name='" + quesNum + "' value='" + this.answers[i] + "'/>";
					str += this.answers[i] + "<br />";
				}
				break;
			case "text"://text box question
				str += quesText;
				str += "<input type='text' name='" + quesNum + "'/><br />";
				break;
			case "select"://drop down question
				str += quesText;
				str += "<select name='" + quesNum + "'>";
				for(var i = 0; i < this.answers.length; i++){
					str += "<option value='" + this.answers[i] + "'>" + this.answers[i] + "</option>";
				}
				str += "</select><br />";
				break;
			default:
				str += "Not a valid question type";
		}
		return str;
	}
}

function Servey(id ,name, creator){//will take in questions and store them in an array then be able to generate their html and output it
	this.ques = new Array();//array that holds all the questions
	this.id = id; //same as declared var instance
	this.creator = creator; //creator of servey
	this.name = name; //name of servey
	
	this.addQues = function(type, quesText, answers){ //add a question to ques array
		 var question = new Question(this.ques.length, type, quesText, answers);//creates a new instance of Question
		 this.ques.push(question);//pushs that instance into ques array
	}
	
	this.addAns = function(quesNum, ans){//adds answer to question by providing questions position in ques array
		this.ques[quesNum].pushAns(ans);
	}
	
	this.getQues = function(quesNum){//gets a string for particular question by providing position in ques array
		return (this.ques[quesNum].getResult());
	}
	
	this.genServey = function(){//generates servey containing all questions
		for(var i = 0; i < this.ques.length; i++){
			document.write("<p>");
			document.write(this.ques[i].getResult());
			document.write("</p>");	
		}
	}
	
	this.getQuesText = function(quesNum){
		return this.ques[quesNum];
	}
}

function genServCell(serv, color, stg){//takes Servey object and color 0 indicating grey and 1 indicating lblue for background and stg is storage 0 for site 1 for cookies/localstorage
	document.write("<tr class='" + (color == 0?"grey":"lblue") + "'>");
	document.write("<td><a href='takeServey.html?servey=" + serv.id + "'>" + serv.name + "</a></td>");
	document.write("<td>" + serv.creator + "</td>");
	document.write("<td>" + (stg == 0?"Site":"Local Storage") + "</td>");
	document.write("</tr>");
}

function genServCellToR(serv, color, stg){//takes Servey object and color 0 indicating grey and 1 indicating lblue for background and stg is storage 0 for site 1 for cookies/localstorage
	document.write("<tr class='" + (color == 0?"grey":"lblue") + "'>");
	document.write("<td><a href='result.html?servey=" + serv.id + "'>" + serv.name + "</a></td>");
	document.write("<td>" + serv.creator + "</td>");
	document.write("<td>" + (stg == 0?"Site":"Local Storage") + "</td>");
	document.write("</tr>");
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

function getCookies() {
    var cookies = {};           // The object we will return
    var all = document.cookie;  // Get all cookies in one big string
    if (all === "")             // If the property is the empty string
        return cookies;         // return an empty object
    var list = all.split("; "); // Split into individual name=value pairs
    for(var i = 0; i < list.length; i++) {  // For each cookie
        var cookie = list[i];
        var p = cookie.indexOf("=");        // Find the first = sign
        var name = cookie.substring(0,p);   // Get cookie name
        var value = cookie.substring(p+1);  // Get cookie value
        value = decodeURIComponent(value);  // Decode the value
        cookies[name] = value;              // Store name and value in object
    }
    return cookies;
}

// Store the name/value pair as a cookie, encoding the value with 
// encodeURIComponent() in order to escape semicolons, commas, and spaces.
// If daysToLive is a number, set the max-age attribute so that the cookie
// expires after the specified number of days. Pass 0 to delete a cookie.
function setCookie(name, value, secondsToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    if (typeof secondsToLive === "number") 
        cookie += "; max-age=" + (secondsToLive);
    document.cookie = cookie;
}

function CookieStorage(maxage, path) {  // Arguments specify lifetime and scope

    // Get an object that holds all cookies
    var cookies = (function() { // The getCookies() function shown earlier
        var cookies = {};           // The object we will return
        var all = document.cookie;  // Get all cookies in one big string
        if (all === "")             // If the property is the empty string
            return cookies;         // return an empty object
        var list = all.split("; "); // Split into individual name=value pairs
        for(var i = 0; i < list.length; i++) {  // For each cookie
            var cookie = list[i];
            var p = cookie.indexOf("=");        // Find the first = sign
            var name = cookie.substring(0,p);   // Get cookie name
            var value = cookie.substring(p+1);  // Get cookie value
            value = decodeURIComponent(value);  // Decode the value
            cookies[name] = value;              // Store name and value
        }
        return cookies;
    }());

    // Collect the cookie names in an array
    var keys = [];
    for(var key in cookies) keys.push(key);

    // Now define the public properties and methods of the Storage API

    // The number of stored cookies
    this.length = keys.length;

    // Return the name of the nth cookie, or null if n is out of range
    this.key = function(n) {
        if (n < 0 || n >= keys.length) return null;
        return keys[n];
    };

    // Return the value of the named cookie, or null.
    this.getItem = function(name) { return cookies[name] || null; };
	this.getItems = function() { return cookies || null; };

    // Store a value
    this.setItem = function(key, value) {
        if (!(key in cookies)) { // If no existing cookie with this name
            keys.push(key);      // Add key to the array of keys
            this.length++;       // And increment the length
        }

        // Store this name/value pair in the set of cookies.
        cookies[key] = value;

        // Now actually set the cookie.
        // First encode value and create a name=encoded-value string
        var cookie = key + "=" + encodeURIComponent(value);

        // Add cookie attributes to that string
        if (maxage) cookie += "; max-age=" + maxage;
        if (path) cookie += "; path=" + path;

        // Set the cookie through the magic document.cookie property
        document.cookie = cookie;
    };

    // Remove the specified cookie
    this.removeItem = function(key) {
        if (!(key in cookies)) return;  // If it doesn't exist, do nothing

        // Delete the cookie from our internal set of cookies
        delete cookies[key];

        // And remove the key from the array of names, too.
        // This would be easier with the ES5 array indexOf() method.
        for(var i = 0; i < keys.length; i++) {  // Loop through all keys
            if (keys[i] === key) {              // When we find the one we want
                keys.splice(i,1);               // Remove it from the array.
                break;
            }
        }
        this.length--;                          // Decrement cookie length

        // Finally actually delete the cookie by giving it an empty value
        // and an immediate expiration date.
        document.cookie = key + "=; max-age=0";
    };

    // Remove all cookies
    this.clear = function() {
        // Loop through the keys, removing the cookies
        for(var i = 0; i < keys.length; i++)
            document.cookie = keys[i] + "=; max-age=0";
        // Reset our internal state
        cookies = {};
        keys = [];
        this.length = 0;
    };
}