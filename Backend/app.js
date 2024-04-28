//npm install express
const express = require('express');
const app = express();

// To use environment var. from .env file
// npm install dotenv
require('dotenv/config');
const api = process.env.API_URL;

// routes
app.get('/', (req, res) => {
    res.send('Hello API');
});
app.listen(3000, ()=> {
    //call back func. after server creation successfuly
    console.log(api);
    console.log('Server running on local host with port 3000')
});