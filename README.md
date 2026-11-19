# Immaculate Maternity Clinic

A responsive maternity clinic website designed to provide accessible information about maternal and childcare services while allowing visitors to contact the clinic through an integrated contact form.

## Project Overview

Immaculate Maternity Clinic is a full-stack web application built to demonstrate frontend development, backend API development, database integration, and email notification functionality.

The application allows visitors to explore clinic services, learn about the clinic, switch between light and dark themes, and submit enquiries through a contact form.

Contact form submissions are validated by the backend, saved in a MySQL database, and forwarded to the clinic through email notifications.

## Features

- Responsive design for desktop, tablet, and mobile devices.
- Light and dark mode.
- Interactive navigation.
- Maternity and childcare service sections.
- Contact form with input validation.
- Backend API for processing contact submissions.
- MySQL database integration for storing messages.
- Email notifications using Nodemailer.
- Success and error feedback for form submissions.

## Technologies Used

### Frontend
- React.js
- Vite
- React Router
- Bootstrap 5
- React-Bootstrap
- React Icons
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MySQL
- mysql2
- Nodemailer
- CORS
- dotenv

## Project Structure

```text
Felicia/
│
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate into the project

```bash
cd Felicia
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Set up the backend

Open another terminal:

```bash
cd backend
npm install
```

### 5. Configure environment variables

Create a `.env` file inside the backend folder.

Add the following variables:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3308
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=immaculate_clinic

SMTP_USER=your_gmail_address
SMTP_PASS=your_gmail_app_password
CLINIC_EMAIL=clinic_email_address
```

Replace the example values with your own credentials.

**Important:** Never upload your actual `.env` file or expose your database and email credentials publicly.

### 6. Set up the MySQL database

Create the database:

```sql
CREATE DATABASE immaculate_clinic;
```

Select the database:

```sql
USE immaculate_clinic;
```

Create the contact messages table:

```sql
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Run the application

Start the backend:

```bash
npm run dev
```

Start the frontend in another terminal from the Felicia directory:

```bash
npm run dev
```

Open the local Vite URL displayed in your terminal to view the application.

## API Documentation

### Contact Form Endpoint

| Method | Endpoint | Description |
|---|---|---|
| POST | `/contact` | Submits a contact message |

**Request body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Appointment Enquiry",
  "message": "I would like to make an appointment."
}
```

**Successful response:**

```json
{
  "message": "Your message was saved and the clinic was notified!",
  "id": 1,
  "emailSent": true
}
```

The API validates the submitted fields, saves the message to MySQL, and sends an email notification to the clinic.

## Screenshots

Screenshots of the application can be added here to demonstrate the user interface in both light and dark modes.

Suggested screenshots:
- Homepage
- Services section
- About section
- Contact form
- Dark mode interface

## Future Improvements

- Online appointment booking.
- Patient registration and authentication.
- Clinic administration dashboard.
- Appointment management system.

## Author

**Devup Mercy**

Aspiring Backend / Full-Stack Developer.

