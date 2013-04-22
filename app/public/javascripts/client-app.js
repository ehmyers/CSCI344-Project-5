var main = function () {
	console.log("hello world!");

	var addToDoToList = function (todo) {
		$(".todo_list").append("<p>"+todo.name+" "+todo.categories+"</p>");
	};

	$.getJSON("/todos.json", function (response) {
		response.forEach(function(todo) {
			console.log(todo);
			//addPersonToList(todo);
			//$(".todo_list").append("<p>"+todo.name+" "+todo.categories+"</p>");
		});
	});


	$("#new_todo").click(function () {
	var name = $("#name").val(),
		categories = $("#categories").val(),
		post_object = {};

	if (name === "" || categories === "") {
		// alert("hey! you gotta put in a category and a name");
	}
	else {
		post_object.name = name;
		post_object.categories = categories;
		console.log(post_object);

		$.post("/todo", post_object, function (response) {
			console.log(response);
			addToDoToList(response);
			$("#name").val("");
			$("#categories").val("");
			});
		}
	});
};

$(document).ready(main);
