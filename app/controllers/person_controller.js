var Person = require("../models/person.js"),
    PersonController = {};

PersonController.list = function (req, res) {
    Person.find({}, function (err, people) {
	if (err !== null) {
	    console.log(err);
	} else {
	    res.json(people);
	}
    });
};

PersonController.create = function (req, res) {
    var p = new Person({
	"name":req.body.name,
	"age":req.body.age
    });

    p.save(function (err, result) {
	if (err !== null) {
	    //send the error
	} else {
	    res.json(result);
	}
    });
};

PersonController.destroy = function (req, res) {
    Person.findOne({"name":req.body.name}, function (err, person) {
	if (err !== null) {
	    //handle err
	} else if (person === null) {
	    //person not found
	} else {
	    person.remove(function (err) {
		if (err !== null) {
		    //handle err
		}
	    });
	}
    });
};

module.exports = PersonController;
