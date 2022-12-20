import CustomerModel from "../models/customer.js";
import roomModel from "../models/Room.js";
import RoomBookModel from "../models/RoomBook.js";
import roomtypeModel from "../models/roomtype.js";
import bcrypt from 'bcrypt';
class CustomerController{

    static dashboard = (req,res)=>{
        res.render("customer/index");
    }
    static signuppage = (req,res)=>{
        res.render("customer/signup");
    }
    static CreateCustDoc = async (req,res)=>{
        const hashPassword = await bcrypt.hash(req.body.password,10);
        const hashCpassword = await bcrypt.hash(req.body.cpassword,10);
        try{
            
             //create a new document using model
             const doc = new CustomerModel({
                fname:req.body.fname,
                lname:req.body.lname,
                email: req.body.email,
                contact: req.body.contact,
                aadharcardno: req.body.aadharcardno,
                city: req.body.city,
                pincode: req.body.pincode,
                password: hashPassword,
                cpassword: hashCpassword
             })
            var password = req.body.password
            var cpassword = req.body.cpassword

            if(password == cpassword){
                await doc.save()
                res.redirect('/customer/login')
            }
            else{
                passerr = "Password are not same..!!"
                res.render("/Customer/Signup",{passerr:passerr})
            }
            //saving document
            
        }catch(error){
            console.log(error);
        }
    }
    
    static loginpage = (req,res)=>{
        res.render("customer/login");
    }
    static verifyLogin = async(req,res)=>{
        try{    
            
            const {email,password} = req.body
            const result = await CustomerModel.findOne({email:email})
            if(result != null){
                const isMatch = await bcrypt.compare(password,result.password);
                if(result.email == email && isMatch){
                    console.log(result.email);
                    // console.log(req.session);
                    req.session.userid = result.email;
                    // var session=req.session;

                    console.log(req.session);
                    console.log("welcome click to logout");
                    res.redirect("/customer");
                }else{
                    console.log("invalid username or password");
                }
            }
            else{
                console.log("You are not registered user!!");
            }
        }catch(error){
            console.log(error);
        }
    }

    static logout = async(req,res)=>{
        try{
            req.session.destroy();
            res.render("Customer/login");
        }catch(error){
            console.log(error);
        }
    }

    static ViewRoom = async (req,res,next)=>{
        try{
            if(typeof req.session.userid == "undefined")
            {
                res.redirect("/Customer/login")
            }
            const result = await roomtypeModel.find()
            res.render("Customer/ViewRoom",{data:result})
            
        }
        catch(error){
            console.log(error);
        }
    }

    static BookRoom = async(req,res,next)=>{
        try{
            if(typeof req.session.userid == "undefined"){
                res.redirect("/Customer/login")
            }
            const roomtype = req.params.roomtype;
            const result = await roomtypeModel.findOne({room_type:roomtype});

            const custresult = await CustomerModel.findOne({email:req.session.userid});
            const roomresult = await roomModel.findOne({room_type:roomtype})
            
            res.render("Customer/BookRoom",{data:result,custdata:custresult,roomdata:roomresult})
        }
        catch(error){
            console.log(error);
        }
    }
    static CreateBookRoomDoc = async(req,res,next)=>{
        try{
            if(typeof req.session.userid == "undefined"){
                res.redirect("/Customer/login")
            }
            const rm = await roomModel.findOne({room_type:req.params.roomtype})
            console.log(rm._id);
                const doc = new RoomBookModel({
                    arrival_date: req.body.arrival_date,
                    departure_date: req.body.departure_date,
                    no_of_room: req.body.no_of_room,
                    no_of_adult: req.body.no_of_adult,
                    total_amount: req.body.total_amount,
                    booking_date: req.body.booking_date,
                    room_type: req.body.room_type,
                    cust_contact: req.body.cust_contact,
                    cust_email: req.body.cust_email,
                    
                })

                const updqty = await roomModel.findOneAndUpdate({_id:rm._id},{$set:{no_of_room:rm.no_of_room-req.body.no_of_room}})
                console.log(updqty);
                var resid;
                await doc.save(function(err,room){
                    resid = room._id;
                    console.log("inside"+room);
                    res.redirect(`/Customer/receipt/${resid}`);
                    });
        }catch(error){
            console.log(error);
        }
    }

    static receipt = async(req,res)=>{
        try{
            if(typeof req.session.userid == "undefined"){
                res.redirect("/Customer/login")
            }
            console.log(req.params.bookroomid);
            const roombookresult = await RoomBookModel.findById(req.params.bookroomid);
            console.log(roombookresult);
            const custresult = await CustomerModel.findOne({email:roombookresult.cust_email});
            console.log(custresult);
            res.render("Customer/receipt",{roombookdata:roombookresult,custdata:custresult})
        }catch(err){
            console.log(err);
        }
    }

    static cust_reservation = async(req,res)=>{
        try{
            if(typeof req.session.userid == "undefined"){
                res.redirect("/Customer/login")
            }
            const roombookresult = await RoomBookModel.find({cust_email:req.session.userid});
            console.log(roombookresult);
            res.render("Customer/reservation",{roombookdata:roombookresult});
        }catch(error){
            console.log(error);
        }
    }
}

export default CustomerController