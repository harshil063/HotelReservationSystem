import express from 'express'
import connectDB from './db/connectdb.js';
import {join} from 'path';
import custweb from "./routes/Customer/web.js";
import adminweb from "./routes/Admin/web.js";
import multer from 'multer';
import roomModel from './models/Room.js';

const app = express()
const port = process.env.PORT || '3000'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

connectDB(DATABASE_URL)



// static files
app.use(express.static(join(process.cwd(),"public")))

//set template engine
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use('/Admin/editroomtype/',express.static(join(process.cwd(),"public")))
//load routes
app.use("/Customer",custweb)
app.use("/Admin",adminweb)
// app.use(express.static("/uploads/"))
// app.use('',express.static(join(process.cwd(),"uploads")))


app.listen(port,()=>{
    console.log(`Server listening at port : ${port}`);
})


// roomModel.aggregate([{
//     $lookup:    
//         {
//             from : 'roomtypes',
//             localField : 'room_type',
//             foreignField: '_id',
//             as : 'hotel'
//         }
// }])

// db.rooms.aggregate([{
//     $lookup:    
//         {
//             from : 'roomtypes',
//             localField : 'room_type',
//             foreignField: 'room_type',
//             as : 'hotel'
//         }
// }])