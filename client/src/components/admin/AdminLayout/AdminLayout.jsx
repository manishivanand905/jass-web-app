import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Container, Sidebar, Logo, NavItem, MainContent, TopBar, MenuIcon, Overlay } from './AdminLayoutStyles';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowTopBar(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { path: '/admin/dashboard', icon: 'fa-chart-line', label: 'Overview' },
    { path: '/admin/products', icon: 'fa-box', label: 'Products' },
    { path: '/admin/services', icon: 'fa-tools', label: 'Services' },
    { path: '/admin/bookings', icon: 'fa-calendar-check', label: 'Bookings' },
    { path: '/admin/orders', icon: 'fa-shopping-cart', label: 'Orders' },
    { path: '/admin/contacts', icon: 'fa-envelope', label: 'Contacts' }
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/admin/auth');
  };

  return (
    <Container>
      <Sidebar $open={sidebarOpen}>
        <Logo onClick={() => navigate('/admin/dashboard')}>
          <img src="https://res.cloudinary.com/dqcdwpr9y/image/upload/v1771493154/jass-logo_ixxpng.png" alt="JASS Logo" style={{ height: '40px', width: 'auto' }} />
          <span>ADMIN</span>
        </Logo>
        {navItems.map(item => (
          <NavItem
            key={item.path}
            $active={location.pathname === item.path}
            onClick={() => { navigate(item.path); setSidebarOpen(false); }}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
          </NavItem>
        ))}
        <NavItem onClick={handleLogout} style={{ marginTop: 'auto' }}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </NavItem>
      </Sidebar>
      <Overlay $open={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      <MainContent>
        <TopBar $show={showTopBar}>
          <MenuIcon onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </MenuIcon>
        </TopBar>
        {children}
      </MainContent>
    </Container>
  );
};

export default AdminLayout;
