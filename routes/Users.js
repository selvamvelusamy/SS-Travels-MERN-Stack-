const express  =require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Bus = require('../models/bus');
const Temp = require('../models/Temp');
users.use(cors());
process.env.SECRET_KEY = 'secret';
users.post('/register',(req, res)=> {
    const userData = {
        fname: req.body.fname,
        lname: req.body.lname,
        uname: req.body.uname,
        email: req.body.email,
        password: req.body.password,
        image:req.body.image,
        bookings:[],
        message:[],
        amount:0
    }
 
    User.findOne({
        email:req.body.email
    })
    .then(user =>{
        if(!user) {
            bcrypt.hash(req.body.password,12,(err,hash)=>{
                userData.password = hash
                User.create(userData)
                .then(user=>{
                    res.json({status: user.email +' registered'});
                })
                .catch(err =>{
                    res.send('Error :'+err);
                })
            });
        }
        else {
            res.json({Error: 'User already Exists'});
        }
    })
    .catch(err =>{
        res.send('Error:: '+err);
    })
 });
 
users.post('/login',(req, res) =>{
    User.findOne({
        email:req.body.email
    })
    .then(user =>{
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    uname: user.name,
                    email: user.email
                }
                let token = jwt.sign(payload,process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({"token":token,
                          "email":user.email,
                        "uname":user.uname});
            } 
            else {
                res.json({error: "User Doesnot Exist"});
            }
        }else {
            res.json({error: "User Doesnot Exist"});
        }
    })
    .catch(err=>{
        res.send('error: '+err);
    })
});

users.post('/create',(req, res)=> {
    let data={
        name:req.body.name,
        no:req.body.no,
        source:req.body.source,
        destination:req.body.destination,
        creator:req.body.creator,
        coach:req.body.coach,
        arrivals:req.body.arrivals,
        prices:req.body.prices,
        price:req.body.price,
        departuretime:req.body.departuretime,
        arrivaltime:req.body.arrivaltime,
        day:req.body.day,
        seats:req.body.seats,
        image:req.body.image
    }
    Temp.findOne({
        no:req.body.no
    })
    .then(bus =>{
        if(!bus){
            Temp.create(data).then(bus =>{
                res.json({status:"bus "+bus.no+" created"})
            })
        }
        else{
            res.json({error:"Bul is alreay exists"})
        }
    })
    .catch(err =>{
        res.json({error:"cannot craete"});
    })
});



users.post('/findbyno',async (req, res)=>{

    let resdata=[];
    try {
        const data = await User.findOne({
            email: req.body.email
        })
        let result = await data.bookings.filter(e => {
            return Bus.findOne({no:e.no})
        })
        
        if(result.length) {
           const ans = result.map(async item => {
               return Bus.findOne({no:item.no})
            })
            Promise.all(ans).then(sol => {
                resdata.push(sol);
              
            }).then(() => {
                res.json({resdata,result})
            }).catch(err => {
               throw err;
            });
        }
    } catch(err) {
        console.log(err)
    }
})

users.post('/findbycreator',(req, res)=>{
    Bus.find({
        creator:req.body.creator
    })
    .then(data=>{
        if(data) {
            res.json({
                no:data
            })
        }
        else{
           res.json({message:"No Busses ara available"});
        }
    })
})

users.post('/findbycreatorWithHeld',(req, res)=>{
    Temp.find({
        creator:req.body.creator
    })
    .then(data=>{
        if(data) {
            res.json({
                no:data
            })
            
        }
        else{
           res.json({message:"No Busses ara available"});
        }
    })
})

users.post('/allTemporary',(req,res)=>{
    Temp.find()
    .then(data =>{
        res.json({no:data})
    })
})

users.post('/Accept',(req, res)=>{
     Temp.findOne({
        no:req.body.no
     })
     .then(data=>{
          const obj1={
            name:data.name,
            no:data.no,
            source:data.source,
            destination:data.destination,
            creator:data.creator,
            coach:data.coach,
            arrivals:data.arrivals,
            prices:data.prices,
            price:data.price,
            departuretime:data.departuretime,
            arrivaltime:data.arrivaltime,
            day:data.day,
            seats:data.seats,
            image:data.image
          }
          Bus.create(obj1)
          .then(data=>{
                  let no=req.body.no+req.body.message;
                  User.updateOne(
                    {email:data.creator},
                    {"$push":{"message":no}}).exec();
              Temp.find({no:data.no}).deleteOne().exec();
          })
         })
     .catch(err=>{
         res.json({message:"cannot perfom"})
     })
})

users.post('/Reject',(req, res)=>{
    let no=req.body.no+req.body.message;
    Temp.find({no:req.body.no}).then(d=>{
       User.updateOne({email:d.email},{"$push":{"message":no}})
   })
    Temp.findOne({
        no:req.body.no
     }).deleteOne().exec();
})

users.post('/Book',async (req, res)=>{
     let from = req.body.from.toLowerCase();
     let to = req.body.to.toLowerCase();
     let day = req.body.day;
    let res1=await Bus.find()
    
        let result =await res1.filter(e=>{
            let arr = e.arrivals;
            arr.unshift(e.source);
            arr.push(e.destination);
            let arr1 =arr.map(e=>e.toLowerCase());
            if(arr1.indexOf(from) < arr1.indexOf(to) && arr1.indexOf(from)>-1 && arr1.indexOf(to)>-1) {
                return e;
            } 
        })
        res.json({data:result});
     
})

