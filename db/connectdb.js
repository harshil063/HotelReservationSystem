import mongoose from "mongoose";
const connectDB = async (DATABASE_URL)=>{
    try{
        const DB_OPTIONS = {
            dbName:"hoteldb",
        };
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("connected successfully");
    }catch(err){
        console.log(err);
    }
}

// connectDB.getCollection('roomtypes').aggregate([{
//     $lookup:
//     {
//         from:"rooms",
//         localField:"_id",
//         foreignField:"_id",
//         as:"room_type"
//     }
// }])

export default connectDB;