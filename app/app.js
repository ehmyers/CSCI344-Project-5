var http = require("http"),
    express = require("express"),
    path = require("path"),
    app = express(),
    todoController;

// Load Controllers
todoController = require("./controllers/todo_controller.js");

app.configure(function () {
    // Define our static file directory, it will be 'public'                             
    app.use(express.static(path.join(__dirname, "public")));

    app.set("views", __dirname + "/views");
    app.set("view engine", "ejs");

    // Setup less middleware
    app.use(require("less-middleware")({
    	"prefix": "",
    	"src": __dirname + "/public/stylesheets/app",
    	"dest": __dirname + "/public/stylesheets/app"
    }));

    // This allows us to parse the post requests data
    app.use(express.bodyParser());
});

http.createServer(app).listen(3000, function () {
    console.log("Server running on port 3000");
});

app.get("/", todoController.index);
app.get("/todos/new", todoController.createForm);
app.get("/todos", todoController.list);
app.get("/todos/categories", todoController.categoryList);

app.post("/todo", todoController.create);
app.delete("/todo", todoController.destroy);