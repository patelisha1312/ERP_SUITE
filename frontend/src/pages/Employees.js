import {
  useEffect,
  useState,
  useContext
} from 'react';

import Sidebar from '../components/Sidebar';

import { toast } from 'react-toastify';

import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable';

import {
  ThemeContext
} from '../context/ThemeContext';

import {
  addEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee
} from '../services/employeeService';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

import {
  FaUsers,
  FaUserTie,
  FaMoneyBillWave,
  FaBuilding,
  FaSearch,
  FaClock
} from 'react-icons/fa';

function Employees() {

  const [employees, setEmployees] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  const [search, setSearch] =
    useState('');

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      department: '',
      salary: ''
    });

  const {
    darkMode
  } = useContext(ThemeContext);

  // FETCH EMPLOYEES

  const fetchEmployees =
    async () => {

      try {

        const response =
          await getEmployees();

        setEmployees(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchEmployees();

  }, []);

  // REAL TIME CLOCK

  useEffect(() => {

    const timer =
      setInterval(() => {

        setCurrentTime(
          new Date()
        );

        fetchEmployees();

      }, 5000);

    return () =>
      clearInterval(timer);

  }, []);

  // SEARCH

  const filteredEmployees =
    employees.filter((emp) => {

      return (
        emp.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    });

  // INPUT CHANGE

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

        if (editId) {

          await updateEmployee(
            editId,
            formData
          );

          toast.success(
            'Employee Updated'
          );

          setEditId(null);

        }

        else {

          await addEmployee(
            formData
          );

          toast.success(
            'Employee Added'
          );

        }

        fetchEmployees();

        setFormData({

          name: '',
          email: '',
          department: '',
          salary: ''

        });

      } catch (error) {

        console.log(error);

      }

    };

  // DELETE

  const handleDelete =
    async (id) => {

      try {

        await deleteEmployee(id);

        toast.error(
          'Employee Deleted'
        );

        fetchEmployees();

      } catch (error) {

        console.log(error);

      }

    };

  // EDIT

  const handleEdit =
    (employee) => {

      setEditId(employee._id);

      setFormData({

        name:
          employee.name,

        email:
          employee.email,

        department:
          employee.department,

        salary:
          employee.salary

      });

    };

  // PDF

  const downloadPDF =
    () => {

      const doc =
        new jsPDF();

      doc.text(
        'AMX ERP Employee Report',
        14,
        15
      );

      autoTable(doc, {

        startY: 25,

        head: [[
          'Name',
          'Email',
          'Department',
          'Salary'
        ]],

        body:
          employees.map(
            (emp) => [

              emp.name,
              emp.email,
              emp.department,
              emp.salary

            ]
          )

      });

      doc.save(
        'employee-report.pdf'
      );

    };

  // TOTAL SALARY

  const totalSalary =
    employees.reduce(

      (acc, emp) =>

        acc +
        Number(emp.salary),

      0
    );

  // DEPARTMENT DATA

  const departmentMap = {};

  employees.forEach((emp) => {

    if (
      departmentMap[
        emp.department
      ]
    ) {

      departmentMap[
        emp.department
      ] += 1;

    }

    else {

      departmentMap[
        emp.department
      ] = 1;

    }

  });

  const departmentData =
    Object.keys(
      departmentMap
    ).map((dept) => ({

      name: dept,

      value:
        departmentMap[
          dept
        ]

    }));

  // CARD STYLE

  const cardStyle = {

    background:
      darkMode
        ? '#0f172a'
        : 'white',

    borderRadius: '24px',

    padding: '25px',

    border:
      darkMode
        ? '1px solid #1e293b'
        : '1px solid #e2e8f0',

    boxShadow:
      darkMode
        ? 'none'
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

              Employee Management

            </h1>

            <p
              style={{
                marginTop: '10px',

                color:
                  '#64748b',

                fontSize: '16px'
              }}
            >

              Real-time enterprise employee analytics dashboard

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
                color="#3b82f6"
                size={24}
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
              'repeat(auto-fit,minmax(240px,1fr))',

            gap: '25px',

            marginBottom: '35px'
          }}
        >

          <SummaryCard
            title="Employees"
            value={
              employees.length
            }
            icon={<FaUsers />}
            color="#3b82f6"
            cardStyle={cardStyle}
          />

          <SummaryCard
            title="Departments"
            value={
              departmentData.length
            }
            icon={<FaBuilding />}
            color="#10b981"
            cardStyle={cardStyle}
          />

          <SummaryCard
            title="Salary Expense"
            value={`₹${totalSalary}`}
            icon={
              <FaMoneyBillWave />
            }
            color="#f59e0b"
            cardStyle={cardStyle}
          />

          <SummaryCard
            title="Active Staff"
            value={
              employees.length
            }
            icon={<FaUserTie />}
            color="#8b5cf6"
            cardStyle={cardStyle}
          />

        </div>

        {/* ANALYTICS */}

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

              alignItems:
                'center',

              marginBottom:
                '25px'
            }}
          >

            <div>

              <h2
                style={{
                  margin: 0
                }}
              >

                Department Analytics

              </h2>

              <p
                style={{
                  color:
                    '#64748b'
                }}
              >

                Real-time department employee distribution

              </p>

            </div>

            <div
              style={{
                background:
                  '#dbeafe',

                color:
                  '#2563eb',

                padding:
                  '10px 16px',

                borderRadius:
                  '14px',

                fontWeight:
                  '600'
              }}
            >

              Live Data

            </div>

          </div>

          <ResponsiveContainer
            width="100%"
            height={420}
          >

            <BarChart
              data={
                departmentData
              }
            >

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
  dataKey="value"
  radius={[
    14,
    14,
    0,
    0
  ]}
