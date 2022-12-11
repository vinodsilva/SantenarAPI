const app = require("express")();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var database = require("./config/database");
var authRoutes = require("./routes/authRoutes");
var activityRoutes = require("./routes/activityRoutes");
var deviceRoutes=require('./routes/deviceRoutes');
var alertRoutes=require('./routes/alertRoutes');
const { json } = require("body-parser");
const { GmailTransport } = require("./config/mail");
const sendSms = require("./config/sms");



const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
const store= new MongoDBStore({uri:String(database.dbConnection),collection:'sessions'});
app.use(session({secret:'Vinod_silva_AS2019957',resave:false,saveUninitialized:false,store:store}));

var jsonParser = bodyParser.json();

const authMiddlware=(req,res,next)=>{
  if(req.session.token){
    next();
  }else
   res.json({
    success:false,
    message:"Unauthorized"
  })
}
app.use(jsonParser,authRoutes);
app.use(jsonParser,authMiddlware,deviceRoutes);
app.use(jsonParser,authMiddlware,activityRoutes);
app.use(jsonParser,alertRoutes);


mongoose
  .connect(database.dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response)=>{
    app.listen(process.env.PORT || 3000, () => console.log("Connected to database"));
  })
  .catch((err) => {
    if (err.code === "ECONNREFUSED")
      console.log(
        "Failed to Connect with MongoDB Please check your Internet Connection"
      );
    else console.log("ERORR", err);
});

