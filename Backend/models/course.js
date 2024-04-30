
const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        default : 0,
        required : true
    },
    // need word here
   program : {
       type : mongoose.Schema.Types.ObjectId,
       ref : 'Program' ,
       required : true
   },
   maxAge : {
    type : Number,
    required : true,
    min : 5,
    max : 13
    },
    duration : {
        type : Number,
        required : true,
        min : 3,
        max : 5
        }
}) 

courseSchema.virtual('id').get(function(){
    return this._id.toHexString()
});

courseSchema.set('toJSON',{virtuals : true});

exports.Course = mongoose.model('Course', courseSchema);
