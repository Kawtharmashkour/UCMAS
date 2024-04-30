//npm install express
const express = require('express');
const app = express();
const morgan = require('morgan'); // middleware library for logging
const mongoose = require('mongoose');

//DB Schemas
const User = require('./models/user');
const Program = require('./models/program');
const Course = require('./models/course');

// To use environment var. from .env file
// npm install dotenv
require('dotenv/config');
const api = process.env.API_URL;

// Middleware
//Middleware in Express.js, is a function that has access to the request object (req), the response object (res),
//it is used to modularize and enhance the functionality of the application. Middleware functions can be added to the application's request processing pipeline using the app.use() method, 
//where they are executed sequentially for each incoming HTTP request.
app.use(express.json());
app.use(morgan('tiny'));

// routes
const courseRouters = require('./routers/course');
const programRouters = require('./routers/program');

app.use(`${api}/course`, courseRouters);
app.use(`${api}/program`, programRouters);

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