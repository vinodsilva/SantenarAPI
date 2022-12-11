/**
 * @author vinod_silva
 */

 require("dotenv").config();
 var dbConn ="mongodb+srv://admin:yggl7XO1YXkJQeHM@atlascluster.ymi30pd.mongodb.net/?retryWrites=true&w=majority";
 // console.log(dbConn);
 module.exports = {
   secret: "santanar.com",
   dbConnection: dbConn,
 };
 
