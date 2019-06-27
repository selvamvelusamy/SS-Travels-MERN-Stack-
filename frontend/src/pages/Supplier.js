import React, { Component } from 'react';
import Card from '../components/card/Card';
import EditCard from '../components/card/EditCard';
import {NavLink} from 'react-router-dom';
import {getByUser,getMessage,getImage} from '../components/operations';
import {getByUserWithHeld} from '../components/operations';
import {toast } from 'react-toastify';
import './Supplier.css';
import Navigation from '../components/Navigation/Navigation';
class Supplier extends Component {

    state={
        arr:[],
        arrwithheld:[],
        yourItems:true,
        empty:false,
        no:4,
        image:''
    }

    getWithHeld=()=>{
        let email={
            email:localStorage.getItem("email")
    }
        getByUserWithHeld(email)
        .then(data=>{
            const array=data.data.no;
            if(array.length>0) {
               this.setState({
                   empty:false
               })
            }
            else {
                this.setState({
                    empty:true
                })
            }
            this.setState({
                arrwithheld:array,
                yourItems:!this.state.yourItems
            })
        })
        .catch(err => {
            throw err;
        })
    }


    getDetails=()=>{
        let email={
            email:localStorage.getItem("email")
    }
        getByUser(email)
        .then(data=>{
            const array=data.data.no;
            if(array.length>0) {
                this.setState({
                    empty:false
                })
             }
             else {
                 this.setState({
                     empty:true
                 })
             }
            
            this.setState({
                arr:array,
                yourItems:!this.state.yourItems
            })
        })
        .catch(err => {
            throw err;
        })
        getMessage(email)
        .then(data=>{
                data.data.data.message.forEach(element => {
                   if(element.slice(-1) === '1') {
                   toast.success(" Your Package " + element.slice(0,-1)+ " was Approved !", {
                    position: toast.POSITION.TOP_CENTER
                  });
                }
                else {
                    toast.error(" Your Package "+ element.slice(0,-1)+" was not Approved!", {
                        position: toast.POSITION.TOP_CENTER
                      });
                }
                });
        })
       
    }

    componentDidMount(){
        this.getDetails();
        let email={
            email:localStorage.getItem("email")
        }
        getImage(email)
        .then(image=>{
            this.setState({
               image:image.data.data.image
            })
        })
    }
    edit=(no)=>{
        this.props.history.push({
            pathname: '/editPack',
            state:{
                no:no.target.id
            }
        });
    }

    render(){
        
        if(this.state.yourItems){
            return(
                <div>
                     <Navigation email={localStorage.getItem("uname")} image={this.state.image}/>
                    {  
                      this.state.empty ?
                      <div className="container text-center centify">
                         <div className="col ">
                             <div className="row">
                                  No Items are in WithHeld
                             </div>
                         </div>
                      </div>
                      : this.state.arrwithheld.map((item)=>{
                        return <Card 
                        id={item.no}
                        key={item.no}
                        source={item.source}
                        destination={item.destination}
                        coach={item.coach}
                        arrivals={item.arrivals}
                        img={item.image}
                        seats={item.seats}
                        />
                    })}
                    <div className="row">
                    <div className="text-center col">
                    <button className="text-center mb-5 btn btn-outline-info" onClick={this.getDetails}>Your Packages</button>
                </div>
                <div className="text-center col">
                    <NavLink to="/newEvent"><button className="text-center mb-5 btn btn-outline-info">Add Package</button></NavLink>
                </div>
                    </div>
                   
                </div>
             );
        }
        else {
             return(
                <div>
                    <Navigation />
                    {  
                      this.state.empty ?
                      <div className="container text-center centify">
                         <div className="col ">
                             <div className="row">
                                  No Items to Show
                             </div>
                         </div>
                      </div>
                      : this.state.arr.map((item)=>{
                        return <EditCard 
                        id={item.no}
                        key={item.no}
                        source={item.source}
                        destination={item.destination}
                        coach={item.coach}
                        arrivals={item.arrivals}
                        edit={this.edit.bind(this)}
                        img={item.image}
                        seats={item.seats}
                        />
                    })}
                    <div className="row">
                    <div className="text-center col">
                    <button className="text-center mb-5 btn btn-outline-info" onClick={this.getWithHeld}>With Held Items</button>
                </div>
                <div className="text-center col">
                    <NavLink to="/newEvent"><button className="text-center mb-5 btn btn-outline-info">Add Package</button></NavLink>
                </div>
                    </div>
                   
                </div>
             );
        }
    }
}

export default Supplier;
