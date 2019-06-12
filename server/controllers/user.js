const User=require("../models/User")
const Rental=require("../models/Rental")
const mongooseHelper=require("../helpers/mongoose")
const jwt=require("jsonwebtoken");
exports.auth=function(req, res){
    const {email, password}=req.body;
	if(!email || !password){
		return res.status(422).json({errors:[{'title':'Data Missing!',"detail":"provide email and password"}]});
	}
    console.log(email);
    User.findOne({email}, function(err, user){
    	if(err){
    		return res.status(422).json({errors:mongooseHelper.normalizeError(err.errors)});
    	}
    	if(!user){
    		return res.status(422).json({errors:[{'title':'Invalid User!',"detail":"user does not exist"}]});
    	}
    	if(user.isPasswordMatch(password)){
			const token= jwt.sign({
			userId: user.id,
			username:user.username
			}, 'secret', { expiresIn: '1h'});
			res.json(token);
    	}else{
			return res.status(422).json({errors:[{'title':'Wrong Data!',"detail":"Wrong username or password"}]});

    	}
    })
	
}

exports.register=function(req, res){
const {username, email, password, passwordconfirmation}=req.body;
	if(!username || !password){
		return res.status(422).json({errors:[{'title':'Data Missing',"detail":"provide email and password"}]});
	}
	if(password !=passwordconfirmation){
		return res.status(422).json({errors:[{'title':'Invalid password',"detail":"password is not as same as passwordconfirmation"}]});
	}
	User.findOne({email},function(err, existingUser){
		if(err){
		   return res.status(422).json({errors:mongooseHelper.normalizeError(err.errors)});
     	}
        if(existingUser){
        return	res.status(422).json({errors:[{'title':'user existingUser',"detail":"user with given email is already exists"}]});
        }
        var user=new User({
        	username,
        	email,
        	password
        });
        user.save(function(err){
        	if(err){ 
        		return res.status(422).json({errors:mongooseHelper.normalizeError(err.errors)});
        	}
        	return res.json({massage:"user created successfully"});
        })
	})
}
exports.authUser=function(req, res, next){
	const token=req.headers.token;	
   if(token){
       const user=parseToken(token);
       User.findById(user.userId, function(err, user){
          if(err){
          	return res.status(422).json({errors:mongooseHelper.normalizeError(err.errors)});
          }
          if(user){
              res.locals.user=user;
              next();
          }else{
             return	res.status(422).json({errors:[{'title':'Not authroised',"detail":"You need to login again to access"}]});
          }

       });
   }else{
   	   return	res.status(422).json({errors:[{'title':'Not authroised',"detail":"You need to login to access"}]});
   }
}
function parseToken(token){
	var user=jwt.verify(token.split(' ')[1], 'secret');
	return user;
}