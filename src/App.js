import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import ProtectedRoute from './components/ProtectedRoute';
import Finance from './pages/Finance';
import Inventory from './pages/Inventory';
import RoleProtectedRoute
  from './components/RoleProtectedRoute';
  import Attendance from './pages/Attendance';
import Reports from './pages/Reports';
import Leaves from './pages/Leaves';
import Settings from './pages/Settings';
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
       <Route
  path="/employees"
  element={
    <RoleProtectedRoute
      allowedRoles={['admin']}
    >

      <Employees />

    </RoleProtectedRoute>
  }
/>
<Route
  path="/finance"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        'admin',
        'manager'
      ]}
    >

      <Finance />

    </RoleProtectedRoute>
  }
/>
<Route
  path="/inventory"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        'admin',
        'manager',
        'employee'
      ]}
    >

      <Inventory />

    </RoleProtectedRoute>
  }
/>
<Route
  path="/attendance"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        'admin',
        'manager'
      ]}
    >

      <Attendance />

    </RoleProtectedRoute>
  }
/>

<Route
  path="/reports"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        'admin',
        'manager'
      ]}
    >

      <Reports />

    </RoleProtectedRoute>
  }
/>

<Route
  path="/leaves"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        'admin',
        'manager',
        'employee'
      ]}
    >

      <Leaves />

    </RoleProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        'admin',
        'manager',
        'employee'
      ]}
    >

      <Settings />

    </RoleProtectedRoute>
  }
/>

      </Routes>
<ToastContainer />
    </BrowserRouter>

  );

}

export default App;