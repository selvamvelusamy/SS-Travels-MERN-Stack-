import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-times/css/material/default.css';
import 'react-times/css/classic/default.css';

import Login from './pages/Login';
import Admin from './pages/Admin';
import Supplier from './pages/Supplier';
import Home from './pages/Home';
import User from './pages/User';
import NewEvent from './components/NewEvent/NewEvent';
import EditProfile from './components/EditProfile/EditProfile';
import Bookings from './pages/Bookings';
import './App.css';
import Model from './components/Model/Model';
import Query from './pages/Query';


class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        <main>
        <Switch>
          <Redirect from="/" to="/home" exact />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
          <Route path="/supplier" component={Supplier} />
          <Route path="/home" component={Home} />
          <Route path="/newEvent" component={NewEvent} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/editPack" component={Model} />
          <Route path="/editProfile" component={EditProfile} />
          <Route path="/query" component={Query}/>
        </Switch>
        <ToastContainer autoClose={2000}/>
        </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
