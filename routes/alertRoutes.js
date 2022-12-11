const express = require("express");
const jwt = require("jsonwebtoken");
const activityModel = require("../models/activity.model");
const devicesModel = require("../models/devices.model");
const router = express.Router();
const UserModel = require("../models/users.model");
const { decodeJwtToken, reversedNum } = require('../utils/helpers')
const { GmailTransport } = require("../config/mail");
const sendSms = require("../config/sms");




app.get('/alert', jsonParser, async (req, res, next) => {

  const { deviceId, message } = req.body;
  const rs = await devicesModel.find({ deviceId: deviceId });

  console.log(rs);

  const email = rs.ownerEmail;
  const name = rs.ownerName;
  const phone = rs.ownerPhone;

  console.log(deviceId, email, name, phone, message);


  // const msg = {
  //   to: email, // Change to your recipient
  //   from: '"Santenar" SantenarIOT@gmail.com', // Change to your verified sender
  //   subject: `Motion alert ${new Date()}`,
  //   html: `<strong>${message} has been detected with you Santenar Device ${did}, please check it</strong>`,
  // }

  // const activity= await activityModel.create({
  //   deviceId:did,
  //  ipAddress:'12.232.32333.3',
  //  deviceOwnerDocId:'2Adws22dw',
  // })
  // sendSms(9713063026,`
  // Some activity has been detected with you DEVICE ID : ${did} at ${new Date()}.
  // `);

  res.json({
    success: true
  });

  //   GmailTransport.sendMail(msg)
  //   .then(resp=>{
  //     console.log(resp);

  //   })
  //   .catch(err=>{
  //     console.log(err);
  //     res.json({
  //       success:false
  //     });
  //   })

  // next();
})
