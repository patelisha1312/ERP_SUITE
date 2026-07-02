import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    // Remove token
    localStorage.removeItem('token');

    // Redirect to login
    navigate('/');

  };

  return (

    <nav
      style={{
        padding: '15px',
        background: '#1e293b',
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}
    >

      <Link
        to="/dashboard"
        style={{
          color: 'white',
          textDecoration: 'none'
        }}
      >
        Dashboard
      </Link>

      <Link
        to="/register"
        style={{
          color: 'white',
          textDecoration: 'none'
        }}
      >
        Register
      </Link>

      <button
        onClick={handleLogout}
        style={{
          padding: '8px 15px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>

    </nav>

  );

}

export default Navbar;