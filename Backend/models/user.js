
const mongoose = require('mongoose');

/*const userSchema = mongoose.Schema({
    name : {
        type : String,
        requied : true
    },
    email : {
        type : String,
        requied : true
    },
    passwordHash : {
        type : String,
        requied : true
    },
    street : {
        type : String,
        default : ''
    },
    appartment :  {
        type : String,
        default : ''
    },
    city :  {
        type : String,
        default : ''
    },
    zip :  {
        type : String,
        default : ''
    },
    country :  {
        type : String,
        default : ''
    },
    phone : {
        type : String,
        requied : true
    },
    userType : {
        type : String,
        default : false
    }
})*/

const userSchema = new mongoose.Schema({

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
const User = mongoose.model("users", userSchema);
module.exports = User;

/*userSchema.virtual('id').get(function(){
    return this._id.toHexString()
});

userSchema.set('toJSON',{virtuals : true});


exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;*/
