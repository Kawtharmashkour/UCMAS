
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
})

userSchema.virtual('id').get(function(){
    return this._id.toHexString()
});

userSchema.set('toJSON',{virtuals : true});


exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
