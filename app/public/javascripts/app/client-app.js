var main = function () {
	console.log("hello world!");

	var addToDoToList = function (todo) {
		$(".todo_list").append("<p>"+todo.name+" "+todo.categories+"</p>");
	};

	$.getJSON("/todos.json", function (response) {
		response.forEach(function(todo) {
			console.log(todo);
		});
	});

	// adds the new todo on click
	$("#new_todo").click(function () {
		var name = $("#todo_name").val(),
			categories = $("#todo_categories").val(),
			post_object = {};

		if (name === "" || categories === "") {
			alert("The new to-do item must have a name and at least one category.");
		}
		else {
			post_object.name = name;
			post_object.categories = categories;
			console.log(post_object);

			$.post("/todo", post_object, function (response) {
				console.log(response);
				addToDoToList(response);
				$("#todo_name").val("");
				$("#todo_categories").val("");
			});
		}
	});

	// submits form on enter key
    function submitOnEnter(e) {
        if (e.keyCode === 13) {    // 13 is the enter key
            $("#new_todo").click();
        }
    }
};

$(document).ready(main);
