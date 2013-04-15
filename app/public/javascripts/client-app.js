var main = function () {
    console.log("hello world!");

    var addPersonToList = function (person) {
	$(".people_list").append("<p>"+person.name+" "+person.age+"</p>");
    };

    $.getJSON("/people.json", function (response) {
	response.forEach(function(person) {
	    console.log(person);
	    addPersonToList(person);
	    //$(".people_list").append("<p>"+person.name+" "+person.age+"</p>");
	});
    });


    $("#new_person").click(function () {
	var name = $("#name").val(),
	    age = $("#age").val(),
	    post_object = {};

	if (name === "" || age === "") {
	    alert("hey! you gotta put in an age and a name");
	} else {
	    post_object.name = name;
	    post_object.age = age;
	    console.log(post_object);

	    $.post("/people/new", post_object, function (response) {
		console.log(response);
		addPersonToList(response);
		$("#name").val("");
		$("#age").val("");
	    });
	}
    });





    /*$.post("/people/new", { "name":"Sylvan", "age":20 }, function (response) {
	console.log(response);

	console.log("getting the json file a second time");
	$.getJSON("/people.json", function (response) {
	    console.log(response);
	});	
    });*/

};

$(document).ready(main);
