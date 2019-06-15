const express=require("express");
const Booking= require("../models/Booking");
const BookingCtrl=require("../controllers/booking");
const UserCtrl= require("../controllers/user");

const router=express.Router();
router.post('/createBooking', UserCtrl.authUser,BookingCtrl.createBooking);
module.exports=router;
