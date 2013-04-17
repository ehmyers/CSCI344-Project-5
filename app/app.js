var http = require("http"),
    express = require("express"),
    path = require("path"),
    app = express(),
    pc;

// Load Controllers
pc = require("./controllers/person_controller.js");

app.configure(function () {
    // Define our static file directory, it will be 'public'                             
    app.use(express.static(path.join(__dirname, "public")));

    // This allows us to parse the post requests data
    app.use(express.bodyParser());
});

http.createServer(app).listen(3000, function () {
    console.log("Server running on port 3000");
});

app.get("/people.json", pc.list);
app.post("/people/new", pc.create);
//app.post("/people/delete", pc.destroy);

