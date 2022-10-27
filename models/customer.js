import mongoose from 'mongoose'

//Defining Schema
const customerSchema = new mongoose.Schema({
    fname: {type:String, required:true},
    lname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    contact:{type:Number, required:true},
    aadharcardno:{type:Number, required:true},
    city:{type:String, required:true},
    pincode:{type:Number, require:true},
    password:{type:String,required:true},
    cpassword:{type:String,required:true}

})

const CustomerModel = mongoose.model('customer',customerSchema)

export default CustomerModel