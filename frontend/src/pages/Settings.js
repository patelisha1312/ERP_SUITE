import {
  useState,
  useContext
} from 'react';

import Sidebar from '../components/Sidebar';

import {
  ThemeContext
} from '../context/ThemeContext';

import {
  FaMoon,
  FaBell,
  FaLock,
  FaUserShield,
  FaDatabase,
  FaGlobe,
  FaSave,
  FaBuilding
} from 'react-icons/fa';

function Settings() {

  const {
    darkMode,
    toggleTheme
  } = useContext(ThemeContext);

  const [settings, setSettings] =
    useState({

      companyName:
        'AMX ERP Solutions',

      emailNotifications:
        true,

      smsNotifications:
        false,

      autoBackup:
        true,

      twoFactor:
        false,

      language:
        'English',

      timezone:
        'Asia/Kolkata'

    });

  // HANDLE CHANGE

  const handleToggle =
    (field) => {

      setSettings({

        ...settings,

        [field]:
          !settings[field]

      });

    };

  const handleInput =
    (e) => {

      setSettings({

        ...settings,

        [e.target.name]:
          e.target.value

      });

    };

  // SAVE SETTINGS

  const saveSettings =
    () => {

      localStorage.setItem(
        'erpSettings',

        JSON.stringify(
          settings
        )
      );

      alert(
        'Settings Saved Successfully'
      );

    };

  // CARD STYLE

  const cardStyle = {

    background:
      darkMode
        ? '#0f172a'
        : 'white',

    borderRadius: '24px',

    padding: '28px',

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
            marginBottom: '35px'
          }}
        >

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

            ERP Settings

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

            Manage your ERP platform preferences and security

          </p>

        </div>

        {/* SETTINGS GRID */}

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fit,minmax(350px,1fr))',

            gap: '25px'
          }}
        >

          {/* COMPANY SETTINGS */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',

                alignItems: 'center',

                gap: '12px',

                marginBottom: '25px'
              }}
            >

              <FaBuilding
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

                Company Settings

              </h2>

            </div>

            <label
              style={labelStyle}
            >

              Company Name

            </label>

            <input
              type="text"

              name="companyName"

              value={
                settings.companyName
              }

              onChange={
                handleInput
              }

              style={inputStyle}
            />

            <label
              style={labelStyle}
            >

              Language

            </label>

            <select
              name="language"

              value={
                settings.language
              }

              onChange={
                handleInput
              }

              style={inputStyle}
            >

              <option>
                English
              </option>

              <option>
                Hindi
              </option>

              <option>
                Gujarati
              </option>

            </select>

            <label
              style={labelStyle}
            >

              Timezone

            </label>

            <select
              name="timezone"

              value={
                settings.timezone
              }

              onChange={
                handleInput
              }

              style={inputStyle}
            >

              <option>
                Asia/Kolkata
              </option>

              <option>
                UTC
              </option>

              <option>
                America/New_York
              </option>

            </select>

          </div>

          {/* APPEARANCE */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',

                alignItems: 'center',

                gap: '12px',

                marginBottom: '25px'
              }}
            >

              <FaMoon
                color="#8b5cf6"
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

                Appearance

              </h2>

            </div>

            <SettingRow
              title="Dark Mode"
              description="Enable modern dark theme"
              action={

                <button
                  onClick={
                    toggleTheme
                  }

                  style={{
                    ...toggleBtn,

                    background:
                      darkMode
                        ? '#10b981'
                        : '#e2e8f0'
                  }}
                >

                  {

                    darkMode
                      ? 'ON'
                      : 'OFF'

                  }

                </button>

              }
            />

          </div>

          {/* NOTIFICATIONS */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',

                alignItems: 'center',

                gap: '12px',

                marginBottom: '25px'
              }}
            >

              <FaBell
                color="#f59e0b"
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

                Notifications

              </h2>

            </div>

            <SettingRow
              title="Email Notifications"
              description="Receive ERP alerts by email"

              action={

                <button
                  onClick={() =>
                    handleToggle(
                      'emailNotifications'
                    )
                  }

                  style={{
                    ...toggleBtn,

                    background:

                      settings.emailNotifications

                        ? '#10b981'

                        : '#e2e8f0'
                  }}
                >

                  {

                    settings.emailNotifications

                      ? 'ON'

                      : 'OFF'

                  }

                </button>

              }
            />

            <SettingRow
              title="SMS Notifications"
              description="Receive alerts via SMS"

              action={

                <button
                  onClick={() =>
                    handleToggle(
                      'smsNotifications'
                    )
                  }

                  style={{
                    ...toggleBtn,

                    background:

                      settings.smsNotifications

                        ? '#10b981'

                        : '#e2e8f0'
                  }}
                >

                  {

                    settings.smsNotifications

                      ? 'ON'

                      : 'OFF'

                  }

                </button>

              }
            />

          </div>

          {/* SECURITY */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',

                alignItems: 'center',

                gap: '12px',

                marginBottom: '25px'
              }}
            >

              <FaLock
                color="#ef4444"
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

                Security

              </h2>

            </div>

            <SettingRow
              title="Two Factor Authentication"
              description="Extra login protection"

              action={

                <button
                  onClick={() =>
                    handleToggle(
                      'twoFactor'
                    )
                  }

                  style={{
                    ...toggleBtn,

                    background:

                      settings.twoFactor

                        ? '#10b981'

                        : '#e2e8f0'
                  }}
                >

                  {

                    settings.twoFactor

                      ? 'ON'

                      : 'OFF'

                  }

                </button>

              }
            />

          </div>

          {/* BACKUP */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',

                alignItems: 'center',

                gap: '12px',

                marginBottom: '25px'
              }}
            >

              <FaDatabase
                color="#06b6d4"
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

                Backup & Storage

              </h2>

            </div>

            <SettingRow
              title="Automatic Backup"
              description="Daily ERP database backup"

              action={

                <button
                  onClick={() =>
                    handleToggle(
                      'autoBackup'
                    )
                  }

                  style={{
                    ...toggleBtn,

                    background:

                      settings.autoBackup

                        ? '#10b981'

                        : '#e2e8f0'
                  }}
                >

                  {

                    settings.autoBackup

                      ? 'ON'

                      : 'OFF'

                  }

                </button>

              }
            />

          </div>

          {/* ADMIN */}

          <div style={cardStyle}>

            <div
              style={{
                display: 'flex',

                alignItems: 'center',

                gap: '12px',

                marginBottom: '25px'
              }}
            >

              <FaUserShield
                color="#8b5cf6"
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

                Admin Controls

              </h2>

            </div>

            <SettingRow
              title="ERP Access Level"
              description="Full administrator access"

              action={

                <span
                  style={{
                    padding:
                      '8px 14px',

                    borderRadius:
                      '12px',

                    background:
                      '#dcfce7',

                    color:
                      '#166534',

                    fontWeight:
                      '600'
                  }}
                >

                  Admin

                </span>

              }
            />

            <SettingRow
              title="Global Access"
              description="Connected enterprise modules"

              action={

                <FaGlobe
                  color="#3b82f6"
                  size={22}
                />

              }
            />

          </div>

        </div>

        {/* SAVE BUTTON */}

        <div
          style={{
            marginTop: '35px'
          }}
        >

          <button
            onClick={
              saveSettings
            }

            style={{
              padding:
                '16px 28px',

              border: 'none',

              borderRadius:
                '16px',

              background:
                'linear-gradient(135deg,#3b82f6,#2563eb)',

              color: 'white',

              fontWeight:
                '600',

              cursor: 'pointer',

              fontSize: '16px',

              display: 'flex',

              alignItems:
                'center',

              gap: '12px'
            }}
          >

            <FaSave />

            Save Settings

          </button>

        </div>

      </div>

    </div>

  );

}

// SETTING ROW

function SettingRow({

  title,
  description,
  action

}) {

  return (

    <div
      style={{
        display: 'flex',

        justifyContent:
          'space-between',

        alignItems: 'center',

        padding:
          '18px 0',

        borderBottom:
          '1px solid #e2e8f0'
      }}
    >

      <div>

        <h4
          style={{
            margin: 0,

            marginBottom:
              '6px'
          }}
        >

          {title}

        </h4>

        <p
          style={{
            margin: 0,

            color:
              '#64748b',

            fontSize:
              '14px'
          }}
        >

          {description}

        </p>

      </div>

      {action}

    </div>

  );

}

// STYLES

const labelStyle = {

  display: 'block',

  marginBottom: '10px',

  marginTop: '20px',

  color: '#64748b',

  fontWeight: '600'
};

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

const toggleBtn = {

  padding:
    '10px 18px',

  border: 'none',

  borderRadius:
    '12px',

  color: 'white',

  fontWeight: '600',

  cursor: 'pointer',

  minWidth: '75px'
};

export default Settings;