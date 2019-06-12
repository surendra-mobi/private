const mongoose=require('mongoose');
const schema=mongoose.Schema({
title:{type:String, required:true, max:['128', "Too long max is 128 charector"]},
city:{type:String, required:true, lowercase:true},
street:{type:String, required:true, min:['5', "min 5 charector"]},
category:{type:String, required:true, lowercase:true},
image: String,
bedrooms:Number,
shared:Boolean,
description:{type:String, required:true},
dailyRate:Number,
createdAt:{type:Date, default:Date.now},
user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
bookings:[
		{type:mongoose.Schema.Types.ObjectId,ref:'Booking'}
		]
});
module.exports= mongoose.model('Rental',schema);