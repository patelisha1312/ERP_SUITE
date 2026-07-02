import {
  useEffect,
  useState,
  useContext
} from 'react';

import Sidebar from '../components/Sidebar';

import {
  addTransaction,
  getTransactions
} from '../services/financeService';

import {
  ThemeContext
} from '../context/ThemeContext';

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
  YAxis
} from 'recharts';

import {
  FaWallet,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaClock,
  FaReceipt
} from 'react-icons/fa6';

function Finance() {

  const [transactions, setTransactions] =
    useState([]);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const [formData, setFormData] =
    useState({
      title: '',
      amount: '',
      type: 'expense',
      category: ''
    });

  const {
    darkMode
  } = useContext(ThemeContext);

  // FETCH

  const fetchTransactions =
    async () => {

      try {

        const response =
          await getTransactions();

        setTransactions(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchTransactions();

  }, []);

  // REAL TIME

  useEffect(() => {

    const timer =
      setInterval(() => {

        setCurrentTime(
          new Date()
        );

        fetchTransactions();

      }, 5000);

    return () =>
      clearInterval(timer);

  }, []);

  // TOTALS

  const totalIncome = transactions
    .filter(item =>
      item.type === 'income'
    )
    .reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    );

  const totalExpense = transactions
    .filter(item =>
      item.type === 'expense'
    )
    .reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    );

  const totalBalance =
    totalIncome - totalExpense;

  // CHART DATA

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

    '#10b981',
    '#ef4444'

  ];

  // CATEGORY ANALYTICS

  const categoryMap = {};

  transactions.forEach((item) => {

    if (
      categoryMap[
        item.category
      ]
    ) {

      categoryMap[
        item.category
      ] += Number(
        item.amount
      );

    }

    else {

      categoryMap[
        item.category
      ] = Number(
        item.amount
      );

    }

  });

  const categoryData =
    Object.keys(
      categoryMap
    ).map((key) => ({

      category: key,

      amount:
        categoryMap[key]

    }));

  // HANDLE CHANGE

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  // SUBMIT

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await addTransaction(
          formData
        );

        fetchTransactions();

        setFormData({

          title: '',
          amount: '',
          type: 'expense',
          category: ''

        });

      } catch (error) {

        console.log(error);

      }

    };

  // CARD STYLE

  const cardStyle = {

    background:

      darkMode
        ? '#0f172a'
        : 'white',

    borderRadius: '28px',

    padding: '25px',

    border:

      darkMode
        ? '1px solid rgba(255,255,255,0.08)'
        : '1px solid #e2e8f0',

    boxShadow:

      darkMode

        ? '0px 8px 25px rgba(0,0,0,0.4)'

        : '0px 8px 25px rgba(0,0,0,0.06)'
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

            alignItems:
              'center',

            flexWrap: 'wrap',

            gap: '20px',

            marginBottom: '35px'
          }}
        >

          <div>

            <h1
              style={{
                margin: 0,

                fontSize: '44px',

                fontWeight: '800',

                color:

                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              Finance Dashboard

            </h1>

            <p
              style={{
                marginTop: '10px',

                color:
                  '#64748b'
              }}
            >

              Real-time financial analytics and transactions

            </p>

          </div>

          {/* CLOCK */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',

                alignItems:
                  'center',

                gap: '15px'
              }}
            >

              <FaClock
                size={22}
                color="#3b82f6"
              />

              <div>

                <h3
                  style={{
                    margin: 0
                  }}
                >

                  {

                    currentTime
                      .toLocaleTimeString()

                  }

                </h3>

                <p
                  style={{
                    margin: 0,

                    color:
                      '#64748b'
                  }}
                >

                  {

                    currentTime
                      .toDateString()

                  }

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* SUMMARY */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit,minmax(250px,1fr))',

            gap: '25px',

            marginBottom: '35px'
          }}
        >

          <FinanceCard
            title="Total Income"
            value={`₹${totalIncome}`}
            icon={
              <FaArrowTrendUp />
            }
            color="#10b981"
            cardStyle={cardStyle}
          />

          <FinanceCard
            title="Total Expense"
            value={`₹${totalExpense}`}
            icon={
              <FaArrowTrendDown />
            }
            color="#ef4444"
            cardStyle={cardStyle}
          />

          <FinanceCard
            title="Current Balance"
            value={`₹${totalBalance}`}
            icon={
              <FaWallet />
            }
            color="#3b82f6"
            cardStyle={cardStyle}
          />

          <FinanceCard
            title="Transactions"
            value={
              transactions.length
            }
            icon={
              <FaReceipt />
            }
            color="#8b5cf6"
            cardStyle={cardStyle}
          />

        </div>

        {/* CHART SECTION */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:

              window.innerWidth <= 1024

                ? '1fr'

                : '1fr 1fr',

            gap: '25px',

            marginBottom: '35px'
          }}
        >

          {/* PIE CHART */}

          <div style={cardStyle}>

            <h2>
              Income vs Expense
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={130}
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

          {/* BAR CHART */}

          <div style={cardStyle}>

            <h2>
              Category Analytics
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart
                data={categoryData}
              >

                <XAxis
                  dataKey="category"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  radius={[
                    12,
                    12,
                    0,
                    0
                  ]}
                >

                  {

                    categoryData.map(
                      (
                        entry,
                        index
                      ) => {

                        const colors = [

                          '#3b82f6',
                          '#10b981',
                          '#f59e0b',
                          '#ef4444',
                          '#8b5cf6',
                          '#06b6d4',
                          '#ec4899'

                        ];

                        return (

                          <Cell
                            key={index}
                            fill={
                              colors[
                                index %
                                colors.length
                              ]
                            }
                          />

                        );

                      }
                    )

                  }

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}

          style={{
            ...cardStyle,

            marginBottom:
              '35px'
          }}
        >

          <h2
            style={{
              marginBottom:
                '25px'
            }}
          >

            Add Transaction

          </h2>

          <div
            style={{
              display: 'grid',

              gridTemplateColumns:
                'repeat(auto-fit,minmax(250px,1fr))',

              gap: '20px'
            }}
          >

            <input
              type="text"
              name="title"
              placeholder="Transaction Title"
              value={formData.title}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              style={inputStyle}
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={inputStyle}
            >

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>

            </select>

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              style={inputStyle}
            />

          </div>

          <button
            type="submit"

            style={{
              marginTop: '20px',

              padding:
                '14px 24px',

              background:
                'linear-gradient(135deg,#3b82f6,#2563eb)',

              color: 'white',

              border: 'none',

              borderRadius:
                '16px',

              cursor: 'pointer',

              fontWeight:
                '600',

              fontSize: '15px'
            }}
          >

            Add Transaction

          </button>

        </form>

        {/* TRANSACTION LIST */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit,minmax(330px,1fr))',

            gap: '25px'
          }}
        >

          {

            transactions
              .slice()
              .reverse()
              .map((item) => (

                <div
                  key={item._id}

                  style={{

                    position: 'relative',

                    overflow: 'hidden',

                    borderRadius: '28px',

                    padding: '25px',

                    background:

                      darkMode

                        ? 'linear-gradient(145deg,#0f172a,#111827)'

                        : 'linear-gradient(145deg,#ffffff,#f8fafc)',

                    border:

                      darkMode

                        ? '1px solid rgba(255,255,255,0.08)'

                        : '1px solid rgba(0,0,0,0.05)',

                    boxShadow:

                      darkMode

                        ? '0px 10px 35px rgba(0,0,0,0.45)'

                        : '0px 10px 35px rgba(0,0,0,0.08)'
                  }}
                >

                  {/* GLOW */}

                  <div
                    style={{

                      position: 'absolute',

                      top: '-30px',

                      right: '-30px',

                      width: '120px',

                      height: '120px',

                      borderRadius: '50%',

                      background:

                        item.type ===
                        'income'

                          ? 'rgba(16,185,129,0.18)'

                          : 'rgba(239,68,68,0.18)'
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',

                      justifyContent:
                        'space-between',

                      alignItems:
                        'center',

                      marginBottom:
                        '20px'
                    }}
                  >

                    <h2
                      style={{
                        margin: 0
                      }}
                    >

                      {item.title}

                    </h2>

                    <div
                      style={{

                        padding:
                          '8px 14px',

                        borderRadius:
                          '30px',

                        background:

                          item.type ===
                          'income'

                            ? '#dcfce7'

                            : '#fee2e2',

                        color:

                          item.type ===
                          'income'

                            ? '#166534'

                            : '#991b1b',

                        fontWeight:
                          '600'
                      }}
                    >

                      {item.type}

                    </div>

                  </div>

                  <h1
                    style={{

                      color:

                        item.type ===
                        'income'

                          ? '#10b981'

                          : '#ef4444',

                      marginBottom:
                        '20px'
                    }}
                  >

                    ₹{item.amount}

                  </h1>

                  <div
                    style={{
                      display: 'flex',

                      justifyContent:
                        'space-between'
                    }}
                  >

                    <div>

                      <p
                        style={{
                          color:
                            '#64748b'
                        }}
                      >

                        Category

                      </p>

                      <strong>
                        {
                          item.category
                        }
                      </strong>

                    </div>

                    <div>

                      <p
                        style={{
                          color:
                            '#64748b'
                        }}
                      >

                        Status

                      </p>

                      <strong
                        style={{
                          color:
                            '#10b981'
                        }}
                      >

                        Completed

                      </strong>

                    </div>

                  </div>

                </div>

              ))

          }

        </div>

      </div>

    </div>

  );

}

// SUMMARY CARD

function FinanceCard({

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

          alignItems:
            'center'
        }}
      >

        <div>

          <p
            style={{
              color:
                '#64748b'
            }}
          >

            {title}

          </p>

          <h1
            style={{
              margin: 0
            }}
          >

            {value}

          </h1>

        </div>

        <div
          style={{
            width: '65px',

            height: '65px',

            borderRadius:
              '18px',

            background: color,

            display: 'flex',

            alignItems:
              'center',

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

// INPUT STYLE

const inputStyle = {

  width: '100%',

  padding: '15px',

  borderRadius: '14px',

  border:
    '1px solid #cbd5e1',

  outline: 'none',

  fontSize: '15px',

  boxSizing: 'border-box'
};

export default Finance;