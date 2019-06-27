import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import NavigationHome from '../components/Navigation/Navigationhome';
import './Home.css';
class Home extends Component {
    render(){
        return(
            <div>
                <NavigationHome />
            <div className="container h-100 bg-light">
              <div className="row h-200 align-items-center justify-content-center text-center mt-">
                <div className=" align-self-end">
                  <h3 className="text-uppercase text-info font-weight-bold p-10">lets fly with our feathers</h3>
                  <hr className="divider my-4"></hr>
                </div>
                <div className="col-lg-8 align-self-baseline">
                  <p className="text-white-75 font-weight-light mb-5">Welcome to India's Best Travelling partner to your travellings</p>
                  <NavLink to="/login">  <button className="btn btn-info btn-xl js-scroll-trigger">Find Out More</button></NavLink>
                </div>
              </div>
            </div>
            </div>
        );
    }
}

export default Home;