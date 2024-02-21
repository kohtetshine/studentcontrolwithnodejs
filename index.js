require('./models/db')

// Importing required modules
const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

// Importing controllers
const studentController = require("./controllers/studentController");

// Initializing Express app
const app = express();

// Configuring middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// Setting up routes
app.get('/', (req, res) => {
    res.send(`
        <h2>Welcome To Students Database</h2>
        <h3>Click here to get access to the <b><a href="/student/list">Database</a></b></h3>
    `);
});

// Setting up view engine
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: path.join(__dirname, '/views/layouts')
}));
app.set('view engine', 'hbs');

// Starting the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

// Using studentController for '/student' routes
app.use('/student', studentController);
