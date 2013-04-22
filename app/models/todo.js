var mongoose = require("mongoose"),
    ToDoSchema,
    ToDo;

mongoose.connect("mongodb://localhost/development");

ToDoSchema = new mongoose.Schema({
    "name": String,
    "categories" : [String]
});

ToDo = mongoose.model("ToDo", ToDoSchema);

// add methods here!

module.exports = ToDo;