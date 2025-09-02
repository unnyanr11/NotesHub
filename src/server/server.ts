// server.ts
import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  },
});

const upload = multer({ storage });

// Middleware to handle JSON requests
app.use(express.json());

// Email sending route
app.post('/api/verify-payment', upload.single('screenshot'), async (req: Request, res: Response) => {
  const { fullName, contactNumber, email, courseId } = req.body;
  const file = req.file;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Payment Verification Details',
    text: `User Info:\n\nFull Name: ${fullName}\nContact Number: ${contactNumber}\nEmail: ${email}\nCourse ID: ${courseId}`,
    attachments: [
      {
        path: file.path, // Path to the uploaded file
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Verification details sent successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not send the email. Please try again later.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});