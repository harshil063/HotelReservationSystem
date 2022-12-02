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
        req.session.userid = "test";
        try{    
            const {email,password} = req.body
            const result = await CustomerModel.findOne({email:email})
            if(result != null){
                const isMatch = await bcrypt.compare(password,result.password);
                if(result.email == email && isMatch){
                    console.log(result.email);
                    // console.log(req.session);
                    hellooo
                    // console.log(req.session.userid);
                    // var session=req.session;
                    

                    // console.log(req.session);
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

    static ViewRoom = async (req,res,next)=>{
        try{
            const result = await roomtypeModel.find()
            
            console.log(result.room_type);
            res.render("Customer/ViewRoom",{data:result})
        }
        catch(error){
            console.log(error);
        }
    }

    static BookRoom = async(req,res,next)=>{
        try{
            const roomtype = req.params.roomtype;
            const result = await roomtypeModel.findOne({room_type:roomtype});
            console.log(result);
            res.render("Customer/BookRoom",{data:result})
            // res.render("Customer/BookRoom",{data:result})
        }
        catch(error){
            console.log(error);
        }
    }
    static CreateBookRoomDoc = async(req,res,next)=>{
        try{
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
            await doc.save()
            res.redirect('/Customer/viewRoom')
        }catch(error){
            console.log(error);
        }
    }
}

export default CustomerController