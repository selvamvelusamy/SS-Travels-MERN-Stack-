import React,{Component} from 'react';
import {toast } from 'react-toastify';
import {NavLink} from 'react-router-dom';
import './Model.css';
import {findBus,updateData } from '../operations';
import Navigation from '../Navigation/Navigation';
import TimePicker from 'react-time-picker';
import axios from 'axios';

class Model extends Component {

    state={
        name:'',
        no:0,
        source:'',
        destination:'',
        creator:'',
        places:[],
        prices:[],
        seats:48,
        nextComponent:false,
        price:0,
        departuretime:"00:00",
        arrivaltime:"00:00",
        day:[],
        image:''
    }
    
    componentDidMount(){
        let val=this.props.location.state;
        findBus(val)
        .then(data=>{
            this.setState({
                name:data.data.data.name,
                no:data.data.data.no,
                source:data.data.data.source,
                destination:data.data.data.destination,
                creator:data.data.data.creator,
                places:data.data.data.arrivals,
                prices:data.data.data.prices,
                seats:data.data.data.seats,
                price:data.data.data.price,
                departuretime:data.data.data.departuretime,
                arrivaltime:data.data.data.arrivaltime,
                day:data.data.data.day,
                image:data.data.data.image
            })
        })
    }

    clicked = () =>{
       this.setState({
           creator:localStorage.getItem("email"),
        nextComponent:!this.state.nextComponent
       })
    }

    add = ()=>{
        let val1 = document.getElementById("element").value;
        let val2 = document.getElementById("elementrate").value;
        document.getElementById("element").value = null;
        document.getElementById("elementrate").value = null
        if(val1!=null && val2!=null) {
        let array = this.state.places;
        let array1 = this.state.prices;
        array.unshift(val1);
        array1.unshift(val2);
       this.setState({
           places: array,
           prices: array1
       });
    }
    };

    remove = (event) => {
        let arr = this.state.places;
        let arr1 = this.state.prices;
        var index = arr.indexOf(event.target.id);
        if (index > -1) {
          arr.splice(index, 1);
          arr1.splice(index, 1);
        }
      this.setState({
          places: arr,
          prices: arr1
      });
    }

    myfunc = (event) => {
        this.setState({
            coach: event.target.value
        });
    }

    addition = (event) => {
        let place = prompt("Please enter the Arrival Place");
        let price = prompt("Please enter the Amount");
        let array = this.state.places;
        let array1 = this.state.prices;
        if(place!=null && price!=null) {
        array.splice(parseInt(event.target.id)+1,0,place);
        array1.splice(parseInt(event.target.id)+1,0,price);
        // console.log(array+" "+array1)
       this.setState({
           places: array,
           prices: array1,
       });
    }
    }

