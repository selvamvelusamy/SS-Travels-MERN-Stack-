import React, {Component} from 'react';
import UserCard1 from '../components/card/UserCard1';
import {NavLink} from 'react-router-dom';
import {findByNo,cancelBooking} from '../components/operations';
import Navigation from '../components/Navigation/Navigation';
class Bookings extends Component {

    state={
        arr:[]
    }

    getDetails=async ()=>{
        let item = {
            email:localStorage.getItem("email")
        }
       const a = await findByNo(item)
       const b = [];
       for( let i=0;i<a.data.resdata[0].length;i++) {
         let obj =Object.assign(a.data.resdata[0][i],a.data.result[i]);
        b.push(obj);
       }
       this.setState({
           arr:b
       });
    }

    componentDidMount() {
        this.getDetails();
    }
   
    cancel=(item) =>{
      let x=window.confirm("Are you sure to CANCEL this Booking!");
      if(x){
       const data={
           no:item.target.id,
           email:localStorage.getItem("email")
       }
      cancelBooking(data)
      .then(data=>{
        this.getDetails();
      })

       
    }
    }
   render() {
       return(
           <div>
             <Navigation email={localStorage.getItem("email")}/>{
                 this.state.arr.length<1?<div className="container text-center centify">
                 <div className="col ">
                     <div className="row">
                         <h5> Hey...! No Bookings are for you</h5>
                     </div>
                 </div>
              </div>:
            this.state.arr.map((item)=>{
                return <UserCard1 
                key={item.no}
                id={item.no}
                from={item.from.toLowerCase()}
                to={item.to.toLowerCase()}
                paid={item.paid}
                date={item.date}
                source={item.source}
                departuretime={item.departuretime}
                destination={item.destination}
                coach={item.coach}
                arrivals={item.arrivals}
                img={item.image}
                accept={this.cancel.bind(this)}
                seats={item.seats}
                />
            })
           } <div className="form-group text-center">
          <NavLink to="/user"><button className="btn btn-outline-success align-items-center ml-1">Home</button></NavLink>
       </div></div>
       );
   }
}
export default Bookings;