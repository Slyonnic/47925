// Saved Serveys for Servey Site
// Author: Jonathan Tarris
function genServsArray(){
	this.servs = [serv1, serv2, serv3];
}

var serv1 = new Servey("serv1", "This is a Test Servey", "Me of Course");
serv1.addQues("radio", "This is a multiple choice question?");
serv1.addAns(0, "test1");
serv1.addAns(0, "test2");
serv1.addAns(0, "test3");
serv1.addQues("checkbox", "CheckBox Question");
serv1.addAns(1, "ans1");
serv1.addAns(1, "ans2");
serv1.addQues("select", "This is a Select Question");
serv1.addAns(2, "option1");
serv1.addAns(2, "option2");
serv1.addAns(2, "option3");
serv1.addQues("text", "This is a text Question");

var serv2 = new Servey("serv2", "This is a Test Servey2", "Me of Course");
serv2.addQues("radio", "This is a multiple choice question?");
serv2.addAns(0, "test1");
serv2.addAns(0, "test2");
serv2.addAns(0, "test3");
serv2.addQues("select", "This is a Select Question");
serv2.addAns(1, "option1");
serv2.addAns(1, "option2");
serv2.addAns(1, "option3");
serv2.addQues("text", "This is a text Question");

var serv3 = new Servey("serv3", "This is a Test Servey3", "Me of Course");
serv3.addQues("radio", "This is a multiple choice question?");
serv3.addAns(0, "test1");
serv3.addAns(0, "test2");
serv3.addAns(0, "test3");
serv3.addQues("select", "This is a Select Question");
serv3.addAns(1, "option1");
serv3.addAns(1, "option2");
serv3.addAns(1, "option3");
serv3.addQues("text", "This is a text Question");

genServsArray();