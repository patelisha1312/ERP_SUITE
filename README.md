# ERP Suite - Enterprise Resource Planning System

A modern full-stack Enterprise Resource Planning (ERP) web application designed for efficient business management. This project provides real-time management of employees, attendance, finance, inventory, reports, leave requests, and administrative settings through a professional dashboard interface.

---

## Project Overview

ERP Suite is a centralized business management platform built to help organizations manage their daily operations efficiently.

The system includes:

- Employee Management
- Real-Time Attendance Management
- Finance Management
- Inventory Management
- Reports & Analytics
- Leave Management
- Role-Based Authentication
- AI Chatbot Assistant
- Professional Dashboard Analytics
- Real-Time Business Monitoring

---

## Features

### Authentication & Security
- Secure User Registration
- Secure Login System
- JWT Authentication
- Password Encryption using bcrypt
- Role-Based Access Control

### User Roles
Different access levels:

- Admin
- Manager
- Employee

Role permissions:

| Module | Admin | Manager | Employee |
|--------|------|---------|----------|
| Dashboard | Yes | Yes | Yes |
| Employees | Yes | No | No |
| Attendance | Yes | Yes | Yes |
| Finance | Yes | Yes | No |
| Inventory | Yes | Yes | Yes |
| Reports | Yes | Yes | Yes |
| Leaves | Yes | Yes | Yes |
| Settings | Yes | Yes | Yes |

---

## Core Modules

### Dashboard
Professional analytics dashboard with:

- Real-time employee statistics
- Revenue tracking
- Expense monitoring
- Inventory analytics
- Business health monitoring
- Real-time notifications
- Live clock
- Smart ERP chatbot
- Interactive charts

### Employee Management
Features:

- Add employees
- Edit employee details
- Delete employees
- Search employees
- Export employee reports as PDF
- Department tracking
- Salary management
- Real-time employee statistics
- Bar chart analytics

### Attendance Management
Features:

- Real-time attendance marking
- Present / Absent / Late status
- Attendance analytics
- Department attendance tracking
- Live attendance dashboard
- Search employees
- Attendance rate monitoring
- Real-time refresh

### Finance Management
Features:

- Add transactions
- Income tracking
- Expense tracking
- Financial analytics
- Monthly summaries
- Real-time transaction updates
- Business finance dashboard
- Interactive charts

### Inventory Management
Features:

- Add products
- Inventory stock monitoring
- Supplier tracking
- Low stock alerts
- Real-time inventory analytics
- Product availability tracking
- Stock statistics
- Inventory dashboard

### Reports & Analytics
Features:

- Business performance reports
- Employee analytics
- Attendance analytics
- Financial reports
- Inventory reports
- Downloadable analytics
- Real-time reporting dashboard

### Leave Management
Features:

- Apply leave requests
- Leave approval workflow
- Leave tracking
- Employee leave history
- Real-time updates

### Settings
Features:

- Theme customization
- Profile settings
- ERP preferences
- Notification settings
- Account settings

### AI Chatbot Assistant
Smart ERP assistant can answer queries like:

- Total employee count
- Inventory details
- Income details
- Expense details
- Business analytics queries

---

## Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Recharts
- React Icons
- Framer Motion
- React Toastify
- jsPDF
- jsPDF AutoTable

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cors

---

## Project Architecture

```bash
ERP_SUITE/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│
├── .gitignore
├── package.json
└── README.md
