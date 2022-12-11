/**
 * @author vinod_silva
 * @Since 07 Mar 2022
 */

 let nodemailer = require("nodemailer");

 
 module.exports.GmailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
   auth: {
     user: "test@gmail.com",
     pass: "123456",
   },
 });
 