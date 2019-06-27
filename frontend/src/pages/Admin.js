import React, { Component } from 'react';
import {temporary, Accept, Reject,getImage} from '../components/operations';
import AdminCard from '../components/card/AdminCard';
import './Admin.css';
import Navigation from '../components/Navigation/Navigation';
import { NavLink} from 'react-router-dom';

class Admin extends Component {

   state = {
       arr:[],
       empty:false
   }

   getAll = ()=> {
       temporary()
       .then(data=>{
           this.setState({
               arr:data.data.no
           })
           if(this.state.arr.length>0) {
            this.setState({
                empty:false
            })
        }
        else {
          this.setState({
              empty:true
          })
        }
       })
       .catch(err=>{
           throw err;
       })
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

   componentDidMount(){
       this.getAll();
   }

   accept = (item) => {
       if(window.confirm("Are you sure to ACCEPT this Package"))
       {
       const data ={
           no:item.target.id,
           message:"1"
       }
      Accept(data)
      let array = this.state.arr;
      let val = array.indexOf(data.no);
      array.splice(val,1);
      this.setState({
          arr:array
      })
    }
   }

   reject = (item) => {
       if(window.confirm("Are you sure to Reject this Package")){
    const data ={
        no:item.target.id,
        message:"0"
    }
    Reject(data);
    let array = this.state.arr;
      let val = array.indexOf(data.no);
      array.splice(val,1);
      this.setState({
          arr:array
      })
    }
  }

  render() {
    return (
     <div>
         <Navigation email={localStorage.getItem("email")} image={this.state.image}/>
                   <div className="text-right p-3">
                       <NavLink to="/query"><button className="btn btn-info">Analysis</button></NavLink>
                   </div>
                   <div className="text-center">
                       <h3 className="text-bold text-dark"> Items to validate </h3>
                   </div>
              
         {  
               this.state.empty?<div className="container text-center centify">
               <div className="col ">
                   <div className="row">
                        No Packages to Validate
                   </div>
               </div>
            </div>:
            this.state.arr.map((item)=>{
                   return <AdminCard 
                   name={item.name}
                   no={item.no}
                   price={item.price}
                   day={item.day}
                   prices={item.prices}
                   departuretime={item.departuretime}
                   arrivaltime={item.arrivaltime}
                   key={item.no}
                   id={item.no}
                   source={item.source}
                   destination={item.destination}
                   coach={item.coach}
                   arrivals={item.arrivals}
                   img={item.image}
                   accept={this.accept.bind(this)}
                   reject={this.reject.bind(this)}
                   seats={item.seats}
                   creator={item.creator}
                   />
               })}
     </div>
    );
  }
}

export default Admin;
