const express=require("express");
const Booking= require("../models/Booking");
const BookingCtrl=require("../controllers/Booking");
const UserCtrl= require("../controllers/User");

const router=express.Router();
router.post('/createBooking', UserCtrl.authUser,BookingCtrl.createBooking);
module.exports=router;