import {
  useEffect,
  useState,
  useContext
} from 'react';

import Sidebar from '../components/Sidebar';

import {
  ThemeContext
} from '../context/ThemeContext';

import {
  getEmployees
} from '../services/employeeService';

import {
  getTransactions
} from '../services/financeService';

import {
  getProducts
} from '../services/inventoryService';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';

import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';

import {
  FaDownload,
  FaChartLine,
  FaUsers,
  FaBoxes,
  FaMoneyBillWave
} from 'react-icons/fa';

function Reports() {

  const {
    darkMode
  } = useContext(ThemeContext);

  const [employees, setEmployees] =
    useState([]);

  const [transactions, setTransactions] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  // FETCH DATA

  const fetchData = async () => {

    try {

      const employeeRes =
        await getEmployees();

      const financeRes =
        await getTransactions();

      const inventoryRes =
        await getProducts();

      setEmployees(
        employeeRes.data
      );

      setTransactions(
        financeRes.data
      );

      setProducts(
        inventoryRes.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchData();

  }, []);

  // CALCULATIONS

  const totalIncome =
    transactions
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
    transactions
      .filter(
        item =>
          item.type === 'expense'
      )
      .reduce(
        (acc, item) =>
          acc + item.amount,
        0
      );

  const profit =
    totalIncome -
    totalExpense;

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

  // BAR DATA

  const barData = [

    {
      name: 'Employees',
      value:
        employees.length
    },

    {
      name: 'Products',
      value:
        products.length
    },

    {
      name: 'Income',
      value:
        totalIncome
    },

    {
      name: 'Expense',
      value:
        totalExpense
    }

  ];

  // COLORS

  const COLORS = [

    '#10b981',
    '#ef4444'

  ];

  // DOWNLOAD PDF

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      'AMX ERP Business Report',
      14,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Generated On: ${new Date().toLocaleString()}`,
      14,
      30
    );

    autoTable(doc, {

      startY: 45,

      head: [[
        'Category',
        'Value'
      ]],

      body: [

        [
          'Total Employees',
          employees.length
        ],

        [
          'Total Products',
          products.length
        ],

        [
          'Total Income',
          `₹${totalIncome}`
        ],

        [
          'Total Expense',
          `₹${totalExpense}`
        ],

        [
          'Profit',
          `₹${profit}`
        ]

      ]

    });

    doc.save(
      'ERP_Report.pdf'
    );

  };

  // CARD STYLE

  const cardStyle = {

    background:
      darkMode
        ? '#0f172a'
        : 'white',

    borderRadius: '24px',

    padding: '25px',

    boxShadow:
      darkMode
        ? 'none'
        : '0px 4px 20px rgba(0,0,0,0.05)',

    border:
      darkMode
        ? '1px solid #1e293b'
        : '1px solid #e2e8f0'
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

            justifyContent:
              'space-between',

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

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              Reports & Analytics

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

              Real-time business analytics dashboard

            </p>

          </div>

          {/* DOWNLOAD BUTTON */}

          <button
            onClick={downloadPDF}

            style={{

              padding:
                '15px 25px',

              border: 'none',

              borderRadius:
                '16px',

              background:
                'linear-gradient(135deg,#3b82f6,#2563eb)',

              color: 'white',

              fontWeight:
                '600',

              cursor: 'pointer',

              display: 'flex',

              alignItems:
                'center',

              gap: '10px',

              fontSize: '15px'
            }}
          >

            <FaDownload />

            Export Report

          </button>

        </div>

        {/* SUMMARY */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit,minmax(240px,1fr))',

            gap: '25px',

            marginBottom: '35px'
          }}
        >

          <SummaryCard
            title="Employees"
            value={employees.length}
            icon={<FaUsers />}
            color="#3b82f6"
            cardStyle={cardStyle}
          />

          <SummaryCard
            title="Products"
            value={products.length}
            icon={<FaBoxes />}
            color="#8b5cf6"
            cardStyle={cardStyle}
          />

          <SummaryCard
            title="Revenue"
            value={`₹${totalIncome}`}
            icon={<FaMoneyBillWave />}
            color="#10b981"
            cardStyle={cardStyle}
          />

          <SummaryCard
            title="Profit"
            value={`₹${profit}`}
            icon={<FaChartLine />}
            color="#f59e0b"
            cardStyle={cardStyle}
          />

        </div>

        {/* CHARTS */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit,minmax(350px,1fr))',

            gap: '25px',

            marginBottom: '35px'
          }}
        >

          {/* PIE */}

          <div style={cardStyle}>

            <h2
              style={{
                marginBottom:
                  '20px',

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              Finance Overview

            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={pieData}

                  dataKey="value"

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

          {/* BAR */}

          <div style={cardStyle}>

            <h2
              style={{
                marginBottom:
                  '20px',

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              ERP Analytics

            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart
                data={barData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"

                  fill="#3b82f6"

                  radius={[
                    10,
                    10,
                    0,
                    0
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>
        {/* INVENTORY DETAILS */}

<div
  style={{
    ...cardStyle,

    marginBottom: '35px'
  }}
>

  <div
    style={{
      display: 'flex',

      justifyContent:
        'space-between',

      alignItems: 'center',

      marginBottom: '25px',

      flexWrap: 'wrap',

      gap: '15px'
    }}
  >

    <div>

      <h2
        style={{
          margin: 0,

          color:
            darkMode
              ? 'white'
              : '#0f172a'
        }}
      >

        Inventory Details

      </h2>

      <p
        style={{
          marginTop: '8px',

          color:
            darkMode
              ? '#94a3b8'
              : '#64748b'
        }}
      >

        Real-time inventory tracking system

      </p>

    </div>

    <div
      style={{
        padding: '12px 18px',

        borderRadius: '14px',

        background:
          'linear-gradient(135deg,#8b5cf6,#7c3aed)',

        color: 'white',

        fontWeight: '600'
      }}
    >

      Total Products:
      {' '}
      {products.length}

    </div>

  </div>

  <div
    style={{
      overflowX: 'auto'
    }}
  >

    <table
      style={{
        width: '100%',

        borderCollapse:
          'collapse'
      }}
    >

      <thead>

        <tr>

          <th style={tableHead}>
            Product
          </th>

          <th style={tableHead}>
            Quantity
          </th>

          <th style={tableHead}>
            Price
          </th>

          <th style={tableHead}>
            Supplier
          </th>

          <th style={tableHead}>
            Stock Status
          </th>

        </tr>

      </thead>

      <tbody>

        {

          products.map(
            (item) => (

              <tr
                key={item._id}
              >

                <td style={tableData}>

                  {item.productName}

                </td>

                <td style={tableData}>

                  {item.quantity}

                </td>

                <td style={tableData}>

                  ₹{item.price}

                </td>

                <td style={tableData}>

                  {item.supplier}

                </td>

                <td style={tableData}>

                  <span
                    style={{

                      padding:
                        '8px 14px',

                      borderRadius:
                        '30px',

                      fontWeight:
                        '600',

                      background:

                        item.quantity > 10

                          ? '#dcfce7'

                          : item.quantity > 5

                          ? '#fef3c7'

                          : '#fee2e2',

                      color:

                        item.quantity > 10

                          ? '#166534'

                          : item.quantity > 5

                          ? '#92400e'

                          : '#991b1b'

                    }}
                  >

                    {

                      item.quantity > 10

                        ? 'In Stock'

                        : item.quantity > 5

                        ? 'Low Stock'

                        : 'Critical'

                    }

                  </span>

                </td>

              </tr>

            )
          )

        }

      </tbody>

    </table>

  </div>

</div>

        {/* LINE CHART */}

        <div style={cardStyle}>

          <h2
            style={{
              marginBottom:
                '20px',

              color:
                darkMode
                  ? 'white'
                  : '#0f172a'
            }}
          >

            Business Performance

          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <LineChart
              data={barData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"

                dataKey="value"

                stroke="#3b82f6"

                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}

// SUMMARY CARD

function SummaryCard({

  title,
  value,
  icon,
  color,
  cardStyle

}) {

  return (

    <div style={cardStyle}>

      <div
        style={{
          display: 'flex',

          justifyContent:
            'space-between',

          alignItems: 'center'
        }}
      >

        <div>

          <p
            style={{
              color:
                '#64748b',

              marginBottom:
                '10px'
            }}
          >

            {title}

          </p>

          <h1
            style={{
              margin: 0,

              color:
                '#0f172a'
            }}
          >

            {value}

          </h1>

        </div>

        <div
          style={{
            width: '65px',

            height: '65px',

            borderRadius: '18px',

            background: color,

            display: 'flex',

            alignItems: 'center',

            justifyContent:
              'center',

            color: 'white',

            fontSize: '24px'
          }}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}
const tableHead = {

  padding: '16px',

  textAlign: 'left',

  color: '#64748b',

  borderBottom:
    '1px solid #e2e8f0',

  fontWeight: '600'
};

const tableData = {

  padding: '16px',

  borderBottom:
    '1px solid #e2e8f0'
};
export default Reports;