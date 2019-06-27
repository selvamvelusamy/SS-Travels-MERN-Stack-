import React, { Component } from 'react';
import{ register,Loginto,checkUser } from '../components/operations';
import NavigationHome from '../components/Navigation/Navigationhome';
import {toast } from 'react-toastify';
import axios from 'axios';
import './Login.css';
class Login extends Component {

    state = {
        change:false,
        image:''

      }
    change = ()=> {
      this.setState({
        change:!this.state.change
      })
    }
    
    clear = () => {
        document.getElementById("username").value="";
        document.getElementById("password").value="";
    }
    
    go= (e)=> {
        e.preventDefault();
        const data = {
            fname: document.getElementById("fname").value,
            lname: document.getElementById("lname").value,
            email: document.getElementById("email").value,
            uname: document.getElementById("uname").value,
            password: document.getElementById("rpassword").value,
            image:this.state.image
        }
        checkUser(data)
        .then(d=>{
             document.getElementById("fname").value="";
            document.getElementById("lname").value="";
             document.getElementById("email").value="";
             document.getElementById("uname").value="";
            document.getElementById("rpassword").value="";
            if(d.data.data === null){
                register(data).then(res => {
                    this.change();
                    toast.success("Account created Successfully!", {
                        position: toast.POSITION.TOP_CENTER
                      });
                })
            }
            else {
                toast.error("User Already Exists!", {
                    position: toast.POSITION.TOP_CENTER
                  });
            }
        })
        
    }
    
    loginto=(e)=> {
        e.preventDefault();
        let data = {
            email: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
        this.clear();
        Loginto(data).then(data =>{
            if(data.data.token) {
                localStorage.setItem("email",data.data.email);
                if(data.data.email==="admin")
                this.props.history.push(`/admin`);
                else if(data.data.email==="sel"){
                    this.props.history.push(`/supplier`);
                }
                else {
                    this.props.history.push(`/user`);
                }
            }
            else {
                toast.error("User not Exists !", {
                    position: toast.POSITION.TOP_CENTER
                  });
            }
        });
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

      render() {
        return (
          <div>
              <NavigationHome />
         {!this.state.change?<div id="login">
          <h3 className="text-center text-info black pt-5">Welcome</h3>
          <div className="container">
              <div id="login-row" className="row justify-content-center align-items-center">
                  <div id="login-column" className="col-md-6">
                      <div id="login-box" className="col-md-12">
                          <form id="login-form" className="form" onSubmit={this.loginto}>
                              <h3 className="text-center text-info ">Login</h3>
                              <div className="form-group">
                                  <label  className="text-info">Username:</label>
                                  <input type="text" name="username" id="username" className="form-control" required/>
                              </div>
                              <div className="form-group">
                                  <label  className="text-info">Password:</label>
                                  <input type="password" name="password" id="password" className="form-control" required/>
                              </div>
                              
                              <div className="form-group text-center">
                                  <button className="btn btn-outline-success align-items-center" type="submit">Login</button>
                                  <button className="btn btn-outline-success align-items-center ml-3" onClick={this.clear}>Clear</button>
                              </div>
                              </form>
                              <div id="register-link" className="text-center mt-5">
                                  <p className="text-info" onClick={this.change}>New User</p>
                              </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>:
      
      <div id="login">
      <h3 class="text-center text-info black pt-5 mb-5">User Page</h3>
      <div class="container">
          <div id="login-row" class="row justify-content-center align-items-center">
              <div id="login-column" class="col-md-6">
                  <div id="login-box" class="col-md-12">
                      <form id="login-form" class="form" onSubmit={this.go}>
                          <h3 class="text-center text-info">Registration</h3>
                          <div class="form-group">
                              <label for="password" class="text-info">First Name:</label>
                              <input type="text" name="name" id="fname" class="form-control"/>
                          </div>
                          <div class="form-group">
                              <label for="password" class="text-info">Last Name:</label>
                              <input type="text" name="name" id="lname" class="form-control"/>
                          </div>
                          <div class="form-group">
                              <label for="username" class="text-info">Email:</label>
                              <input type="text" name="username" id="email" class="form-control"/>
                          </div>
                          <label for="password" class="text-info">Image for Profile:</label>
                          <div class="custom-file">
                         
                              <input type="file" name="name" id="file" class="custom-file-input" onChange={this.fileget.bind(this)}/>
                              <label class="custom-file-label" for="myfile">Choose file</label>
                          </div>
                          <div class="form-group">
                              <label for="password" class="text-info">Userame:</label>
                              <input type="text" name="name" id="uname" class="form-control"/>
                          </div>
                          <div class="form-group">
                              <label for="password" class="text-info">Password:</label>
                              <input type="password" name="password" id="rpassword" class="form-control" />
                          </div>
                          <div className="form-group text-center  mb-5">
                              <button className="btn btn-outline-success align-items-center" type="submit">Register</button>
                              <button className="btn btn-outline-success align-items-center ml-3" onClick={this.clear1}>Clear</button>
                          </div>
                          </form>
                          <div id="register-link" class="text-center mb-5 extra">
                              <p class="text-info" onClick={this.change}>Already Have an Account</p>
                          </div>
                  </div>
              </div>
          </div>
      </div>
    </div>}
    </div>
        );
      }
}

export default Login;
