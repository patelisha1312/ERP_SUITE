import { Navigate } from 'react-router-dom';

function RoleProtectedRoute({

  children,
  allowedRoles

}) {

  const token =
    localStorage.getItem('token');

  const role =
    localStorage.getItem('role');

  // NOT LOGGED IN
  if (!token) {

    return <Navigate to="/" />;

  }

  // ROLE NOT ALLOWED
  if (
    !allowedRoles.includes(role)
  ) {

    return <Navigate to="/dashboard" />;

  }

  return children;

}

export default RoleProtectedRoute;