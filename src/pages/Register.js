import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

import '../styles/Register.css';
import '../styles/Auth.css';
function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee'
  });
const navigate = useNavigate();
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await registerUser(formData);

      navigate('/');

      window.location.href = '/';

    } catch (error) {

      alert('Registration Failed');

    }

  };

  return (

  <div className="auth-container">

    <div className="auth-card">

      <h1 className="auth-title">
        AMX ERP Register
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="auth-input"
          value={formData.name}
          onChange={handleChange}
        />

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

        <select
          name="role"
          className="auth-input"
          value={formData.role}
          onChange={handleChange}
        >

          <option value="employee">
            Employee
          </option>

          <option value="manager">
            Manager
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button
          type="submit"
          className="auth-button"
        >
          Register
        </button>

      </form>
<div className="auth-link">

  Already have an account?

  <Link
    to="/"
    style={{
      marginLeft: '8px',
      color: '#0f172a',
      fontWeight: 'bold',
      textDecoration: 'none'
    }}
  >

    Login

  </Link>

</div>
    </div>

  </div>

);

}

export default Register;