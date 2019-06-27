import React, {Component} from 'react';
import './Query.css'
import {NavLink} from 'react-router-dom';
class Query extends Component {
    state={
        toggle:true
    }
    changeToggle=()=>{
        this.setState({
            toggle:!this.state.toggle
        })
    }
    render() {
        const show ={
            display:"inline-table"
        }
        const hide ={
            display:"none"
        }
        return (
            <div className="container text-center">
                <div className="row text-center align-item-center justify-content-center "><h3>Analysis Page</h3></div>
                <div className="row text-center align-item-center justify-content-center">
                    <div className="col-sm"><button onClick={this.changeToggle} className="btn btn-info">Maximum Booked User</button></div>
                    <div className="col-sm"><button className="btn btn-info">Maximum Amount Spend User</button></div>
                    <div className="col-sm"><button className="btn btn-info">BlockBuster Supplier by Amount</button></div>
                    <div className="col-sm"><button className="btn btn-info">BlockBuster Supplier by Bookings</button></div>
                </div>
                <div className="row text-center align-item-center justify-content-center">
                <table className="table table-hover" style={this.state.toggle?hide:show}>
            <thead>
                <tr className="table-info">
                    <th className="text-bold text-dark">#</th>
                    <th className="text-bold text-dark">First Name</th>
                    <th className="text-bold text-dark">Last Name</th>
                    <th className="text-bold text-dark">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>One</td>
                    <td>One</td>
                    <td>One</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>two</td>
                    <td>two</td>
                    <td>two</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>three</td>
                    <td>three</td>
                    <td>three</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>four</td>
                    <td>four</td>
                    <td>four</td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>five</td>
                    <td>five</td>
                    <td>five</td>
                </tr>
            </tbody>
        </table>
                </div>
                <div className="row text-center align-item-center justify-content-center "><NavLink to="/admin"><button className="btn btn-info">Back</button></NavLink></div>
            </div>
        );
    }
}

export default Query;