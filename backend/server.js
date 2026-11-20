require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middleware: prepare Express to receive requests
app.use(cors({
  origin: "https://illustrious-scone-852fa4.netlify.app"
}));
app.use(express.json());

// 2. Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 3. MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 4. Contact form endpoint
app.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  // Clean submitted values
  const cleanName = name?.trim();
  const cleanEmail = email?.trim();
  const cleanSubject = subject?.trim();
  const cleanMessage = message?.trim();

  // Validate required fields and data types
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !cleanName ||
    !cleanEmail ||
    !cleanSubject ||
    !cleanMessage
  ) {
    return res.status(400).json({
      message: "Please fill in all fields.",
    });
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({
      message: "Please enter a valid email address.",
    });
  }

  // Validate field lengths
  if (
    cleanName.length > 100 ||
    cleanEmail.length > 254 ||
    cleanSubject.length > 150
  ) {
    return res.status(400).json({
      message: "One or more fields exceed the allowed length.",
    });
  }

  // Validate message length
  if (cleanMessage.length < 10 || cleanMessage.length > 500) {
    return res.status(400).json({
      message: "Message must be between 10 and 500 characters.",
    });
  }

  // Prepare the SQL query
  const sql = `
    INSERT INTO contact_messages
    (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;

  const values = [cleanName, cleanEmail, cleanSubject, cleanMessage];

  // Save the message before sending the notification email
  db.query(sql, values, async (err, result) => {
    if (err) {
      console.error("Error saving message:", err.message);

      return res.status(500).json({
        message: "Unable to save your message.",
      });
    }

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CLINIC_EMAIL,
        replyTo: cleanEmail,
        subject: "New message from the clinic website",
        text: `
New Contact Form Message

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}

Message:
${cleanMessage}
        `,
      });

      console.log("Contact notification email sent");

      return res.status(201).json({
        message: "Your message was saved and the clinic was notified!",
        id: result.insertId,
        emailSent: true,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);

      return res.status(201).json({
        message:
          "Your message was saved, but the email notification could not be sent.",
        id: result.insertId,
        emailSent: false,
      });
    }
  });
});

// 5. Connect to MySQL before starting the server
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }

  console.log("Connected to the database");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
