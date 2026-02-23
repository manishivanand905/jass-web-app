import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const isAuth = localStorage.getItem('adminToken');
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
