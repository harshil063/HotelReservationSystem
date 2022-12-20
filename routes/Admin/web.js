import express from "express";
const router = express.Router(); 
import multer from 'multer';
import AdminController from "../../controllers/AdminController.js"
router.get('/',AdminController.dashboard)

//for upload files
var storage =   multer.diskStorage({  
    destination: function (req, file, cb) {  
      cb(null, 'uploads/')
    },  
    filename: function (req, file,cb) {  
      cb(null, file.originalname);
    }  
  }); 

var upload = multer({ storage : storage});



router.get('/AddRoomtype',AdminController.AddRoomtype)
router.post('/AddRoomtype',upload.single('room_photo'),AdminController.CreateRoomtypeDoc)
router.get('/ViewRoomtype',AdminController.ViewRoomtype)
router.get('/editroomtype/:id',AdminController.EditRoomtype)
router.post('/UpdateRoomtype/:id',AdminController.UpdateRoomtype)
router.post('/DeleteRoomtype/:id',AdminController.DeleteRoomtype)

router.get('/AddRoom',AdminController.AddRoom)
router.post('/AddRoom',AdminController.CreateRoomDoc)
router.get('/ViewRoom',AdminController.ViewRoom)

router.get('/viewreservation',AdminController.ViewReservation)
router.get('/ViewGuest',AdminController.ViewCustomer)


export default router;