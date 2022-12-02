import express from "express";
const router = express.Router(); 
import CustomerController from "../../controllers/CustomerController.js"
router.get('/',CustomerController.dashboard)
router.get('/signup',CustomerController.signuppage)
router.post('/signup',CustomerController.CreateCustDoc)
router.get('/login',CustomerController.loginpage)
router.post('/login',CustomerController.verifyLogin)
router.get('/ViewRoom',CustomerController.ViewRoom)
router.get('/BookRoom/:roomtype',CustomerController.BookRoom)
router.post('/BookRoom/:roomtype',CustomerController.CreateBookRoomDoc)
// router.get('/BookRoom',CustomerController.BookRoom)
export default router;