>

  {

    departmentData.map(
      (entry, index) => {

        const colors = [

          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#06b6d4',
          '#ec4899',
          '#14b8a6'

        ];

        return (

          <Cell
            key={`cell-${index}`}
            fill={
              colors[
                index % colors.length
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

        {/* SEARCH */}

        <div
          style={{
            ...cardStyle,

            marginBottom:
              '25px'
          }}
        >

          <div
            style={{
              display: 'flex',

              alignItems:
                'center',

              gap: '12px'
            }}
          >

            <FaSearch
              color="#3b82f6"
            />

            <input
              type="text"

              placeholder="Search Employee..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              style={{
                width: '100%',

                padding: '14px',

                border: 'none',

                outline: 'none',

                background:
                  'transparent',

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            />

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
              name="name"
              placeholder="Employee Name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Employee Email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="number"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
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

            {

              editId

                ? 'Update Employee'

                : 'Add Employee'

            }

          </button>

        </form>

        {/* PDF */}

        <button
          onClick={downloadPDF}

          style={{
            padding:
              '14px 24px',

            background:
              'linear-gradient(135deg,#10b981,#059669)',

            color: 'white',

            border: 'none',

            borderRadius:
              '16px',

            cursor: 'pointer',

            marginBottom:
              '30px',

            fontWeight:
              '600'
          }}
        >

          Export PDF Report

        </button>

        {/* EMPLOYEE LIST */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit,minmax(340px,1fr))',

            gap: '30px'
          }}
        >

          {

            filteredEmployees.map(
              (emp, index) => (

                <div
                  key={emp._id}

                  style={{

                    position: 'relative',

                    overflow: 'hidden',

                    borderRadius: '28px',

                    padding: '28px',

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

                        : '0px 10px 35px rgba(0,0,0,0.08)',

                    transition: '0.4s'
                  }}
                >

                  {/* GLOW */}

                  <div
                    style={{

                      position: 'absolute',

                      top: '-40px',

                      right: '-40px',

                      width: '130px',

                      height: '130px',

                      borderRadius: '50%',

                      background:
                        'rgba(59,130,246,0.15)'
                    }}
                  />

                  {/* PROFILE */}

                  <div
                    style={{
                      display: 'flex',

                      alignItems: 'center',

                      gap: '18px',

                      marginBottom: '25px'
                    }}
                  >

                    <div
                      style={{

                        width: '72px',

                        height: '72px',

                        borderRadius: '22px',

                        background:
                          'linear-gradient(135deg,#3b82f6,#2563eb)',

                        display: 'flex',

                        alignItems: 'center',

                        justifyContent: 'center',

                        color: 'white',

                        fontSize: '28px',

                        fontWeight: 'bold'
                      }}
                    >

                      {

                        emp.name
                          ?.charAt(0)
                          ?.toUpperCase()

                      }

                    </div>

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

                        {emp.name}

                      </h2>

                      <p
                        style={{
                          marginTop: '6px',

                          color:
                            '#64748b'
                        }}
                      >

                        {emp.department}

                      </p>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div
                    style={{
                      display: 'flex',

                      justifyContent:
                        'space-between',

                      marginBottom: '25px'
                    }}
                  >

                    <span
                      style={{

                        padding:
                          '8px 16px',

                        borderRadius:
                          '30px',

                        background:
                          '#dcfce7',

                        color:
                          '#166534',

                        fontWeight:
                          '600'
                      }}
                    >

                      ● Active

                    </span>

                    <span
                      style={{
                        color:
                          '#64748b'
                      }}
                    >

                      ID #{index + 1}

                    </span>

                  </div>

                  {/* INFO */}

                  <div
                    style={{
                      display: 'grid',

                      gridTemplateColumns:
                        '1fr 1fr',

                      gap: '16px',

                      marginBottom: '25px'
                    }}
                  >

                    <div
                      style={{

                        padding: '16px',

                        borderRadius: '18px',

                        background:

                          darkMode

                            ? '#111827'

                            : '#f8fafc'
                      }}
                    >

                      <p
                        style={{
                          margin: 0,

                          fontSize: '13px',

                          color:
                            '#64748b'
                        }}
                      >

                        Email

                      </p>

                      <h4
                        style={{

                          marginTop: '8px',

                          color:

                            darkMode
                              ? 'white'
                              : '#0f172a'
                        }}
                      >

                        {emp.email}

                      </h4>

                    </div>

                    <div
                      style={{

                        padding: '16px',

                        borderRadius: '18px',

                        background:

                          darkMode

                            ? '#111827'

                            : '#f8fafc'
                      }}
                    >

                      <p
                        style={{
                          margin: 0,

                          fontSize: '13px',

                          color:
                            '#64748b'
                        }}
                      >

                        Salary

                      </p>

                      <h3
                        style={{
                          marginTop: '8px',

                          color:
                            '#10b981'
                        }}
                      >

                        ₹{emp.salary}

                      </h3>

                    </div>

                  </div>

                  

                  {/* BUTTONS */}

                  <div
                    style={{
                      display: 'flex',

                      gap: '14px'
                    }}
                  >

                    <button
                      onClick={() =>
                        handleEdit(emp)
                      }

                      style={{
                        flex: 1,

                        padding:
                          '14px',

                        border: 'none',

                        borderRadius:
                          '16px',

                        background:
                          'linear-gradient(135deg,#3b82f6,#2563eb)',

                        color: 'white',

                        cursor:
                          'pointer',

                        fontWeight:
                          '600'
                      }}
                    >

                      Edit

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          emp._id
                        )
                      }

                      style={{
                        flex: 1,

                        padding:
                          '14px',

                        border: 'none',

                        borderRadius:
                          '16px',

                        background:
                          'linear-gradient(135deg,#ef4444,#dc2626)',

                        color: 'white',

                        cursor:
                          'pointer',

                        fontWeight:
                          '600'
                      }}
                    >

                      Remove

                    </button>

                  </div>

                </div>

              )
            )

          }

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

export default Employees;