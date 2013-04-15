var http = require("http"),
    express = require("express"),
    mongoose = require("mongoose"),
    path = require("path"),
    app = express();

mongoose.connect("mongodb://localhost/development");

var PersonSchema = {
    "name": String,
    "age" : Number,
};

var Person = mongoose.model("Person", PersonSchema);

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

app.configure(function () {
    // Define our static file directory, it will be 'public'                             
    app.use(express.static(path.join(__dirname, "public")));

    // This allows us to parse the post requests data
    app.use(express.bodyParser());
});

http.createServer(app).listen(3000, function () {
    console.log("Server running on port 3000");
});

app.get("/people.json", function (req, res) {
    Person.find({}, function (err, people) {
	if (err !== null) {
	    console.log(err);
	} else {
	    res.json(people);
	}
    });
});

app.post("/people/new", function (req, res) {
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
});

