const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    uname:{
        type:String,
        required: true
    },
    amount:{
      type:Number,
      required:true
    },
    image:{
        type:String,
        required:true
    },
    count:{
        type:Number
    },
    message:[],
    bookings:[{
        no:{type:Number},
        from:{type:String},
        to:{type:String},
        date:{type:Date},
        paid:{type:Number}
    }]
});

module.exports = User = mongoose.model('users', UserSchema);