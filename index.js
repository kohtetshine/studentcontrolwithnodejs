require("./models/db");

const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");
const studentController = require("./controllers/studentController");

const app = express();

// Middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// View engine setup
app.set("views", path.join(__dirname, "views"));
const exphbsInstance = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: path.join(__dirname, "views/layouts")
});
app.engine("hbs", exphbsInstance.engine);
app.set("view engine", "hbs");

// Routes
app.get("/", (req, res) => {
    res.send(`
        <h2>Welcome to Students Database!!</h2>
        <h3>Click here to get access to the <b><a href="/student/list">Database</a></b></h3>
    `);
});

app.use("/student", studentController);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Serve static files (optional)
app.use(express.static(path.join(__dirname, "public")));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server started at port: ${PORT}`);
});
