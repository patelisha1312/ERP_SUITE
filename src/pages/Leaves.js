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
  FaCalendarCheck,
  FaUserClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaPlus
} from 'react-icons/fa';

function Leaves() {

  const {
    darkMode
  } = useContext(ThemeContext);

  const [employees, setEmployees] =
    useState([]);

  const [leaves, setLeaves] =
    useState([]);

  const [search, setSearch] =
    useState('');

  const [formData, setFormData] =
    useState({
      employeeName: '',
      leaveType: 'Sick Leave',
      fromDate: '',
      toDate: '',
      reason: ''
    });

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

    // LOCAL STORAGE LEAVES

    const savedLeaves =
      JSON.parse(
        localStorage.getItem(
          'erpLeaves'
        )
      ) || [];

    setLeaves(savedLeaves);

  }, []);

  // SAVE LEAVES

  const saveLeaves =
    (updatedLeaves) => {

      setLeaves(
        updatedLeaves
      );

      localStorage.setItem(
        'erpLeaves',
        JSON.stringify(
          updatedLeaves
        )
      );

    };

  // HANDLE INPUT

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  // APPLY LEAVE

  const handleSubmit =
    (e) => {

      e.preventDefault();

      const newLeave = {

        id: Date.now(),

        ...formData,

        status: 'Pending',

        appliedAt:
          new Date()
          .toLocaleString()

      };

      const updatedLeaves = [

        newLeave,

        ...leaves

      ];

      saveLeaves(
        updatedLeaves
      );

      setFormData({

        employeeName: '',
        leaveType:
          'Sick Leave',

        fromDate: '',

        toDate: '',

        reason: ''

      });

    };

  // APPROVE / REJECT

  const updateStatus =
    (id, status) => {

      const updatedLeaves =
        leaves.map(
          (leave) =>

            leave.id === id

              ? {
                  ...leave,
                  status
                }

              : leave
        );

      saveLeaves(
        updatedLeaves
      );

    };

  // FILTER

  const filteredLeaves =
    leaves.filter(
      (leave) =>

        leave.employeeName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // COUNTS

  const approvedCount =
    leaves.filter(
      item =>
        item.status ===
        'Approved'
    ).length;

  const rejectedCount =
    leaves.filter(
      item =>
        item.status ===
        'Rejected'
    ).length;

  const pendingCount =
    leaves.filter(
      item =>
        item.status ===
        'Pending'
    ).length;

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

              Leave Management

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

              Real-time employee leave tracking system

            </p>

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
            title="Pending Leaves"
            value={pendingCount}
            icon={<FaUserClock />}
            color="#f59e0b"
            cardStyle={cardStyle}
          />

          <SummaryCard
            title="Approved"
            value={approvedCount}
            icon={<FaCheckCircle />}
            color="#10b981"
            cardStyle={cardStyle}
          />

          <SummaryCard
            title="Rejected"
            value={rejectedCount}
            icon={<FaTimesCircle />}
            color="#ef4444"
            cardStyle={cardStyle}
          />

          <SummaryCard
            title="Total Requests"
            value={leaves.length}
            icon={<FaCalendarCheck />}
            color="#3b82f6"
            cardStyle={cardStyle}
          />

        </div>

        {/* APPLY LEAVE FORM */}

        <div
          style={{
            ...cardStyle,

            marginBottom: '35px'
          }}
        >

          <div
            style={{
              display: 'flex',

              alignItems: 'center',

              gap: '12px',

              marginBottom: '25px'
            }}
          >

            <FaPlus
              color="#3b82f6"
            />

            <h2
              style={{
                margin: 0,

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              Apply Leave

            </h2>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
          >

            <div
              style={{
                display: 'grid',

                gridTemplateColumns:
                  'repeat(auto-fit,minmax(250px,1fr))',

                gap: '20px'
              }}
            >

              {/* EMPLOYEE */}

              <select
                name="employeeName"

                value={
                  formData.employeeName
                }

                onChange={
                  handleChange
                }

                required

                style={inputStyle}
              >

                <option value="">
                  Select Employee
                </option>

                {

                  employees.map(
                    (emp) => (

                      <option
                        key={emp._id}

                        value={
                          emp.name
                        }
                      >

                        {emp.name}

                      </option>

                    )
                  )

                }

              </select>

              {/* LEAVE TYPE */}

              <select
                name="leaveType"

                value={
                  formData.leaveType
                }

                onChange={
                  handleChange
                }

                style={inputStyle}
              >

                <option>
                  Sick Leave
                </option>

                <option>
                  Casual Leave
                </option>

                <option>
                  Emergency Leave
                </option>

                <option>
                  Vacation
                </option>

              </select>

              {/* FROM */}

              <input
                type="date"

                name="fromDate"

                value={
                  formData.fromDate
                }

                onChange={
                  handleChange
                }

                required

                style={inputStyle}
              />

              {/* TO */}

              <input
                type="date"

                name="toDate"

                value={
                  formData.toDate
                }

                onChange={
                  handleChange
                }

                required

                style={inputStyle}
              />

            </div>

            {/* REASON */}

            <textarea
              name="reason"

              placeholder="Leave Reason"

              value={
                formData.reason
              }

              onChange={
                handleChange
              }

              required

              style={{
                ...inputStyle,

                marginTop: '20px',

                minHeight: '120px'
              }}
            />

            {/* BUTTON */}

            <button
              type="submit"

              style={{
                marginTop: '20px',

                padding:
                  '14px 24px',

                border: 'none',

                borderRadius:
                  '14px',

                background:
                  'linear-gradient(135deg,#3b82f6,#2563eb)',

                color: 'white',

                cursor: 'pointer',

                fontWeight:
                  '600',

                fontSize: '15px'
              }}
            >

              Apply Leave

            </button>

          </form>

        </div>

        {/* SEARCH */}

        <div
          style={{
            ...cardStyle,

            marginBottom: '30px'
          }}
        >

          <div
            style={{
              display: 'flex',

              alignItems: 'center',

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
                  'transparent'
              }}
            />

          </div>

        </div>

        {/* TABLE */}

        <div style={cardStyle}>

          <h2
            style={{
              marginBottom: '25px',

              color:
                darkMode
                  ? 'white'
                  : '#0f172a'
            }}
          >

            Leave Requests

          </h2>

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
                    Employee
                  </th>

                  <th style={tableHead}>
                    Type
                  </th>

                  <th style={tableHead}>
                    From
                  </th>

                  <th style={tableHead}>
                    To
                  </th>

                  <th style={tableHead}>
                    Status
                  </th>

                  <th style={tableHead}>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredLeaves.map(
                    (leave) => (

                      <tr
                        key={leave.id}
                      >

                        <td style={tableData}>
                          {
                            leave.employeeName
                          }
                        </td>

                        <td style={tableData}>
                          {
                            leave.leaveType
                          }
                        </td>

                        <td style={tableData}>
                          {
                            leave.fromDate
                          }
                        </td>

                        <td style={tableData}>
                          {
                            leave.toDate
                          }
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

                                leave.status ===
                                'Approved'

                                  ? '#dcfce7'

                                  : leave.status ===
                                    'Rejected'

                                  ? '#fee2e2'

                                  : '#fef3c7',

                              color:

                                leave.status ===
                                'Approved'

                                  ? '#166534'

                                  : leave.status ===
                                    'Rejected'

                                  ? '#991b1b'

                                  : '#92400e'

                            }}
                          >

                            {leave.status}

                          </span>

                        </td>

                        <td style={tableData}>

                          <div
                            style={{
                              display: 'flex',

                              gap: '10px',

                              flexWrap:
                                'wrap'
                            }}
                          >

                            <button
                              onClick={() =>
                                updateStatus(
                                  leave.id,
                                  'Approved'
                                )
                              }

                              style={
                                approveBtn
                              }
                            >

                              Approve

                            </button>

                            <button
                              onClick={() =>
                                updateStatus(
                                  leave.id,
                                  'Rejected'
                                )
                              }

                              style={
                                rejectBtn
                              }
                            >

                              Reject

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
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
                '#64748b'
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

// STYLES

const inputStyle = {

  width: '100%',

  padding: '16px',

  borderRadius: '14px',

  border:
    '1px solid #cbd5e1',

  outline: 'none',

  fontSize: '15px',

  boxSizing: 'border-box'
};

const tableHead = {

  padding: '16px',

  textAlign: 'left',

  color: '#64748b',

  borderBottom:
    '1px solid #e2e8f0'
};

const tableData = {

  padding: '16px',

  borderBottom:
    '1px solid #e2e8f0'
};

const approveBtn = {

  padding: '10px 14px',

  border: 'none',

  borderRadius: '10px',

  background: '#10b981',

  color: 'white',

  cursor: 'pointer'
};

const rejectBtn = {

  padding: '10px 14px',

  border: 'none',

  borderRadius: '10px',

  background: '#ef4444',

  color: 'white',

  cursor: 'pointer'
};

export default Leaves;