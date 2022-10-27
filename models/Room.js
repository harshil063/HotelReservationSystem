import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
    no_of_room: {type:Number,required:true},
    room_type: {type:String,required:true}
})

const roomModel = mongoose.model('room',roomSchema)





export default roomModel