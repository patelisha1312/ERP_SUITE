import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  FaChartPie,
  FaUsers,
  FaMoneyBillWave,
  FaBoxes,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaBars,
  FaClipboardCheck,
  FaFileAlt,
  FaCog,
  FaCalendarAlt
} from 'react-icons/fa';

import {
  useContext,
  useState
} from 'react';

import {
  ThemeContext
} from '../context/ThemeContext';

function Sidebar() {

  const location = useLocation();

  const navigate = useNavigate();

  const {
    darkMode,
    toggleTheme
  } = useContext(ThemeContext);

  const role =
    localStorage.getItem('role');

  const [isOpen, setIsOpen] =
    useState(false);

  const handleLogout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('role');

    navigate('/');

  };

  const menus = [

    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <FaChartPie />,
      roles: ['admin', 'manager', 'employee']
    },

    {
      title: 'Employees',
      path: '/employees',
      icon: <FaUsers />,
      roles: ['admin']
    },

    {
      title: 'Finance',
      path: '/finance',
      icon: <FaMoneyBillWave />,
      roles: ['admin', 'manager']
    },

    {
      title: 'Inventory',
      path: '/inventory',
      icon: <FaBoxes />,
      roles: ['admin', 'manager', 'employee']
    },

    {
      title: 'Attendance',
      path: '/attendance',
      icon: <FaClipboardCheck />,
      roles: ['admin', 'manager']
    },

    {
      title: 'Reports',
      path: '/reports',
      icon: <FaFileAlt />,
      roles: ['admin', 'manager']
    },

    {
      title: 'Leaves',
      path: '/leaves',
      icon: <FaCalendarAlt />,
      roles: ['admin', 'manager', 'employee']
    },

    {
      title: 'Settings',
      path: '/settings',
      icon: <FaCog />,
      roles: ['admin', 'manager', 'employee']
    }

  ];

  return (

    <>

      {/* MOBILE BUTTON */}

      <button
        onClick={() =>
          setIsOpen(!isOpen)
        }

        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          border: 'none',
          background:
            darkMode
              ? '#111827'
              : 'white',
          color:
            darkMode
              ? 'white'
              : '#0f172a',
          boxShadow:
            '0px 4px 20px rgba(0,0,0,0.08)',
          zIndex: 99999,
          cursor: 'pointer',
          display:
            window.innerWidth <= 768
              ? 'block'
              : 'none'
        }}
      >

        <FaBars />

      </button>

      {/* SIDEBAR */}

      <div
        style={{
          width: '270px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left:
            window.innerWidth <= 768
              ? (
                  isOpen
                    ? '0'
                    : '-100%'
                )
              : '0',
          transition: '0.3s ease',
          zIndex: 9999,

          background:
            darkMode
              ? '#020617'
              : '#ffffff',

          borderRight:
            darkMode
              ? '1px solid #1e293b'
              : '1px solid #e2e8f0',

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',

          padding: '28px 18px',
          boxSizing: 'border-box'
        }}
      >

        {/* TOP SECTION */}

        <div>

          {/* LOGO */}

          <div
            style={{
              marginBottom: '40px',
              paddingLeft: '10px'
            }}
          >

            <h1
              style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: '700',
                letterSpacing: '-1px',

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              AMX ERP

            </h1>

            <p
              style={{
                marginTop: '6px',
                fontSize: '14px',

                color:
                  darkMode
                    ? '#64748b'
                    : '#94a3b8'
              }}
            >

              Enterprise Platform

            </p>

          </div>

          {/* USER */}

          <div
            style={{
              marginBottom: '30px',

              padding: '14px 16px',

              borderRadius: '16px',

              background:
                darkMode
                  ? '#0f172a'
                  : '#f8fafc',

              border:
                darkMode
                  ? '1px solid #1e293b'
                  : '1px solid #e2e8f0'
            }}
          >

            <p
              style={{
                margin: 0,
                fontSize: '13px',

                color:
                  darkMode
                    ? '#64748b'
                    : '#94a3b8'
              }}
            >

              Logged in as

            </p>

            <h3
              style={{
                marginTop: '8px',
                marginBottom: 0,

                fontSize: '16px',
                fontWeight: '600',
                textTransform: 'capitalize',

                color:
                  darkMode
                    ? 'white'
                    : '#0f172a'
              }}
            >

              {role}

            </h3>

          </div>

          {/* MENUS */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >

            {

              menus
                .filter(item =>
                  item.roles.includes(role)
                )
                .map((item, index) => {

                  const active =
                    location.pathname === item.path;

                  return (

                    <Link
                      key={index}
                      to={item.path}

                      style={{
                        textDecoration: 'none'
                      }}
                    >

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',

                          padding: '14px 16px',

                          borderRadius: '14px',

                          transition: '0.2s ease',

                          background:
                            active
                              ? (
                                  darkMode
                                    ? '#111827'
                                    : '#f1f5f9'
                                )
                              : 'transparent',

                          color:
                            active
                              ? (
                                  darkMode
                                    ? 'white'
                                    : '#0f172a'
                                )
                              : (
                                  darkMode
                                    ? '#94a3b8'
                                    : '#475569'
                                ),

                          fontWeight:
                            active
                              ? '600'
                              : '500',

                          border:
                            active
                              ? (
                                  darkMode
                                    ? '1px solid #1e293b'
                                    : '1px solid #e2e8f0'
                                )
                              : '1px solid transparent'
                        }}
                      >

                        <span
                          style={{
                            fontSize: '16px'
                          }}
                        >

                          {item.icon}

                        </span>

                        {item.title}

                      </div>

                    </Link>

                  );

                })

            }

          </div>

        </div>

        {/* BOTTOM */}

        <div>

          {/* THEME */}

          <button
            onClick={toggleTheme}

            style={{
              width: '100%',

              padding: '14px',

              borderRadius: '14px',

              border:
                darkMode
                  ? '1px solid #1e293b'
                  : '1px solid #e2e8f0',

              background:
                darkMode
                  ? '#0f172a'
                  : '#f8fafc',

              color:
                darkMode
                  ? 'white'
                  : '#0f172a',

              cursor: 'pointer',

              marginBottom: '12px',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',

              fontWeight: '600',
              fontSize: '14px'
            }}
          >

            {

              darkMode
                ? <FaSun />
                : <FaMoon />

            }

            {

              darkMode
                ? 'Light Mode'
                : 'Dark Mode'

            }

          </button>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}

            style={{
              width: '100%',

              padding: '14px',

              borderRadius: '14px',

              border: 'none',

              background:
                darkMode
                  ? '#dc2626'
                  : '#ef4444',

              color: 'white',

              cursor: 'pointer',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',

              fontWeight: '600',
              fontSize: '14px'
            }}
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </>

  );

}

export default Sidebar;