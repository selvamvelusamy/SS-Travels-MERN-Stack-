import React from 'react';
import {NavLink} from 'react-router-dom';
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
    <li className="nav-item">
    <NavLink to='/home' className="nav-link check text-white">Home</NavLink>
    </li>
    <li className="nav-item">
    <NavLink to='/login' className="nav-link check text-white">Login</NavLink>
    </li>
  </ul>
</nav>
    );
}

export default Navigation;