import session from "express-session";
import mongoose from "mongoose";
import CustomerModel from "../models/customer.js";
import roomModel from "../models/Room.js";
import RoomBookModel from "../models/RoomBook.js";
import roomtypeModel from "../models/roomtype.js";

class AdminController{
    static dashboard = (req,res)=>{
        res.render("Admin/index");
    }

    static AddRoomtype = (req,res)=>{
        res.render("Admin/AddRoomtype");
    }

    static AddRoom =  async(req,res)=>{
        try{
            const roomtyperesult = await roomtypeModel.find()
            res.render("Admin/AddRoom",{data:roomtyperesult})
        }catch(error){
            console.log(error);
        }
    }

    static CreateRoomDoc = async (req,res,next)=>{
        try{
            const doc = new roomModel({
                no_of_room : req.body.no_of_room,
                room_type : req.body.room_type
            })
            await doc.save()
            res.redirect('/Admin/AddRoom')
        }
        catch(error){
            console.log(error);
        }
    }

    static ViewRoom = async (req,res,next)=>{
        try{
            const result = await roomModel.find()
            res.render("Admin/ViewRoom",{data:result})
        }
        catch(error){
            console.log(error);
        }
    }
    static CreateRoomtypeDoc = async (req,res,next)=>{
        try{
            const doc = new roomtypeModel({
                room_type: req.body.room_type,
                room_photo: req.file.filename,
                room_price: req.body.room_price,
                room_desc: req.body.room_desc
            })
            await doc.save()
            res.redirect('/Admin/AddRoomtype')
        }catch(error){
            console.log(error);
        }
    }

    static ViewRoomtype = async (req,res)=>{
        try{
            const result = await roomtypeModel.find()
            res.render("Admin/ViewRoomtype",{data:result})
        }catch(error){
            console.log(error);
        }
    }

    // static roomptypeatviewroom = async (req,res)=>{
    //     try{
    //         const result = await roomtypeModel.find()
    //         res.render("Admin/AddRoom",{data:result})
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    static EditRoomtype = async (req,res)=>{
        console.log(req.params.id);
        try{
            const result = await roomtypeModel.findById(req.params.id)
            console.log(result);
            res.render("Admin/EditRoomtype",{data:result})
        }catch(error){
            console.log(error);
        }
    }
    
    static UpdateRoomtype =async (req,res)=>{
        try{
            console.log(req.params.id);
            console.log(req.body);
            const result = await roomtypeModel.findByIdAndUpdate(req.params.id,req.body)
            res.redirect("/Admin/ViewRoomtype")
        }catch(error){
            console.log(error);
        }
    }

    static DeleteRoomtype = async (req,res)=>{
        try{
            const result = await roomtypeModel.findByIdAndDelete(req.params.id)
            res.redirect("/Admin/ViewRoomtype")
        }
        catch(error){
            console.log(error);
        }
    }


    static ViewReservation = async (req,res)=>{
        
        try{
            const result = await RoomBookModel.find()
            console.log(result);
            
            res.render("Admin/ViewRoomBook",{data:result})
        }catch(error){
            console.log(error);
        }
    }










    // static ViewReservation = async (req,res)=>{
    //     const result = await RoomBookModel.find()
    //     // console.log(result);
    //     let i=0;
    //     var cemail;
    //     result.forEach((it) =>{
    //         cemail = result[i].cust_email;
    //         console.log(cemail);

    //         let customer =  CustomerModel.find({
    //             email: {
    //                 "$in": cemail
    //             }
    //         });
    //         console.log(customer);
    //         i++;
    //     });
        
    //     // console.log(customer);
    //     res.end("hello");
    //     // res.render("Admin/ViewRoomBook")
    // //     try{
    // //         const result = await RoomBookModel.find()
    // //         console.log(result);
    // //         // const custresult = await CustomerModel.find({'email':'mg@gmail.com'})
    // //         // console.log(custresult);
    // //         let i=0;
    // //         var cemail;
    // //         result.forEach((it) =>{
    // //             cemail = result[i].cust_email;
    // //             console.log(cemail);
    // //             i++;
    // //         });
    // //         let customer = await customer.find({
    // //             email: {
    // //                 "$in": RoomBookModel.cust_email
    // //             }
    // //         });
    // //         // var custresult = CustomerModel.findOne({'email':cemail})
    // //         // console.log(custresult._conditions.email);

            
    // // // const ceres =  RoomBookModel.aggregate([{
    // // //     $lookup:    
    // // //     {
    // // //         from : 'customers',
    // // //         localField : 'email',
    // // //         foreignField: 'cust_email',
    // // //         as : 'cname'
    // // //     }
    // // // }])

    // // // console.log(ceres);
    // //         // console.log(result.cust_email);
    // //         res.render("Admin/ViewRoomBook",{data:result})
    // //     }catch(error){
    // //         console.log(error);
    // //     }
    // }



    
    static test = async (req,res)=>{
        var cmnemail = []
        RoomBookModel.find()
        .then(data=>{
            console.log("room book email");
            console.log(data);

            data.map((d,k)=>{
                cmnemail.push(d.cust_email);
            })
            console.log(cmnemail);
            let i=0;
            cmnemail.forEach((dt)=>{
                CustomerModel.find({email:{$in: cmnemail[0]}})
                

            .then(data=>{
                console.log("customer details of ");
                console.log(data);
                res.end("test");
            }).catch(error=>{
                console.log(error);
            })
            i++;
            });
            
        })
    }



}

export default AdminController