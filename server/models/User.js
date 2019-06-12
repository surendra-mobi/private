const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=mongoose.Schema({
	username:{
		type:String,
		required:true,
		min:[4, "Too short,min 4 charecTOOr"],
		max:[32, "Too long, max 32 charecTOOr"],
        trim:true
	},
	email:{
		type:String,
		required:true,
		min:[4, "Too short,min 4 charecTOOr"],
		max:[32, "Too long, max 32 charecTOOr"],
		unique: true,
		index:true,
		lowercase: true,
		validate: {
		validator: function(v) {
		return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
		},
		message: props => `${props.value} is not a valid email number!`
		}
		
	},
	password:{
		type:String,
		required:true,
		min:[4, "Too short,min 4 charecTOOr"],
		max:[32, "Too long, max 32 charecTOOr"],
	},
	rentals:[
		{type:mongoose.Schema.Types.ObjectId,ref:'Rental'}
		],
    bookings:[
		{type:mongoose.Schema.Types.ObjectId,ref:'Booking'}
		]

		
});
userSchema.methods.isPasswordMatch=function(password){
	return bcrypt.compareSync(password, this.password);
}
userSchema.pre('save', function(next) {
  var user=this;
  bcrypt.hash(user.password, 8, function(err, hash) {
  	user.password=hash;
    next();
});
  
  
});
module.exports=new mongoose.model("User", userSchema);