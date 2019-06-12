const mongoose=require("mongoose");
const bookingSchema=mongoose.Schema({
	startAt:{type:Date, rquired:"Starting date is required"},
    endAt:{type:Date, rquired:"End date is required"},
    totalPrice:Number,
    days:Number,
    guests:Number,
    createdAt:{type:Date, default:Date.now},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"Rental"},
    rental:{type:mongoose.Schema.Types.ObjectId, ref:"Rental"}
});

module.exports=mongoose.model("Booking", bookingSchema);