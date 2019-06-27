import React, {Component} from 'react';
import { NavLink} from 'react-router-dom';
import {getUserData,updateUser, CheckPassword,UpdatePassword} from '../operations';
import axios from 'axios';
import './EditProfile.css';
import Navigation from '../Navigation/Navigation';
import {toast } from 'react-toastify';

class EditProfile extends Component {
    state = {
        bookings:[],
        fname:'',
        lname:'',
        uname:'',
        image:'',
        password:'',
        place:[],
        price:[],
        amount:0,
        message:[],
        toggle:true,
        newToggle:true
    }

    fileget=(data)=>{
        const cloudinaryURL ="https://api.cloudinary.com/v1_1/selvamscloudinary/upload";
        const cloudinaryPreset = "ahh31z6s";
        let file=data.target.files[0];
        let formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset',cloudinaryPreset);
        axios({
            url: cloudinaryURL,
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:formData
        })
        .then(res=>{
            this.setState({
                image:res.data.secure_url
            })
           console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
    }
    
    componentDidMount(){
        let data = {
            email:localStorage.getItem("email")
        }
        getUserData(data)
        .then(data=>{
            this.setState({
                email:localStorage.getItem("email"),
                fname:data.data.data.fname,
                lname:data.data.data.lname,
                uname:data.data.data.uname,
                image:data.data.data.image,
            })
           
        })
    }

    change=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    update=()=>{
        let val = this.state;
        updateUser(val)
        .then(data=>{
           if(data.data.result === 1){
            toast.success("Profile Updated Successfully !", {
                position: toast.POSITION.TOP_CENTER
              });
           }
           else {
            toast.error("Profile was not Updated !", {
                position: toast.POSITION.TOP_CENTER
              });
           }
        })
    }

    togglePassword=(e)=>{
        e.preventDefault()
       this.setState({
           toggle:!this.state.toggle
       })
    }
    checkPassword= async (e)=>{
        let data = {
            email:localStorage.getItem("email"),
            password:e.target.value
        }
        let res = await CheckPassword(data)
        if(res.data.result === true) {
            this.setState({
                newToggle:!this.state.newToggle
            })
        }
    }
    updatePassword= ()=>{
        let data={
            email:localStorage.getItem("email"),
            password:this.state.password
        }
        UpdatePassword(data)
        .then(data=>{
            if(data.data.result === 1){
                toast.success("Password Updated Successfully !", {
                    position: toast.POSITION.TOP_CENTER
                  });
               }
               else {
                toast.error("Password was not Updated !", {
                    position: toast.POSITION.TOP_CENTER
                  });
               }
        })
    }
    render(){
        let style1={
            display:"none"
        }
        let style2={
            display:"block"
        }
        return (
            <div>
                <Navigation img={this.state.image} email={this.state.email}/>
               <div className="col">
               <div id="login">
                 <div className="container">
                     <div id="login-row" className="row justify-content-center align-items-center">
                         <div id="login-column" className="col-md-6">
                             <div id="login-box" className="col-md-12">
                                 <form id="login-form" className="form">
                                     <h3 className="text-center text-info">Update Profile</h3>
                                     <div className="form-group">
                                         <label className="text-info">First Name:</label>
                                         <input type="text" name="fname" id="fname" className="form-control" onChange={this.change.bind(this)} value={this.state.fname}/>
                                     </div>
                                     <div className="form-group">
                                         <label  className="text-info">Last Name:</label>
                                         <input type="text" name="lname" id="lname" className="form-control"onChange={this.change.bind(this)} value={this.state.lname}/>
                                     </div>
                                     <div className="form-group">
                                         <label  className="text-info">Preview:</label>
                                         <img className="preview" src={this.state.image} alt="Profile preview"/>
                                     </div>
                                     <label  className="text-info">Image for Profile:</label>
                                     <div className="custom-file">
                                    
                                         <input type="file" name="name" id="file" className="custom-file-input" onChange={this.fileget.bind(this)}/>
                                         <label className="custom-file-label" >Choose file</label>
                                     </div>
                                     <div className="form-group">
                                         <label  className="text-info">Userame:</label>
                                         <input type="text" name="uname" id="uname" className="form-control"onChange={this.change.bind(this)} value={this.state.uname}/>
                                     </div>
                                     <div className="form-group text-center  mb-5">
                                      <NavLink to='/user'><button className="btn btn-outline-success align-items-center" type="submit" onClick={this.update}>Update</button></NavLink>
                                      <NavLink to='/user'><button className="btn btn-outline-success align-items-center ml-3">Cancel</button></NavLink>
                                     </div>
                                     </form>
                             </div>
                         </div>
                     </div>
                 </div>
                </div>
               </div>
               <div className="col">
               <div id="login">
                 <div className="container">
                     <div id="login-row" className="row justify-content-center align-items-center">
                         <div id="login-column" className="col-md-6">
                             <div id="login-box" className="col-md-12">
                                 <form className="form">   
                                 <div className="form-group text-center">
                                        <button className="btn btn-info text-center" onClick={this.togglePassword}>Change Password</button>   
                                     </div>
                                     <div id="password-change" style={this.state.toggle?style1:style2}>
                                     <div className="form-group">
                                         <label  className="text-info">Old Password:</label>
                                         <input type="password" name="oldPassword" id="oldPassword" onChange={this.checkPassword.bind(this)} className="form-control"/>
                                     </div>
                                     <div className="form-group" style={this.state.newToggle?style1:style2}>
                                         <label  className="text-info">New Password:</label>
                                         <input type="password" name="password" id="newPassword" className="form-control" onChange={this.change.bind(this)}/>
                                     </div>
                                     </div>
                                     <div className="form-group text-center  mb-5">
                                      <NavLink to='/user'><button className="btn btn-outline-success align-items-center" type="submit" onClick={this.updatePassword}>Update</button></NavLink>
                                      <NavLink to='/user'><button className="btn btn-outline-success align-items-center ml-3">Cancel</button></NavLink>
                                     </div>
                                     </form>
                             </div>
                         </div>
                     </div>
                 </div>
                </div>
               </div>                        
            </div>
        );
    }
}
export default EditProfile;