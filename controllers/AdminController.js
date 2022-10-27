import roomModel from "../models/Room.js";
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
}

export default AdminController