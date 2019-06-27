import React, { Component } from 'react';

import './Admincard.css';
class AdminCard extends Component {

    render(){
        return(
            <div className="container border border-info mt-5 p-4">
            <div className="row p-3">
                <div className="col">
                    <h4 className="text-center mb-3"><b>{this.props.name}</b></h4>
                    <div className="row">
                        <div className="col">
                        <h5 className="col title-width">No:</h5>
                        </div>
                         <div className="col">
                         <h5 className="col">{this.props.no}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <h5 className="col title-width">Source:</h5>
                        </div>
                         <div className="col content-height">
                         <h5 className="col">{this.props.source}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <h5 className="col title-width">Destination:</h5>
                        </div>
                         <div className="col content-height">
                         <h5 className="col">{this.props.destination}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <h6 className="col title-width">Creator:</h6>
                        </div>
                         <div className="col content-height">
                         <h6 className="col">{this.props.creator}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <h6 className="col title-width">Departure Time:</h6>
                        </div>
                         <div className="col content-height">
                         <h6 className="col">{this.props.departuretime}</h6>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <h6 className="col title-width">Arrival Time:</h6>
                    </div>
                     <div className="col content-height">
                     <h6 className="col">{this.props.arrivaltime}</h6>
                    </div>
                </div>
                    <div className="row">
                        <div className="col">
                        <h6 className="col title-width">Seats:</h6>
                        </div>
                         <div className="col content-height">
                         <h6 className="col">{this.props.seats}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <h6 className="col title-width">Price:</h6>
                        </div>
                         <div className="col content-height">
                         <h6 className="col">{this.props.price}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <h6 className="col title-width">Arrivals:</h6>
                        </div>
                         <div className="col content-height">
                         <h6 className="col">{this.props.arrivals.join(', ')}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <h6 className="col title-width">Prices:</h6>
                        </div>
                         <div className="col content-height">
                         <h6 className="col">{this.props.prices.join(', ')}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <h6 className="col title-width">Days:</h6>
                        </div>
                         <div className="col content-height">
                         <h6 className="col">{this.props.day.join(', ')}</h6>
                        </div>
                    </div>
                </div>
                <div className="col text-center">
                    <img src= {this.props.img} alt="for Pack"/>
                </div>
            </div>
            <div className="row">
                <div className="col text-right"><button id={this.props.id} onClick={this.props.accept.bind(this)} className="btn btn-info">Accept</button></div>
                <div className="col"><button id={this.props.id} onClick={this.props.reject.bind(this)} className="btn btn-info">Reject</button></div>
            </div>
        </div>
        );
    }
}

export default AdminCard;