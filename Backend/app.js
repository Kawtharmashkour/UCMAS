//npm install express
const express = require('express');
const app = express();
const morgan = require('morgan'); // middleware library for logging
const mongoose = require('mongoose');
//const collection = require("./config");
const path = require('path');
const bcrypt = require('bcrypt');

//static file
app.use(express.static(path.join(__dirname, '..', 'Public')));

//DB Schemas
const User = require('./models/user');
const Program = require('./models/program');
const Course = require('./models/course');

// To use environment var. from .env file
// npm install dotenv
//require('dotenv/config');
require('dotenv').config();
const api = process.env.API_URL;

// Middleware
//Middleware in Express.js, is a function that has access to the request object (req), the response object (res),
//it is used to modularize and enhance the functionality of the application. Middleware functions can be added to the application's request processing pipeline using the app.use() method, 
//where they are executed sequentially for each incoming HTTP request.
app.use(express.json()); //convert data into json format
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}));



//use EJS as the view engine
app.set('views', path.join(__dirname, '..', 'Public', 'views'));
app.set('view engine', 'ejs');


/*app.get("/", (req,res) => {
    res.render("login");
})

app.get("/signup", (req,res) => {
    res.render("signup");
})


//Register user
app.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        const newUser = new collection({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password  
        });
        await newUser.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});*/

// routes
const courseRouters = require('./routers/course');
const programRouters = require('./routers/program');
const userRouters = require('./routers/user');

app.use(`${api}/course`, courseRouters);
app.use(`${api}/program`, programRouters);
app.use(`${api}/user`, userRouters);

app.get('/', (req, res) => {
    res.render('index');  // Ensure you have an index.ejs file in your views directory
})
// app.get(`${api}/user`, (req, res) => {
//     res.send('Hello API');
// });

// Database connection
mongoose.connect(process.env.DB_CONNECTION_STR)
.then(()=> {
    console.log('Database connected successfuly');
})
.catch((err)=> {
    console.log(err);
});

// run the server for development
app.listen(3000, ()=> {
    //call back func. after server creation successfuly
    console.log('Server running on local host with port 3000')
});