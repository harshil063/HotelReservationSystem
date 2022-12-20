import express from 'express'
import connectDB from './db/connectdb.js';
import {join} from 'path';
import custweb from "./routes/Customer/web.js";
import adminweb from "./routes/Admin/web.js";
import roomModel from './models/Room.js';
import multer from 'multer';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import CustomerModel from './models/customer.js';
import RoomBookModel from './models/RoomBook.js';

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

// app.use(function(req, res, next) {
//     res.locals.userid = req.session.userid;
//     next();
//   });
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


var cmnemail = []

// CustomerModel.find({email:'hk@gmail.com'})
//         .then(data=>{
//             console.log("customer email");
//             console.log(data);

//             data.map((d,k)=>{
//                 cmnemail.push(d.email);
//             })

//             RoomBookModel.find({cust_email:{$in: cmnemail}})
//             .then(data=>{
//                 console.log("room book with hk@gmail.com");
//                 console.log(data);
//             }).catch(error=>{
//                 console.log(error);
//             })
//         })


// RoomBookModel.find({email:'hk@gmail.com'})
//         .then(data=>{
//             console.log("room book email");
//             console.log(data);

//             data.map((d,k)=>{
//                 cmnemail.push(d.cust_email);
//             })
//             console.log(cmnemail);
//             let i=0;
//             cmnemail.forEach((dt)=>{
//                 CustomerModel.find({email:{$in: cmnemail[i]}})
                

//             .then(data=>{
//                 console.log("customer details of hk@gmail.com");
//                 console.log(data);
                
//             }).catch(error=>{
//                 console.log(error);
//             })
//             i++;
//             });
            
//         })




// const test = roomModel.aggregate([{
//     $lookup:    
//         {
//             from : 'roomtypes',
//             localField : 'room_type',
//             foreignField: '_id',
//             as : 'hotel'
//         }
// }])
// console.log(test.room_type);

// db.rooms.aggregate([{
//     $lookup:    
//         {
//             from : 'roomtypes',
//             localField : 'room_type',
//             foreignField: 'room_type',
//             as : 'hotel'
//         }
// }])