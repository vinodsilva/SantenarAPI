
const accountSid = 'AC73d27773c5a6a2d30428e0e756348029';
const authToken = '67d4cd998ee2a4e663d2f01c0a13b8cc';

const sendSms = (phone, message) => {
  const client = require('twilio')(accountSid, authToken);
  console.log(phone,message);
  client.messages
    .create({
       body: message,
       from: '+17622402744',
       to: '+91'+phone
     })
    .then(message => console.log(message.sid))
    .catch(err=>console.log("ERR",err));
}

module.exports = sendSms;