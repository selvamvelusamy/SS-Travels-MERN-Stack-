const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended:false
    })
);

const mongoURI = `mongodb+srv://user:user@cluster0-d931c.mongodb.net/bus?retryWrites=true&w=majority`;
mongoose.connect(mongoURI,{useNewUrlParser: true})
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log("Err: "+err));

const Users = require('./routes/Users');

app.use('/users',Users);

app.listen(port, ()=>{
    console.log("Server is Running on port: "+port);
})