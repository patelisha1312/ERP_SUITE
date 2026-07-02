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
  getAttendance,
  markAttendance
} from '../services/attendanceService';

import {
  ResponsiveContainer,
  
  Cell,
  Tooltip,
 
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';

import {
  FaSearch,
  FaCalendarAlt,
  FaChartLine,
  FaUsers,
  FaUserClock,
  FaBriefcase
} from 'react-icons/fa';

function Attendance() {

  const {
    darkMode
  } = useContext(ThemeContext);

  const [employees, setEmployees] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [search, setSearch] =
    useState('');

  const [currentTime, setCurrentTime] =
    useState(new Date());

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

  // FETCH ATTENDANCE

  const fetchAttendance =
    async () => {

      try {

        const response =
          await getAttendance();

        setAttendance(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchEmployees();

    fetchAttendance();

  }, []);

  // LIVE REFRESH

  useEffect(() => {

    const timer =
      setInterval(() => {

        fetchAttendance();

        setCurrentTime(
          new Date()
        );

      }, 5000);

    return () =>
      clearInterval(timer);

  }, []);

  // MARK ATTENDANCE

  const handleAttendance =
    async (
      employeeId,
      status
    ) => {

      try {

        const currentCheckIn =
          new Date()
            .toLocaleTimeString();

        await markAttendance({

          employeeId,

          status,

          checkIn:
            currentCheckIn

        });

        fetchAttendance();

      } catch (error) {

        console.log(error);

      }

    };

  // SEARCH FILTER

  const filteredEmployees =
    employees.filter(
      (emp) =>

        emp.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // COUNTS

  const presentCount =
    attendance.filter(
      item =>
        item.status ===
        'Present'
    ).length;

  const absentCount =
    attendance.filter(
      item =>
        item.status ===
        'Absent'
    ).length;

  const lateCount =
    attendance.filter(
      item =>
        item.status ===
        'Late'
    ).length;

  // ATTENDANCE RATE

  const attendanceRate =
    employees.length > 0

      ?

      Math.round(
        (
          presentCount /
          employees.length
        ) * 100
      )

      :

      0;

  // CHART DATA

  const chartData = [

    {
      name: 'Present',
      value: presentCount
    },

    {
      name: 'Absent',
      value: absentCount
    },

    {
      name: 'Late',
      value: lateCount
    }

  ];

  // COLORS

  const COLORS = [

    '#10b981',
    '#ef4444',
    '#f59e0b'

  ];

  // ANALYTICS CARDS

  const analyticsCards = [

    {
      title: 'Total Employees',
      value: employees.length,
      color: '#3b82f6',
      icon: <FaUsers />
    },

    {
      title: 'Attendance Rate',
      value: `${attendanceRate}%`,
      color: '#8b5cf6',
      icon: <FaChartLine />
    },

    {
      title: 'Late Employees',
      value: lateCount,
      color: '#f59e0b',
      icon: <FaUserClock />
    },

    {
      title: 'Departments',
      value:
        [
          ...new Set(
            employees.map(
              emp =>
                emp.department
            )
          )
        ].length,
      color: '#10b981',
      icon: <FaBriefcase />
    }

  ];

  // CARD STYLE

  const cardStyle = {

    background:

      darkMode

        ?

        'linear-gradient(145deg,#0f172a,#111827)'

        :

        'linear-gradient(145deg,#ffffff,#f8fafc)',

    borderRadius:
      '28px',

    padding: '25px',

    border:

      darkMode

        ?

        '1px solid rgba(255,255,255,0.08)'

        :

        '1px solid rgba(0,0,0,0.05)',

    boxShadow:

      darkMode

        ?

        '0px 10px 35px rgba(0,0,0,0.45)'

        :

        '0px 10px 35px rgba(0,0,0,0.08)'
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

              Attendance Dashboard

            </h1>

            <p
              style={{
                marginTop: '10px',

                color:
                  '#64748b'
              }}
            >

              Real-time employee attendance monitoring system

            </p>

          </div>

          {/* CLOCK */}

          <div
            style={{
              ...cardStyle,

              display: 'flex',

              alignItems:
                'center',

              gap: '15px'
            }}
          >

            <div
              style={{
                width: '60px',

                height: '60px',

                borderRadius:
                  '18px',

                background:
                  'linear-gradient(135deg,#3b82f6,#2563eb)',

                display: 'flex',

                alignItems:
                  'center',

                justifyContent:
                  'center',

                color: 'white',

                fontSize: '24px'
              }}
            >

              <FaCalendarAlt />

            </div>

            <div>

              <h3
                style={{
                  margin: 0,

                  color:

                    darkMode
                      ? 'white'
                      : '#0f172a'
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

        {/* ANALYTICS */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit,minmax(240px,1fr))',

            gap: '24px',

            marginBottom: '35px'
          }}
        >

          {

            analyticsCards.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}

                  style={{

                    ...cardStyle,

                    position:
                      'relative',

                    overflow:
                      'hidden'
                  }}
                >

                  <div
                    style={{

                      position:
                        'absolute',

                      top: '-20px',

                      right: '-20px',

                      width: '110px',

                      height: '110px',

                      borderRadius:
                        '50%',

                      background:
                        `${item.color}20`
                    }}
                  />

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

                        {item.title}

                      </p>

                      <h1
                        style={{
                          margin: 0,

                          color:

                            darkMode
                              ? 'white'
                              : '#0f172a'
                        }}
                      >

                        {item.value}

                      </h1>

                    </div>

                    <div
                      style={{
                        width: '65px',

                        height: '65px',

                        borderRadius:
                          '18px',

                        background:
                          item.color,

                        display: 'flex',

                        alignItems:
                          'center',

                        justifyContent:
                          'center',

                        color: 'white',

                        fontSize: '24px'
                      }}
                    >

                      {item.icon}

                    </div>

                  </div>

                </div>

              )
            )

          }

        </div>

        {/* CHARTS */}

        <div
          style={{
            display:'block',

            gridTemplateColumns:

              window.innerWidth <= 1050

                ? '1fr'

                : '1.2fr 1fr',

            gap: '25px',

            marginBottom: '35px'
          }}
        >

          {/* BAR CHART */}

          <div style={cardStyle}>

            <h2
              style={{
    display: 'grid',

    gridTemplateColumns:

      window.innerWidth <= 1050

        ? '1fr'

        : '1.2fr 1fr',

    gap: '30px',

    marginBottom: '35px'
  }}
            >

              Attendance Analytics

            </h2>

            <ResponsiveContainer
              width="90%"
              height={500}
            >

              <BarChart
                data={chartData}
              >

                <XAxis
                  dataKey="name"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  radius={[
                    12,
                    12,
                    0,
                    0
                  ]}
                >

                  {

                    chartData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />

                      )
                    )

                  }

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>


        </div>

        {/* SEARCH */}

        <div
          style={{
            ...cardStyle,

            marginBottom:
              '30px'
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

        {/* EMPLOYEE TABLE */}

        <div style={cardStyle}>

          <h2
            style={{
              marginBottom:
                '10px',

              color:

                darkMode
                  ? 'white'
                  : '#0f172a'
            }}
          >

            Employee Attendance

          </h2>

          <p
            style={{
              color:
                '#64748b',

              marginBottom:
                '25px'
            }}
          >

            Real-time attendance tracking and management

          </p>

          <div
            style={{
              overflowX:
                'auto'
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
                    Employee
                  </th>

                  <th style={tableHead}>
                    Department
                  </th>

                  <th style={tableHead}>
                    Status
                  </th>

                  <th style={tableHead}>
                    Check In
                  </th>

                  <th style={tableHead}>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredEmployees.map(
                    (employee) => {

                      const employeeAttendance =
                        attendance.find(
                          item =>

                            item.employeeId?._id ===
                            employee._id
                        );

                      return (

                        <tr
                          key={
                            employee._id
                          }
                        >

                          <td style={tableData}>
                            {employee.name}
                          </td>

                          <td style={tableData}>
                            {
                              employee.department
                            }
                          </td>

                          <td style={tableData}>

                            {

                              employeeAttendance ? (

                                <span
                                  style={{

                                    padding:
                                      '8px 14px',

                                    borderRadius:
                                      '30px',

                                    background:

                                      employeeAttendance.status ===
                                      'Present'

                                        ? '#dcfce7'

                                        : employeeAttendance.status ===
                                          'Absent'

                                        ? '#fee2e2'

                                        : '#fef3c7',

                                    color:

                                      employeeAttendance.status ===
                                      'Present'

                                        ? '#166534'

                                        : employeeAttendance.status ===
                                          'Absent'

                                        ? '#991b1b'

                                        : '#92400e',

                                    fontWeight:
                                      '600'
                                  }}
                                >

                                  {

                                    employeeAttendance.status

                                  }

                                </span>

                              ) : (

                                'Not Marked'

                              )

                            }

                          </td>

                          <td style={tableData}>

                            {

                              employeeAttendance
                                ?.checkIn

                                ||

                              '--'

                            }

                          </td>

                          <td style={tableData}>

                            <div
                              style={{
                                display:
                                  'flex',

                                gap: '10px',

                                flexWrap:
                                  'wrap'
                              }}
                            >

                              <button
                                type="button"

                                onClick={() =>
                                  handleAttendance(
                                    employee._id,
                                    'Present'
                                  )
                                }

                                style={presentBtn}
                              >

                                Present

                              </button>

                              <button
                                type="button"

                                onClick={() =>
                                  handleAttendance(
                                    employee._id,
                                    'Absent'
                                  )
                                }

                                style={absentBtn}
                              >

                                Absent

                              </button>

                              <button
                                type="button"

                                onClick={() =>
                                  handleAttendance(
                                    employee._id,
                                    'Late'
                                  )
                                }

                                style={lateBtn}
                              >

                                Late

                              </button>

                            </div>

                          </td>

                        </tr>

                      );

                    }
                  )

                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

// TABLE STYLES

const tableHead = {

  padding: '18px',

  textAlign: 'left',

  color: '#64748b',

  fontWeight: '600'
};

const tableData = {

  padding: '18px',

  borderBottom:
    '1px solid #e2e8f0'
};

// BUTTONS

const presentBtn = {

  padding: '10px 14px',

  border: 'none',

  borderRadius: '10px',

  background: '#10b981',

  color: 'white',

  cursor: 'pointer'
};

const absentBtn = {

  padding: '10px 14px',

  border: 'none',

  borderRadius: '10px',

  background: '#ef4444',

  color: 'white',

  cursor: 'pointer'
};

const lateBtn = {

  padding: '10px 14px',

  border: 'none',

  borderRadius: '10px',

  background: '#f59e0b',

  color: 'white',

  cursor: 'pointer'
};

export default Attendance;