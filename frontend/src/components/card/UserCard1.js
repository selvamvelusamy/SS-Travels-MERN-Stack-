import React, { Component } from 'react';
import './Card.css';
class UserCard1 extends Component {
state = {
    time:'',
    from:'',
    to:''
}
getTime=()=>{
    let time = this.props.departuretime;
    let finaltime = Number(time.substring(0,2))+Number(this.props.arrivals.indexOf(this.props.from));
    if(finaltime>24){finaltime-=24}
    this.setState({
        from:this.props.from.charAt(0).toUpperCase()+this.props.from.slice(1),
        to:this.props.to.charAt(0).toUpperCase()+this.props.to.slice(1),
        time:finaltime+time.substring(2,5)
    })
} 
    
componentDidMount() {
    this.getTime();
}
    render(){
        return(
            <div className = "container">
                <div className="card border-info m-5">
                    <div className="card-body cardbody row">
                        <div className="cardbody m-3 col">
                            <h4 className="card-title row"><b>{this.state.from} to {this.state.to}</b></h4>
                            <h6 className="card-text row"><b>Coach: </b>{this.props.coach}</h6>
                            <p className="card-text row"><b>Arrival Points: </b>{this.props.arrivals.join(', ')} </p>
                        </div>
                        <div className="align-content-center mt-5 col">
                        <div className="row"><b>Paid: </b>Rs.{this.props.paid}</div>
                        <div className="row"><b>Date:  </b>{this.props.date.substring(0,10)}</div>
                        <div className="row"><b>Arrivals On:  </b>{this.state.time}</div>
                        <div className="row mt-4"><button className="col btn btn-info mr-3" id={this.props.id} onClick={this.props.accept.bind(this)}>Cancel</button></div>
                        </div>
                        <div className="col card-img col"><img src={this.props.img} alt="cardImage"/></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCard1;