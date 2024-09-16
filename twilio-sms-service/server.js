const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const accountSid = 'ACd8d70787671f2fe116455786c623e0a2';
const authToken = '87bca2bf240ab7cce795ff907ebce9d9';
const client = twilio(accountSid, authToken);

app.post('/send-otp', (req, res) => {
    const { mobileNumber, otp } = req.body;

    client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+19515434639',
        to: mobileNumber
    })
    .then(message => {
        console.log('OTP sent successfully:', message.sid);
        res.status(200).json({ success: true, message: 'OTP sent successfully!' });
    })
    .catch(error => {
        console.error('Failed to send OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP.' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