users.post('/addBooking', (req, res)=>{
    let no=req.body.no;
    let email=req.body.email;
    let from=req.body.from.toLowerCase();
    let to=req.body.to.toLowerCase();
    let amount1=0;
    let amount2=0;
    let amount=0;
    User.findOne({
        email:email
    })
    .then(data=>{
        let result = data.bookings.filter(e=>{
            return e.no == no
        });
        if(result.length>0) {
            res.json({
                message:"Already Exists"
            })
        }
        else {
            Bus.updateOne({no:no},{"$inc":{seats:-1}}).exec();
            Bus.findOne({no:no})
            .then(async data=>{
                let creator =data.creator;
                let arr = data.arrivals.map(item=>item.toLowerCase());
                if(data.source.toLowerCase() === from) {
                    amount1=data.price;
                }
                else{
                    amount1=data.prices[arr.indexOf(from)];
                }
                if(data.destination.toLowerCase()===to) {
                    amount2 = 0;
                }
                else {
                    amount2=data.prices[arr.indexOf(to)];
                }
                amount = amount1 - amount2;
                let obj={
                    no:no,
                    from:req.body.from,
                    to:req.body.to,
                    date:req.body.date,
                    paid:amount
                }
               let d= await User.updateOne(
                    {email:email},
                    {"$push":{"bookings":obj}}
                )
                let crUpdate = await User.updateOne(
                    {email:creator},
                    {"$inc":{amount:amount,count:1}}
                )
                    User.updateOne(
                        {email:email},
                        {"$inc":{amount:amount,count:1}}
                    )
                .then(data=>{
                    res.json({
                        message:"added Successfully"
                    })
                })
            })
            
        }
    })
})

users.post('/checkuser',(req,res)=>{
    const email = req.body.email;
    User.findOne({email:email})
    .then(data=>{
        res.json({data});
    })
})

users.post('/cancelbooking',async (req,res)=>{
    const email=req.body.email;
    const no= req.body.no.toString();
    let busdata= await Bus.findOne({no:no})
    Bus.updateOne({no:no},{"$inc":{seats:1}}).exec();
    User.findOne({email:email})
    .then(data=>{
        data.bookings.map(async (e,i)=>{
            if(e.no === Number(no)) {
                let userUpdate= await User.updateOne(
                    {email:email},
                    {"$inc":{amount:-e.paid,count:-1}}
                )
                let supplierUpdate = await User.updateOne(
                    {email:busdata.creator},
                    {"$inc":{amount:-e.paid,count:-1}}
                ) 
                   data.bookings.splice(i,1);
                   data.save();
                   res.json({data});
            }
        })
    })
})

users.post('/findBus',(req, res)=>{
    let no=req.body.no;
    Bus.findOne({no:no})
    .then(data=>{
        res.json({data})
    })
})

users.post('/update',(req, res)=>{
    no=req.body.no;
    Bus.find({no:no}).deleteOne().exec();
    let data={
        name:req.body.name,
        no:req.body.no,
        source:req.body.source,
        destination:req.body.destination,
        creator:req.body.creator,
        coach:req.body.coach,
        arrivals:req.body.arrivals,
        prices:req.body.prices,
        price:req.body.price,
        departuretime:req.body.departuretime,
        arrivaltime:req.body.arrivaltime,
        day:req.body.day,
        seats:req.body.seats,
        image:req.body.image
    }
    Temp.findOne({
        no:req.body.no
    })
    .then(bus =>{
        if(!bus){
            Temp.create(data).then(bus =>{
                res.json({status:"bus "+bus.no+" created"})
            })
        }
        else{
            res.json({error:"Bul is alreay exists"})
        }
    })
    .catch(err =>{
        res.json({error:"cannot craete"});
    })
})

users.post('/getMessage',(req, res)=>{
    let email = req.body.email;
    User.findOne({email:email})
    .then(data=>{
         res.json({data})
         data.message=[];
         data.save();
    })
})

users.post('/getImage',(req, res)=>{
    let email = req.body.email;
    User.findOne({email:email})
    .then(data=>{
        res.json({data});
    })
})

users.post('/getUserData',(req, res)=>{
    let email=req.body.email;
    User.findOne({email:email})
    .then(data=>{
        res.json({data:data})
    })
})

users.post('/updateUser',(req, res)=>{
    let data={
        email:req.body.email,
        fname:req.body.fname,
        lname:req.body.lname,
        uname:req.body.uname,
        image:req.body.image,
}
User.updateOne({email:data.email},
    {"$set":{"fname":data.fname,"lname":data.uname,"uname":data.uname,"image":data.image}})
    .then(data=>{
        res.json({result:data.n})
    })
    
})

users.post('/checkPassword',async (req, res)=>{
   let user=await User.findOne({email:req.body.email});
   let password = req.body.password;
   bcrypt.compare(password, user.password, function(err, result) {
    if(result) {
       res.json({result:true})
    }
    else {
        res.json({result:false})
    }
});

})

users.post('/updatePassword',async (req, res)=>{
     bcrypt.hash(req.body.password,12,(err,hash)=>{
         User.updateOne({email:req.body.email},
            {"$set":{"password":hash}})
            .then(data=>{
                res.json({result:data.n})
            })
     })
})

module.exports=users;