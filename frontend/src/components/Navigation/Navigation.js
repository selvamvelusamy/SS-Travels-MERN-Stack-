import React from 'react';
import {NavLink} from 'react-router-dom';
import {Logout} from '../Logout';

import './Navigation.css';
import img from '../../assets/1524471154busticketbookingreadymadeportalwebsite.png';

const Navigation =(props)=> {
    return (
        <nav className="navbar navbar-expand-sm bg-dark text-white navbar-light">
  <div className="nav-item line "><div className="line">
  
   <li className="nav-item"> <img src={img} className="logocheck " alt="logo"/> <NavLink to='/' className="nav-link tfont line text-white">SS Travels</NavLink></li>
   </div>
    </div>
  <ul className="navbar-nav ml-auto">
  
  <div className="btn-group dropleft">
        <li className="dropdown-toggle text-dark" data-toggle="dropdown"><img src={props.image} className="logocheck text-white" alt={props.email}/></li>
        <div className="dropdown-menu dropdown-menu-left text-left">
      <NavLink to='/home' className="dropdown-item">{props.email}</NavLink>
      <NavLink to='/editProfile' className="dropdown-item">Edit Profile</NavLink>
      <div className="dropdown-divider"></div>
      <NavLink to='/home' className="dropdown-item" onClick={Logout}>Logout</NavLink>
      </div>
    </div>
  </ul>
</nav>
    );
}

export default Navigation;