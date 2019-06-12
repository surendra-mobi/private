const BookingModel=require("../models/Booking");
const Rental=require("../models/Rental");
const User=require("../models/User");
const mongooseHelper=require("../helpers/mongoose")
const moment=require("moment");
exports.createBooking=function(req, res){
	const {startAt, endAt, totalPrice, days, guests, rental}=req.body;
	const Booking=new BookingModel({startAt, endAt, totalPrice, days, guests});
	const user=res.locals.user;
	Rental.findById(rental._id).populate("bookings").populate("user").exec(function(err, rentalResponse){
		if(err){
              return res.status(422).json({errors:mongooseHelper.normalizeError(err.errors)});
		}
		if(!rentalResponse){
            return res.json({"res":rentalResponse});

		}
		if(rentalResponse.user.id==user.id){
					return res.status(422).json({errors:[{'title':'Invalid User!',"detail":"cannot create booking on your rentals"}]});

		}
        if(isValidBooking(Booking, rentalResponse)){
               rentalResponse.bookings.push(Booking);
               Booking.rental=rentalResponse;
               Booking.user=user;
               Booking.save(function(err){
               	if(err){
               		return res.status(422).json({errors:mongooseHelper.normalizeError(err.errors)});
               	}
               	rentalResponse.save();
               	User.update({_id:user.id},{$push:{bookings:Booking}},function(err){
               		return res.status(422).json({errors:mongooseHelper.normalizeError(err.errors)});
               	});
               });
               return res.json({"created":true});

        }else{
        	return res.status(422).json({errors:[{'title':'Invalid Booking Range!',"detail":"choosen range already taken"}]});

        }

	})
}
function isValidBooking(proposeBooking, rental){
    let isValid=true;
    if(rental.bookings && rental.bookings.length > 0){
    	isValid= rental.bookings.every(function(booking){
    		const proposeStartAt=moment(proposeBooking.startAt);
    		const proposeEndAt=moment(proposeBooking.endAt);
    		const actualStartAt=moment(booking.startAt);
    		const actualEndAt=moment(booking.endAt);
    		if((actualStartAt < proposeStartAt && actualEndAt < proposeEndAt) || (actualStartAt > proposeStartAt && actualEndAt > proposeEndAt)){
    			return true;
    		}else{
    			return false;
    		}

    	})
    }

    return isValid; 	

}