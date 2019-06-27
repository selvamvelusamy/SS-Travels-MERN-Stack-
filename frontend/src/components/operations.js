const axios = require('axios');

export const register = newUser => {
    return axios.post('/users/register', {
            fname: newUser.fname,
            lname: newUser.lname,
            uname: newUser.uname,
            email: newUser.email,
            password: newUser.password,
            image:newUser.image
        })
        .then(res => {
            console.log('Registered!')
        })
}

export const Loginto = data => {
    return axios.post('/users/login',{
        email:data.email,
        password:data.password
    })
}

export const addData = data =>{
    return axios.post('/users/create',{
        name:data.name,
        no:data.no,
        source:data.source,
        destination:data.destination,
        creator:data.creator,
        coach:data.coach,
        arrivals:data.places,
        prices:data.prices,
        price:data.price,
        departuretime:data.departuretime,
        arrivaltime:data.arrivaltime,
        day:data.day,
        seats:data.seats,
        image:data.image
    })
}

export const getByUser = data => {
    return axios.post('/users/findbycreator',{
        creator:data.email
    })
}

export const getByUserWithHeld = data => {
    return axios.post('/users/findbycreatorWithHeld',{
        creator:data.email
    })
}

export const temporary =()=> {
    return axios.post('/users/allTemporary',{
        
    })
}

export const findByNo =(data)=> {
    return axios.post('/users/findbyno',{
        email:data.email
    })
}

export const Accept =(data)=> {
    return axios.post('/users/Accept',{
        no: data.no,
        message:data.message
    })
}

export const Reject =(data)=> {
    return axios.post('/users/Reject',{
        no: data.no,
        message:data.message
    })
}
export const Booking =(data)=>{
    return axios.post('/users/Book',{
        from:data.from,
        to:data.to,
        day:data.day
    })
}
export const addToBooking=(data)=>{
    return axios.post('/users/addBooking',{
        no:data.no,
        email:data.email,
        day:data.day,
        from:data.from,
        to:data.to,
        date:data.date
    })
}
export const checkUser=(data)=>{
    return axios.post('/users/checkuser',{
        email:data.email
    })
}

export const cancelBooking=(data)=>{
    return axios.post('/users/cancelbooking',{
        no:data.no,
        email:data.email
    })
}

export const findBus=(data)=>{
    return axios.post('/users/findBus',{
        no:data.no
    })
}

export const updateData=(data)=>{
    return axios.post('/users/update',{
        name:data.name,
        no:data.no,
        source:data.source,
        destination:data.destination,
        creator:data.creator,
        coach:data.coach,
        arrivals:data.places,
        prices:data.prices,
        price:data.price,
        departuretime:data.departuretime,
        arrivaltime:data.arrivaltime,
        day:data.day,
        seats:data.seats,
        image:data.image
    })
}

export const getMessage=(data)=>{
    return axios.post('/users/getMessage',{
        email:data.email
    })
}
export const getImage =(data)=>{
    return axios.post('/users/getImage',{
        email:data.email
    })
}

export const getUserData = (data)=>{
    return axios.post('/users/getUserData',{
        email:data.email
    })
}
export const updateUser =(data)=>{
    return axios.post('/users/updateUser',{
            email:data.email,
            fname:data.fname,
            lname:data.lname,
            uname:data.uname,
            image:data.image
    })
}

export const CheckPassword = (data)=>{
    return axios.post('/users/checkPassword',{
        email:data.email,
        password:data.password
    })
}
export const UpdatePassword = (data)=>{
    return axios.post('/users/updatePassword',{
        email:data.email,
        password:data.password
    })
}