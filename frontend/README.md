<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
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
>>>>>>> 01821890534e6aacae6543a1fcb575c6c19cbdfa
