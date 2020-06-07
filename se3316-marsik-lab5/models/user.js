var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    reviewId:{
        type:[Schema.Types.ObjectId]
    },
    isActive:{
        type:Boolean
    }
});

var User = mongoose.model('User',userSchema);
module.exports = User;