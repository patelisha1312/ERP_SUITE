import {
  useEffect,
  useState,
  useContext
} from 'react';

import Sidebar from '../components/Sidebar';
import Chatbot from '../components/Chatbot';

import axios from 'axios';

import {
  ThemeContext
} from '../context/ThemeContext';

import {
  FaUsers,
  FaBoxes,
  FaMoneyBillWave,
  FaChartLine
} from 'react-icons/fa';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

function Dashboard() {

  const {
    darkMode
  } = useContext(ThemeContext);

  const role =
    localStorage.getItem('role');

  const [employeeCount, setEmployeeCount] =
    useState(0);

  const [financeData, setFinanceData] =
    useState([]);

  const [inventoryCount, setInventoryCount] =
    useState(0);
const [notifications, setNotifications] =
  useState([]);
  // FETCH DATA

  const fetchDashboardData = async () => {

    try {

      const response =
        await axios.get(
          'http://localhost:5000/api/dashboard'
        );

      setEmployeeCount(
        response.data.employeeCount
      );

      setFinanceData(
        response.data.financeData
      );

      setInventoryCount(
        response.data.totalProducts
      );
// REAL TIME NOTIFICATIONS

setNotifications([

  {
    title: 'New Product Added',
    message:
      `${response.data.totalProducts} products available in inventory`,
    time: '2 mins ago',
    color: '#8b5cf6'
  },

  {
    title: 'Revenue Updated',
    message:
      `Total revenue reached ₹${response.data.totalIncome}`,
    time: '5 mins ago',
    color: '#10b981'
  },

  {
    title: 'Expense Alert',
    message:
      `Total expense is ₹${response.data.totalExpense}`,
    time: '10 mins ago',
    color: '#ef4444'
  },

  {
    title: 'Employee Update',
    message:
      `${response.data.employeeCount} employees are active`,
    time: '15 mins ago',
    color: '#3b82f6'
  }

]);
    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  // TOTALS

  const totalIncome =
    financeData
      .filter(
        item =>
          item.type === 'income'
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      );

  const totalExpense =
    financeData
      .filter(
        item =>
          item.type === 'expense'
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      );

  // BAR CHART DATA

  

  // AREA CHART DATA

  const revenueData = [

    {
      month: 'Jan',
      income: 12000,
      expense: 4000
    },

    {
      month: 'Feb',
      income: 18000,
      expense: 6000
    },

    {
      month: 'Mar',
      income: 25000,
      expense: 10000
    },

    {
      month: 'Apr',
      income: 32000,
      expense: 12000
    },

    {
      month: 'May',
      income: 40000,
      expense: 16000
    },

    {
      month: 'Jun',
      income: 45000,
      expense: 18000
    }

  ];

  // PIE DATA

  const pieData = [

    {
      name: 'Income',
      value: totalIncome
    },

    {
      name: 'Expense',
      value: totalExpense
    }

  ];

  const COLORS = [
    '#3b82f6',
    '#ef4444'
  ];

  // COMMON CARD STYLE

  const cardStyle = {

    background:
      darkMode
        ? '#0f172a'
        : 'white',

    border:
      darkMode
        ? '1px solid #1e293b'
        : '1px solid #e2e8f0',

    borderRadius: '24px',

    padding: '28px',

    boxShadow:
      darkMode
        ? '0px 0px 0px'
        : '0px 4px 20px rgba(0,0,0,0.05)'

  };

  return (

    <div
      style={{
        display: 'flex',

        background:
          darkMode
            ? '#020617'
            : '#f1f5f9',

        minHeight: '100vh'
      }}
    >

      <Sidebar />

      {/* MAIN */}

      <div
        style={{
          marginLeft:
            window.innerWidth <= 768
              ? '0'
              : '270px',

          width: '100%',

          padding:
            window.innerWidth <= 768
              ? '90px 15px 30px'
              : '35px'
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '35px'
          }}
        >

          <div>

            <h1
              style={{
                margin: 0,

                fontSize: '42px',

                fontWeight: '700',

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              Dashboard

            </h1>

            <p
              style={{
                marginTop: '10px',

                color:
                  darkMode
                    ? '#94a3b8'
                    : '#64748b'
              }}
            >

              Welcome back to AMX ERP Platform

            </p>

          </div>

          {/* RIGHT */}

          <div
            style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >

            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search anything..."

              style={{
                padding: '14px 18px',

                width: '250px',

                borderRadius: '16px',

                border:
                  darkMode
                    ? '1px solid #1e293b'
                    : '1px solid #e2e8f0',

                background:
                  darkMode
                    ? '#0f172a'
                    : 'white',

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a',

                outline: 'none'
              }}
            />

            {/* PROFILE */}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',

                background:
                  darkMode
                    ? '#0f172a'
                    : 'white',

                border:
                  darkMode
                    ? '1px solid #1e293b'
                    : '1px solid #e2e8f0',

                borderRadius: '18px',

                padding: '10px 18px'
              }}
            >

              <div
                style={{
                  width: '45px',
                  height: '45px',

                  borderRadius: '14px',

                  background: '#3b82f6',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  color: 'white',

                  fontWeight: 'bold'
                }}
              >

                {

                  role?.charAt(0)
                    .toUpperCase()

                }

              </div>

              <div>

                <p
                  style={{
                    margin: 0,
                    fontSize: '13px',

                    color:
                      darkMode
                        ? '#94a3b8'
                        : '#64748b'
                  }}
                >

                  Logged in as

                </p>

                <h4
                  style={{
                    marginTop: '4px',
                    marginBottom: 0,

                    textTransform: 'capitalize',

                    color:
                      darkMode
                        ? 'white'
                        : '#0f172a'
                  }}
                >

                  {role}

                </h4>

              </div>

            </div>

          </div>

        </div>

        {/* TOP CARDS */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit,minmax(250px,1fr))',

            gap: '24px',

            marginBottom: '30px'
          }}
        >

          {/* EMPLOYEE */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >

              <div>

                <p
                  style={{
                    color:
                      darkMode
                        ? '#94a3b8'
                        : '#64748b'
                  }}
                >

                  Employees

                </p>

                <h1
                  style={{
                    color:
                      darkMode
                        ? 'white'
                        : '#0f172a'
                  }}
                >

                  {employeeCount}

                </h1>

              </div>

              <div
                style={{
                  width: '60px',
                  height: '60px',

                  borderRadius: '18px',

                  background: '#3b82f6',

                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                  color: 'white',

                  fontSize: '22px'
                }}
              >

                <FaUsers />

              </div>

            </div>

          </div>

          {/* PRODUCTS */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >

              <div>

                <p
                  style={{
                    color:
                      darkMode
                        ? '#94a3b8'
                        : '#64748b'
                  }}
                >

                  Products

                </p>

                <h1
                  style={{
                    color:
                      darkMode
                        ? 'white'
                        : '#0f172a'
                  }}
                >

                  {inventoryCount}

                </h1>

              </div>

              <div
                style={{
                  width: '60px',
                  height: '60px',

                  borderRadius: '18px',

                  background: '#8b5cf6',

                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                  color: 'white',

                  fontSize: '22px'
                }}
              >

                <FaBoxes />

              </div>

            </div>

          </div>

          {/* REVENUE */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >

              <div>

                <p
                  style={{
                    color:
                      darkMode
                        ? '#94a3b8'
                        : '#64748b'
                  }}
                >

                  Revenue

                </p>

                <h1
                  style={{
                    color:
                      '#10b981'
                  }}
                >

                  ₹ {totalIncome}

                </h1>

              </div>

              <div
                style={{
                  width: '60px',
                  height: '60px',

                  borderRadius: '18px',

                  background: '#10b981',

                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                  color: 'white',

                  fontSize: '22px'
                }}
              >

                <FaMoneyBillWave />

              </div>

            </div>

          </div>

          {/* EXPENSE */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >

              <div>

                <p
                  style={{
                    color:
                      darkMode
                        ? '#94a3b8'
                        : '#64748b'
                  }}
                >

                  Expense

                </p>

                <h1
                  style={{
                    color:
                      '#ef4444'
                  }}
                >

                  ₹ {totalExpense}

                </h1>

              </div>

              <div
                style={{
                  width: '60px',
                  height: '60px',

                  borderRadius: '18px',

                  background: '#ef4444',

                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                  color: 'white',

                  fontSize: '22px'
                }}
              >

                <FaChartLine />

              </div>

            </div>

          </div>

        </div>

        {/* CHARTS */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              '2fr 1fr',

            gap: '25px',

            marginBottom: '30px'
          }}
        >

          {/* AREA CHART */}

          <div style={cardStyle}>

            <h2
              style={{
                marginBottom: '20px',

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              Revenue Analytics

            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <AreaChart
                data={revenueData}
              >

                <defs>

                  <linearGradient
                    id="incomeColor"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#3b82f6"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#3b82f6"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#incomeColor)"
                />

                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  fillOpacity={0.3}
                  fill="#ef4444"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}

          <div style={cardStyle}>

            <h2
              style={{
                marginBottom: '20px',

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              Finance Ratio

            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie
                  data={pieData}

                  dataKey="value"

                  nameKey="name"

                  outerRadius={110}

                  label
                >

                  {

                    pieData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />

                      )
                    )

                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* NOTIFICATION SECTION */}

<div
  style={{
    marginTop: '30px'
  }}
>

  <h2
    style={{
      marginBottom: '20px',

      color:
        darkMode
          ? 'white'
          : '#0f172a'
    }}
  >

    Real Time Notifications

  </h2>

  <div
    style={{
      display: 'grid',

      gridTemplateColumns:
        'repeat(auto-fit,minmax(300px,1fr))',

      gap: '20px'
    }}
  >

    {

      notifications.map(
        (item, index) => (

          <div
            key={index}

            style={{

              background:
                darkMode
                  ? '#0f172a'
                  : 'white',

              borderLeft:
                `6px solid ${item.color}`,

              borderRadius: '20px',

              padding: '22px',

              boxShadow:
                '0px 4px 15px rgba(0,0,0,0.08)',

              transition: '0.3s'
            }}
          >

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}
            >

              <h3
                style={{
                  margin: 0,

                  color:
                    darkMode
                      ? 'white'
                      : '#0f172a'
                }}
              >

                {item.title}

              </h3>

              <span
                style={{
                  fontSize: '13px',

                  color:
                    darkMode
                      ? '#94a3b8'
                      : '#64748b'
                }}
              >

                {item.time}

              </span>

            </div>

            <p
              style={{
                margin: 0,

                lineHeight: '1.7',

                color:
                  darkMode
                    ? '#cbd5e1'
                    : '#475569'
              }}
            >

              {item.message}

            </p>

          </div>

        )
      )

    }

  </div>

</div>

      </div>

      <Chatbot />

    </div>

  );

}

export default Dashboard;