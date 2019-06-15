const express= require("express");
var PORT=process.env.port|| 3001;
const bodyParser=require("body-parser");
const Rental= require("./models/Rental");
const FakeDB= require("./models/fake_db");

const rentalRouter= require("./router/rental"), userRouter= require("./router/users"), bookingRouter= require("./router/booking");

const confdev=require("./config/dev_db");
const mongoose=require("mongoose");
mongoose.connect(confdev.DB_URI).then(()=>{
	    //const FakeDBob=new FakeDB();
       // FakeDBob.pushDB();
});
const app=express();
app.use(bodyParser.json());
app.use('/api/v1/rentals',rentalRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/bookings',bookingRouter);


if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT , function() {
  console.log('App is running!');
});