    addtodb= ()=> {
        const data = this.state;
        updateData(data)
        .then(data=>{
            if(data.data.status){
                this.props.history.push(`/supplier`);
                toast.success("Package Updated Scuccessfully !", {
                    position: toast.POSITION.TOP_CENTER
                  });
            }
            else{
                toast.error("Cannot Update a Package !", {
                    position: toast.POSITION.TOP_CENTER
                  });
            }
        })
        .catch(err=>{
            throw err;
        })
    }
   gotdata=(data)=>{
       this.setState({
           [data.target.name]:data.target.value
       })
   }
   cancel=()=>{
       this.setState({
           nextComponent:!this.state.nextComponent
       })
       this.props.history.push(`/supplier`);
   }

onTimeChange=(departuretime)=>this.setState({departuretime})
onArrivalTimeChange=(arrivaltime)=>this.setState({arrivaltime})

checkChange=(event)=>{
    const values = Array
    .from(document.querySelectorAll('input[type="checkbox"]'))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
     this.setState({
         day:values
     })
}
fileget=(data)=>{
    const cloudinaryURL ="https://api.cloudinary.com/v1_1/selvamscloudinary/upload";
    const cloudinaryPreset = "ahh31z6s";
    let file=data.target.files[0];
    let formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',cloudinaryPreset);
    axios({
        url: cloudinaryURL,
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:formData
    })
    .then(res=>{
        this.setState({
            image:res.data.secure_url
        })
       console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
}
    render() {
        return (
            <div> <Navigation email={localStorage.getItem("email")}/>
            <div className="m-5 align-content-center align-middle justify-content-center">
             {!this.state.nextComponent?<div id="login">
          <h5 className="text-center mb-3 text-info black pt-5">Edit Package</h5>
          <div className="container">
              <div id="login-row" className="row justify-content-center align-items-center">
                  <div id="login-column" className="col-md-6">
                      <div id="login-box" className="col-md-12">
                          <form id="login-form" className="form" onSubmit={this.clicked}>
                          <div className="form-group">
                                  <label className="text-info">Bus Name</label>
                                  <input type="text" name="name" id="name" className="form-control" onChange={this.gotdata} value={this.state.name} required/>
                              </div>
                             <div className="form-group">
                                  <label className="text-info">Bus No</label>
                                  <input type="number" name="no" id="no" className="form-control" onChange={this.gotdata} value={this.state.no} required/>
                              </div>
                              <div className="form-group">
                                  <label className="text-info">Source</label>
                                  <input type="text" name="source" id="source" className="form-control" onChange={this.gotdata} value={this.state.source} required/>
                              </div>
                              <div className="form-group">
                                  <label  className="text-info">Destination</label>
                                  <input type="text" name="destination" id="destination" onChange={this.gotdata} className="form-control" value={this.state.destination} required/>
                              </div>
                             <div className="form-group">
                                       <label  className="text-info">Available on</label>
                                        <div className="form-check">
                                          <input type="checkbox" className="form-check-input " id="materialUnchecked" name="days" onChange={this.checkChange} value="Sunday"/>
                                          <label className="form-check-label margin-bottom">Sunday</label>
                                        </div>
                                        <div className="form-check">
                                          <input type="checkbox" className="form-check-input " id="materialUnchecked" name="days" onChange={this.checkChange} value="Monday"/>
                                          <label className="form-check-label margin-bottom">Monday</label>
                                        </div>
                                        <div className="form-check">
                                          
                                          <input type="checkbox" className="form-check-input " id="materialUnchecked" name="days" onChange={this.checkChange} value="Tuesday"/>
                                          <label className="form-check-label margin-bottom">Tuesday</label>
                                        </div>
                                        <div className="form-check">
                                          <input type="checkbox" className="form-check-input " id="materialUnchecked" name="days" onChange={this.checkChange} value="Wednesday"/>
                                          <label className="form-check-label margin-bottom">Wednesday</label>
                                        </div>
                                        <div className="form-check">
                                          <input type="checkbox" className="form-check-input " id="materialUnchecked" name="days" onChange={this.checkChange} value="Thursday"/>
                                          <label className="form-check-label margin-bottom">Thursday</label>
                                        </div>
                                        <div className="form-check">
                                          <input type="checkbox" className="form-check-input " id="materialUnchecked" name="days" onChange={this.checkChange} value="Friday"/>
                                          <label className="form-check-label margin-bottom">Friday</label>
                                        </div>
                                        <div className="form-check">
                                          <input type="checkbox" className="form-check-input" id="materialUnchecked" name="days" onChange={this.checkChange} value="Saturday"/>
                                          <label className="form-check-label margin-bottom">Saturday</label>
                                        </div>
                                     </div>
                              <div>
                                  <label  className="text-info">Departure</label>
                                  <div>
                                  <TimePicker 
                                  className="styleTime"
                                  onChange={this.onTimeChange}
                                  value={this.state.departuretime}
                                  /></div>
                              </div>
                              <div>
                                  <label  className="text-info">Arrival</label>
                                  <div>
                                  <TimePicker 
                                  className="styleTime"
                                  onChange={this.onArrivalTimeChange}
                                  value={this.state.arrivaltime}
                                  /></div>
                              </div>
                              <label for="password" class="text-info">Image for Profile:</label>
                          <div class="custom-file">
                         
                              <input type="file" name="name" id="file" class="custom-file-input" onChange={this.fileget.bind(this)}/>
                              <label class="custom-file-label" for="myfile">Choose file</label>
                          </div>
                              <div className="form-group">
                                  <label  className="text-info">Price</label>
                                  <input type="text" name="price" id="price" className="form-control" onChange={this.gotdata} value={this.state.price} required/>
                              </div>
                              <div className="row">
                              <div className="form-group text-center col">
                                  <button className="btn btn-outline-success mt-4 align-items-center" type="submit" >Submit</button>
                              </div>
                              <div className="form-group text-center  col">
                               <NavLink to='/supplier'>   <button className="btn btn-outline-success mt-4 align-items-center"type="button">Cancel</button></NavLink>
                              </div>
                              </div>
                              </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>:<div>
          
          <div className="Pack align-middle"> <ul className=" text-center w-100 list-group">
            <li className="list-group-item list-group-item-white"> 
              <div className="card">
              <div className="card-body list-group-item-success">
                  <h4 className="card-title">{this.state.source}</h4>
                  <h6 className="card-subtitle">Rs 0</h6>
                 <div className="text-right text-secondary">
                 <span className="badge" id="-1" type="button" onClick={this.addition.bind(this)}>Add</span>
                 </div> 
              </div>
          </div>
          </li>
            {console.log("map ...data...", this.state.places)}
            {this.state.places.map((item, index)=>{
              return <li key={index} className="list-group-item list-group-item-white"> 
              <div className="card">
              <div className="card-body list-group-item-success">
                  <h4 className="card-title">{item}</h4>
                  <h6 className="card-subtitle">Rs {this.state.prices[index]}</h6>
                 <div className="text-right text-secondary"><span className="badge" id={item} type="button" onClick={this.remove.bind(this)}>Remove</span>
                 <span className="badge" id={index} type="button" onClick={this.addition.bind(this)}>Add</span>
                 </div> 
              </div>
          </div>
          </li>
            })}
           <li className="list-group-item list-group-item-white"> 
            <div className="card">
            <div className="card-body list-group-item-success">
                <h4 className="card-title">{this.state.destination}</h4>
                <h6 className="card-subtitle">Rs {this.state.price}</h6>
            </div>
        </div>
        </li>
        <li  className="list-group-item" onChange={this.myfunc.bind(this)}>
            <label className="radio-inline">
      <input  type="radio" name="optradio" value="AC Sleeper"/>AC Sleeper
    </label>
    <label className="radio-inline p-2">
      <input type="radio" name="optradio" value="Non AC Sleeper"/>Non AC Sleeper
    </label>
    <label className="radio-inline">
      <input type="radio" name="optradio" value="AC Semi Sleeper"/>AC Semi Sleeper
    </label>
            </li>
            <li  className="list-group-item">
            <button className="btn btn-success" onClick={this.addtodb} type="submit">Submit</button><button className="btn btn-success ml-3" onClick={this.cancel}>Cancel</button>
            </li>
            </ul></div></div>}
            </div></div>
        );
    }
}
export default Model;