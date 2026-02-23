import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { showToast } from '../../common/Toast/toastConfig';
import {
  LayoutContainer,
  Sidebar,
  SidebarBrand,
  SidebarNav,
  NavItem,
  SidebarFooter,
  LogoutButton,
  MainContent,
  TopBar,
  TopBarLeft,
  PageTitle,
  Breadcrumb,
  TopBarRight,
  NotificationIcon,
  NotificationBadge,
  AdminProfile,
  AdminAvatar,
  AdminInfo,
  AdminName,
  AdminRole,
  MobileMenuButton,
  Overlay,
  ContentArea
} from './AdminLayoutStyles';

const AdminLayout = ({ children, activeTab, onTabChange, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'fa-gauge-high' },
    { id: 'products', label: 'Products', icon: 'fa-box-open' },
    { id: 'bookings', label: 'Bookings', icon: 'fa-calendar-check' }
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
    showToast.success('Logged out successfully');
  };

  return (
    <LayoutContainer>
      <Overlay $isOpen={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      
      <Sidebar $isOpen={sidebarOpen}>
        <SidebarBrand>
          <h1>
            <span>JASS</span>
            <span>ADMIN</span>
          </h1>
        </SidebarBrand>

        <SidebarNav>
          {navItems.map(item => (
            <NavItem
              key={item.id}
              $active={activeTab === item.id}
              onClick={() => {
                onTabChange(item.id);
                setSidebarOpen(false);
              }}
            >
              <i className={`fa-solid ${item.icon}`} />
              {item.label}
            </NavItem>
          ))}
        </SidebarNav>

        <SidebarFooter>
          <LogoutButton onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket" />
            Logout
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <MainContent>
        <TopBar>
          <TopBarLeft>
            <MobileMenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
              <i className="fa-solid fa-bars" />
            </MobileMenuButton>
            <PageTitle>{pageTitle}</PageTitle>
            <Breadcrumb>Admin / {pageTitle}</Breadcrumb>
          </TopBarLeft>

          <TopBarRight>
            <NotificationIcon>
              <i className="fa-solid fa-bell" />
              <NotificationBadge>3</NotificationBadge>
            </NotificationIcon>

            <AdminProfile>
              <AdminAvatar>
                <i className="fa-solid fa-circle-user" />
              </AdminAvatar>
              <AdminInfo>
                <AdminName>Admin</AdminName>
                <AdminRole>Jass Automotives</AdminRole>
              </AdminInfo>
              <i className="fa-solid fa-chevron-down" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }} />
            </AdminProfile>
          </TopBarRight>
        </TopBar>

        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout;
