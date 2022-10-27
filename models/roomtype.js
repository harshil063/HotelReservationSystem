import mongoose from 'mongoose'

const roomtypeSchema = new mongoose.Schema({
    room_type: {type:String,required:true},
    room_price: {type:Number,required:true},
    room_photo: {type:String,required:true},
    room_desc: {type:String,required:true}
})

const roomtypeModel = mongoose.model('roomtype',roomtypeSchema)

export default roomtypeModel