import { useState } from 'react';
import { loginUser } from '../services/authService';

import '../styles/Login.css';
import '../styles/Auth.css';

import { Link } from 'react-router-dom';
function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await loginUser(formData);

      localStorage.setItem(
  'token',
  response.token
);

localStorage.setItem(
  'role',
  response.user.role
);
console.log(response.token);

alert('Login Successful');

window.location.href = '/dashboard';

    } catch (error) {

      alert('Login Failed');

    }

  };

  return (

  <div className="auth-container">

    <div className="auth-card">

      <h1 className="auth-title">
        AMX ERP Login
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="auth-input"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="auth-input"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="auth-button"
        >
          Login
        </button>

      </form>

      <div className="auth-link">

  Don't have an account?

  <Link
    to="/register"
    style={{
      marginLeft: '8px',
      color: '#0f172a',
      fontWeight: 'bold',
      textDecoration: 'none'
    }}
  >

    Register

  </Link>

</div>

    </div>

  </div>

);
}

export default Login;