const express=require("express");
const Rental= require("../models/Rental");
const userCtrl= require("../controllers/user");

const router=express.Router();
router.get('/secrate',userCtrl.authUser,function(req, res){
res.json({user:res.locals.user});
});
router.get('',(req,res)=>{
	Rental.find({}).select("-bookings").exec(function(err,foundRental){
		res.json(foundRental);
	});
});
router.get('/:id',(req,res)=>{
    rentalID=req.params.id;
	Rental.findById(rentalID).populate("bookings", "startAt endAt -_id").populate("user", "username -_id").exec(function(err, foundRental){
    
        if(err){
        	res.status(422).json({errors:[{'title':'Rental Err',"messgae":"could not find Rental"}]});
        }
		res.json(foundRental);
	})
});
module.exports=router;
