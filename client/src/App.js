import Register from './features/Auth/Register';
import ChangePassword from './features/Auth/ChangePassword';
import ForgotPassword from './features/Auth/ForgotPassword';
import ResetPassword from './features/Auth/ResetPassword';
import Login from './features/Auth/Login';
import './App.css'
import Navbar from './App/layout/NavBar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './features/Home';
import NotFound from './features/NotFound';
import DashboardUser from './features/users';
import DashboardBook from './features/books';
import DashboardAuthor from './features/authors';
import DashboardPublisher from './features/publishers';
import Profile from './features/Auth/Profile';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsAuthenticated(token !== null);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes that should only be accessible if authenticated */}
        {isAuthenticated && (
        <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="user" element={<DashboardUser />} />
            <Route path="book" element={<DashboardBook />} />
            <Route path="author" element={<DashboardAuthor />} />
            <Route path="publisher" element={<DashboardPublisher />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          )}

        {/* Routes accessible regardless of authentication */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Login />} />

        {/* Redirect to login if not authenticated */}
        {isAuthenticated && <Route path="/" element={<Navigate to="/home" />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
