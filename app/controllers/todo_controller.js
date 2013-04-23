var ToDo = require("../models/todo"),
    ToDoController = {};

ToDoController.categoryList = function (req, res) {
    ToDo.find({}, function(err, todos) {
        if (err) {
            res.send(err);
        }
        else {
            var categories = {};
            todos.forEach(function(todo) {
                todo.categories.forEach(function(category) {
                    if (!categories[category]) {
                        categories[category] = [];
                    }
                    categories[category].push(todo.name);
                });
            });
            res.render("category_list", {"categories": categories});
        }
    });
};

ToDoController.create = function (req, res) {
    var todo = new ToDo({
        "name":req.body.name,
        "categories":req.body.categories
    });

    todo.save(function (err, result) {
        if (err !== null) {
            //send the error
        }
        else {
            res.json(result);
        }
    });
};

ToDoController.createForm = function (req, res) {
    res.render("add_items");
};

ToDoController.destroy = function (req, res) {
    ToDo.findOne({"name":req.params.todo}, function (err, todo) {
        if (err !== null) {
            console.log(err);
            res.send("there was an error, yo");
        }
        else if (todo === null) {
            console.log("To-do not found");
            res.send("to do wasn't found");
        }
        else {
            todo.remove(function (err) {
                if (err !== null) {
                    console.log(err);
                }
                res.send("was deleted.");
            });
        }
    });
};

ToDoController.index = function (req, res) {
    res.redirect("/todos");
};

ToDoController.list = function (req, res) {
    ToDo.find({}, function (err, todo) {
        if (err !== null) {
            console.log(err);
        }
        else {
            res.render("all_items", {"todos": todo});
        }
    });
};

module.exports = ToDoController;