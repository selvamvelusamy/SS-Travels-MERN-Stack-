const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const busSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    destination: {
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true
    },
    coach:{
        type:String,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    no:{
       type:Number,
       required:true
    },
    price:{
        type:String,
        required:true
    },
    departuretime:{
        type:String,
        required:true
    },
    arrivaltime:{
        type: String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    day:[],
    prices:[],
    arrivals: []
});
module.exports = Bus = mongoose.model('buses',busSchema);