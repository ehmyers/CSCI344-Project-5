var mongoose = require("mongoose"),
    PersonSchema,
    Person;

mongoose.connect("mongodb://localhost/development");

PersonSchema = new mongoose.Schema({
    "name": String,
    "age" : Number
});

Person = mongoose.model("Person", PersonSchema);

Person.findOne({}, function (err, result) {
    if (err !== null) {
	console.log(err);
    } else if (result === null) {
	var p = new Person({
	    "name": "Bill",
	    "age": 42
	});

	p.save(function (err) {
	    if (err !== null) {
		console.log(err);
	    }
	});
    }
});

module.exports = Person;

