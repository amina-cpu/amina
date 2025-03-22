const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add this
const nodemailer = require('nodemailer'); // Add this
require('dotenv').config(); // Add this for environment variables

const app = express();

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html explicitly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Serve the PDF file with the correct Content-Type
app.get('/cveng.pdf', (req, res) => { 
    res.contentType('application/pdf');
    res.sendFile(path.join(__dirname, 'public', 'cveng.pdf'));
});

// NEW: Add route for email sending
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Create email transporter (configure with your email service)
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS  
        }
    });
    
    // Email content
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Your email address to receive messages
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