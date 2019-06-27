import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import UserCard from '../components/card/UserCard';
import {Booking,addToBooking,getImage} from '../components/operations';
import {toast } from 'react-toastify';
import './User.css';
import Navigation from '../components/Navigation/Navigation';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class User extends Component {
  state = {
      change:false,
      arr:[],
      date:new Date(),
      day:null,
      image:'',
      from:'',
      to:''
  }

  clear = () => {
    document.getElementById("from").value="";
    document.getElementById("to").value="";
}
  got=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
 book =(e)=>{
     e.preventDefault();
     let onGoing = {
       from:this.state.from,
       to:this.state.to,
       day:this.state.day
     }
     localStorage.setItem("from",this.state.from);
     localStorage.setItem("to",this.state.to);
   Booking(onGoing)
   .then(data=>{
     this.setState({
        arr:data.data.data
     })
     this.render();
    if(this.state.arr.length>0){
    this.setState({
      change:!this.state.change
    })
  } 
  else {
      this.clear()
       toast.error("No Packages are available!", {
      position: toast.POSITION.TOP_CENTER
    });
  }
   })
 }
 accept=(data)=>{
     let x=window.confirm("Are you sure to Booking With this Package!");
     if(x){
     const item={
         no:data.target.id,
         email:localStorage.getItem("email"),
         day:this.state.day,
         from:this.state.from,
         to:this.state.to,
         date:this.state.date
     }
      addToBooking(item)
      .then(data=>{
          if(data.data.message === "Already Exists") {
               toast.warn("Already Booked this Package!", {
                     position: toast.POSITION.TOP_CENTER
    });
          }
          else {
                toast.success("Booking Successfully Completed!", {
                      position: toast.POSITION.TOP_CENTER
    });
          }
      })
    }
   }
 
   returnBack=()=>{
       this.setState({
           change:!this.state.change
       })
   }
   gotdata=(date)=>//{this.setState({date})}
   {
       let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
       this.setState({
           day:days[date.getDay()],
           date:date
       })
   }
   componentWillMount(){
    let data={
        email:localStorage.getItem("email")
    }
    getImage(data)
    .then(image=>{
        this.setState({
           image:image.data.data.image
        })
    })
   }

  render() {
    return (
      <div>
          <Navigation email={localStorage.getItem("email")} image={this.state.image}/>
        {!this.state.change? <div className="container">
              <div id="login-row" className="row justify-content-center align-items-center">
                  <div id="login-column" className="col-md-6">
                      <div id="login-box" className="col-md-12">
                          <form id="login-form" className="form" action="" onSubmit={this.book}>
                              <h3 className="text-center text-info">Book a Package</h3>
                              <div className="form-group">
                                  <label  className="text-info">from</label>
                                  <input type="text" name="from" id="from" onChange={this.got.bind(this)} className="form-control" required/>
                              </div>
                              <div className="form-group">
                                  <label  className="text-info">To</label>
                                  <input type="text" name="to" id="to" onChange={this.got.bind(this)} className="form-control" required/>
                              </div>
                              <div className="form-group">
                                  <label  className="text-info">Date</label>
                                 <DatePicker className="mywidth"
                                 selected={this.state.date}
                                 onChange={this.gotdata} required/>
                              </div>
                             
                              <div className="form-group text-center">
                                  <button className="btn btn-outline-success align-items-center" type="submit">Search</button>
                                  <button className="btn btn-outline-success align-items-center ml-3" onClick={this.clear}>Clear</button>
                              </div>
                              </form>
                              <div className="form-group text-center">
                              <NavLink to="/bookings"> <button className="btn btn-outline-success align-items-center ml-1">Your Bookings</button></NavLink>
                              </div>
                              
                      </div>
                  </div>
              </div>
          </div>:this.state.arr.map((item)=>{
                   return <UserCard 
                   key={item.no}
                   id={item.no}
                   price={item.price}
                   prices={item.prices}
                   source={item.source}
                   destination={item.destination}
                   coach={item.coach}
                   arrivals={item.arrivals}
                   img={item.image}
                   accept={this.accept.bind(this)}
                   seats={item.seats}
                   />
               }) 
               }  
               {this.state.change?<div><div className="form-group text-center">
                              <NavLink to="/bookings"> <button className="btn btn-outline-success align-items-center ml-1">Your Bookings</button></NavLink>
                              </div><div className="form-group text-center">
                              <button className="btn btn-outline-success align-items-center ml-1" onClick={this.returnBack}>Cancel</button>
                              </div></div>:
                            <div></div>}
               }
      </div>
    );
  }
}

export default User;
