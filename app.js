import express from 'express'
import connectDB from './db/connectdb.js';
import {join} from 'path';
import custweb from "./routes/Customer/web.js";
import adminweb from "./routes/Admin/web.js";
import multer from 'multer';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express()
const port = process.env.PORT || '3000'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

connectDB(DATABASE_URL)

const sessionStorage = MongoStore.create({
    mongoUrl:DATABASE_URL,
    dbName:'hoteldb',
    collectionName:'sessions',
    ttl: 14*24*60*60,
    autoRemove:'native'
})

app.use(session({
    name:'loginsession',
    secret:'iamkey',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:31536000000},
    store:sessionStorage
}))

// static files
app.use(express.static(join(process.cwd(),"public")))

//set template engine
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use('/Admin/editroomtype',express.static(join(process.cwd(),"public")))
// app.use("/Customer/BookRoom/:id",express.static(join(process.cwd(),"public")))
//load routes
app.use("/Customer",custweb)
app.use("/Admin",adminweb)
// app.use(express.static("/uploads/"))
app.use("/uploads/",express.static(join(process.cwd(),"uploads")))


app.listen(port,()=>{
    console.log(`Server listening at port : ${port}`);
})

app.use(cookieParser());
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