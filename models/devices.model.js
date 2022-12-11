/**
 * @author vinod_silva
 * @Since 07 Mar 2022
 */

 const mongoose = require("mongoose"),
 Schema = mongoose.Schema;

/**
* User schema
*/
const DeviceSchema = new mongoose.Schema(
 {
   deviceId:String,
   deviceName:String,
   ownerName:String,
   ownerEmail:String,
   ownerPhone:String,
   status:Number
 },
 { timestamps: true }
);
module.exports = mongoose.model("Device", DeviceSchema);
