const mongoose = require('mongoose');
require('dotenv/config');
const api = process.env.API_URL;

/*const connect = mongoose.connect("mongodb://KAWTHAR'S ORG - 2024-04-28/UCMAS");

connect.then(() => {
    console.log("Database connected successfully!");
})
.catch(() =>{
    console.log("Database cannot be connected");
});*/

mongoose.connect(process.env.DB_CONNECTION_STR)
.then(()=> {
    console.log('Database connected successfuly');
})
.catch((err)=> {
    console.log(err);
});

//create a schema
const LoginSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

//collection part
const User = mongoose.model("users", LoginSchema);
module.exports = User;