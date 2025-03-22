const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const nodemailer = require('nodemailer');
require('dotenv').config(); 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/cveng.pdf', (req, res) => { 
    res.contentType('application/pdf');
    res.sendFile(path.join(__dirname, 'public', 'cveng.pdf'));
});

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
    
   
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS  
        }
    });
    

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, 
        subject: `Portfolio Contact: ${subject || 'New Message'}`,
        html: `
            <h3>New Message from Portfolio</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});