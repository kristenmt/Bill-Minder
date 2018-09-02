// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC5951c8bd0eac49e044eeb17115056737';
const authToken = '27d9220c4136cb408c18ac1bf6e883bf';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+14079655596',
     to: '+12173416603'
   })
  .then(message => console.log(message.sid))
  .done();