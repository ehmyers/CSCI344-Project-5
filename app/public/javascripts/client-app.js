var main = function () {
    console.log("hello world!");

    $.getJSON("/people.json", function (response) {
	console.log(response);
    });

    $.post("/people/new", { "name":"Sylvan", "age":20 }, function (response) {
	console.log(response);

	console.log("getting the json file a second time");
	$.getJSON("/people.json", function (response) {
	    console.log(response);
	});	
    });

};

$(document).ready(main);
