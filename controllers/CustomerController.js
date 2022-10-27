import CustomerModel from "../models/customer.js";
import roomModel from "../models/Room.js";

class CustomerController{
    static dashboard = (req,res)=>{
        res.render("customer/index");
    }
    static signuppage = (req,res)=>{
        res.render("customer/signup");
    }
    static CreateCustDoc = async (req,res)=>{
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
                password: req.body.password,
                cpassword: req.body.cpassword
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
            if(result.email == email && result.password == password){
                res.redirect("/customer");
            }else{
                console.log("invalid username or password");
            }
            
        }catch(error){
            console.log(error);
        }
    }

    static ViewRoom = async (req,res,next)=>{
        try{
            const result = await roomModel.find()
            res.render("Customer/ViewRoom",{data:result})
        }
        catch(error){
            console.log(error);
        }
    }
}

export default CustomerController