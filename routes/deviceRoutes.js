/**
 * @author vinod_silva
 * @Since 07 Mar 2022
 */

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserModel = require("../models/users.model");
const { decodeJwtToken } = require('../utils/helpers')
const DeviceModel = require('../models/devices.model')



//view all devices
router.get('/devices', async (req, res, next) => {
    const { token } = req.session;
    const tokenData = decodeJwtToken(token);
    const response = await DeviceModel.find({
        ownerEmail: tokenData.email
    })
    res.json({
        success: true,
        data: response
    })
})


router.post('/addDevice', async (req, res, next) => {
    const { token } = req.session;
    var {
        deviceId,
        deviceName
    } = req.body;
    const tokenData = decodeJwtToken(token);

    const response = await DeviceModel.create({
        deviceId: deviceId,
        deviceName: deviceName,
        ownerEmail: tokenData.email,
        ownerName: tokenData.name,
        ownerPhone: tokenData.mobile,
        status: 0
    })

    //check users device array include device id
    const user = await UserModel.findOne({
        email: tokenData.email
    })
    if (user.devices.includes(deviceId)) {
        res.json({
            success: false,
            message: "Device already exists"
        })
    } {
        user.devices.push(deviceId);
        await user.save();

        res.json({
            success: true,
            data: response
        })

    }


})


//  router.get('/devices/count',async(req,res,next)=>{

//     try{
//     const {token}=req.session;
//     const {id:userId}=decodeJwtToken(token);
//     const time = new Date().getTime();
//     const id = reversedNum(time);
//     const deviceId= "DC" + reversedNum(parseInt(id + Math.random() * 100));
//     const tokenData=decodeJwtToken(token);
//     const devices=await DeviceModel.find({ownerId:userId});
//     let a=0,ia=0;
//     for( let d of devices){
//         switch (d.status){
//             case 0:
//                 ia++;
//                 break;
//             case 1:
//                 a++;
//                 break;
//             default:
//                 ia++;
//             break;
//         }
//     }


//     res.json({
//         success:true,
//         data:{
//             total:devices.length,
//             active:a,
//             inActive:ia
//         }
//     })

// }
// catch(err){
//     res.json({success:false,
//         message:err.toString()
//     })
// }
//  })



module.exports = router;