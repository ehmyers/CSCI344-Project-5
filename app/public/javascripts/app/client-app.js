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
        categoryKnapsack = [],
        post_object = {};

        // splits the list into separate strings based on spaces
        categories.split(",").map(function (element) {
            // removes the spaces and adds to knapsack
            categoryKnapsack.push(element.trim());
            console.log(categoryKnapsack);
        });

        if (name === "" || categories === "") {
            alert("The new to-do item must have a name and at least one category.");
        }
        else {
            post_object.name = name;
            post_object.categories = categoryKnapsack;
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

    // removes the todo on click
    $(".icon-remove").click(function () {
        // console.log("You clicked a remove button!");
        var currentItem = $(this).parent().children(".todo_name");
        var currentItemHtml = currentItem.html();
        $.ajax("/todo/" + currentItemHtml, {
            "type": "DELETE",
            "success": function(data, textStatus) {
                console.log("Success data: " + data);
                if (currentItem.closest("ul").children().length === 1) {
                    console.log("deleting tha whole biz");
                    console.log(currentItem.closest(".one_category_area"));
                    currentItem.closest(".one_category_area").fadeOut();
                } else {
                    console.log("deleting napzack");
                    currentItem.parent().fadeOut();
                }
            }
        });
    });
};

$(document).ready(main);
