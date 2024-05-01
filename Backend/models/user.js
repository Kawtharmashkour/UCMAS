
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userType:{
       type: String,
       required: true
    },

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
