import React, { Component } from 'react';
import './Card.css';
class EditCard extends Component {

    render(){
        return(
            
            <div className = "container">
                <div className="card border-info m-5">
                    <div className="card-body cardbody row">
                        <div className="cardbody m-3 col">
                            <h4 className="card-title row"><b>{this.props.source} to {this.props.destination}</b></h4>
                            <h6 className="card-text row"><b>Coach: </b>{this.props.coach}</h6>
                            <p className="card-text row"><b>Arrivals: </b>{this.props.arrivals.join(',')} </p>
                        </div>
                        <div className="align-content-center mt-5 col">
                        <div className="row"><b>Available Seats: </b>{this.props.seats}</div>
                        <div className="row mt-4"><button className="col btn btn-info mr-3" data-target="Edit" id={this.props.id} onClick={this.props.edit.bind(this)}>Edit</button></div>
                        </div>
                        <div className="col card-img col"><img src={this.props.img} alt="cardImage"/></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditCard;