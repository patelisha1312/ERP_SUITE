const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const dashboardRoutes =
  require('./routes/dashboardRoutes');
  const chatbotRoutes =
  require('./routes/chatbotRoutes');
  const activityRoutes =
  require('./routes/activityRoutes');
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/finance', require('./routes/financeRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use(
  '/api/attendance',
  require(
    './routes/attendanceRoutes'
  )
);
app.use(
  '/api/dashboard',
  dashboardRoutes
);
app.use(
  '/api/chatbot',
  chatbotRoutes
);
app.use(
  '/api/activities',
  activityRoutes
);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('AMX ERP Backend Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});