import mongoose from "mongoose";
const RoomBookSchema = new mongoose.Schema({
    arrival_date : {type:Date,required:true},
    departure_date : {type:Date,required:true},
    no_of_room : {type:Number,required:true},
    no_of_adult : {type:Number,required:true},
    total_amount : {type:Number,required:true},
    booking_date  :{type:Date},
    room_type : {type:String,required:true},
    cust_contact :{type:Number,required:true},
    cust_email : {type:String,required:true},
})

const RoomBookModel = mongoose.model('reservation',RoomBookSchema)

export default RoomBookModel