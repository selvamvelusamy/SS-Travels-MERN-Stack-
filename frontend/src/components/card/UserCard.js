import React, { Component } from 'react';
import './Card.css';
class UserCard extends Component {
    state={
        amount:0
    }
    amount = ()=>{
        let amount1 = 0;
        let amount2 = 0;
        let arr =this.props.arrivals.map(e=>e.toLowerCase());
        let prices =this.props.prices;
        let from = localStorage.getItem("from").toLowerCase();
        let to = localStorage.getItem("to").toLowerCase();
        prices.push(0);
        prices.unshift(this.props.price);
        amount1 = prices[arr.indexOf(from)];
        amount2 = prices[arr.indexOf(to)];
        this.setState({
            amount:amount1-amount2
        })
    }
    componentDidMount() {
        this.amount();
    }

    render(){
        return(
            <div className = "container">
                <div className="card border-info m-5">
                    <div className="card-body cardbody row">
                        <div className="cardbody m-3 col">
                            <h4 className="card-title row"><b>{this.props.source} to {this.props.destination}</b></h4>
                            <h6 className="card-text row"><b>Coach: </b>{this.props.coach}</h6>
                            <p className="card-text row"><b>Arrivals: </b>{this.props.arrivals.join(', ')} </p>
                        </div>
                        <div className="align-content-center mt-5 col">
                        <div className="row"><b>Available Seats: </b>{this.props.seats}</div>
                        <div className="row"><b>Amount: </b>{this.state.amount}</div>
                        <div className="row mt-4"><button className="col btn btn-info mr-3" id={this.props.id} onClick={this.props.accept.bind(this)}>Book</button></div>
                        </div>
                        <div className="col card-img col"><img src={this.props.img} alt="cardImage"/></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCard;