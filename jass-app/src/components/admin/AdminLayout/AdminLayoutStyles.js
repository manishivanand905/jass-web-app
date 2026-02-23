import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
`;

export const Sidebar = styled.aside`
  width: 240px;
  background: #0d0d0d;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

export const SidebarBrand = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid rgba(204, 0, 0, 0.3);

  h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 24px;
    font-weight: 900;
    margin: 0;
    
    span:first-child {
      color: #fff;
    }
    
    span:last-child {
      color: #cc0000;
      margin-left: 4px;
    }
  }
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
`;

export const NavItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: ${props => props.$active ? 'rgba(204, 0, 0, 0.08)' : 'transparent'};
  border: none;
  border-left: 3px solid ${props => props.$active ? '#cc0000' : 'transparent'};
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;

  i {
    font-size: 18px;
    color: ${props => props.$active ? '#cc0000' : 'rgba(255, 255, 255, 0.6)'};
  }

  &:hover {
    background: rgba(204, 0, 0, 0.08);
    color: #fff;

    i {
      color: #cc0000;
    }
  }
`;

export const SidebarFooter = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 20px;
`;

export const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: transparent;
  border: 1px solid rgba(204, 0, 0, 0.3);
  border-radius: 6px;
  color: rgba(204, 0, 0, 0.8);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  i {
    font-size: 16px;
  }

  &:hover {
    background: rgba(204, 0, 0, 0.1);
    border-color: #cc0000;
    color: #cc0000;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: 240px;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const TopBar = styled.header`
  height: 64px;
  background: rgba(8, 8, 8, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 90;

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 56px;
  }
`;

export const TopBarLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PageTitle = styled.h2`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 18px;
  font-weight: 900;
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Breadcrumb = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NotificationIcon = styled.button`
  position: relative;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #cc0000;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  background: #cc0000;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AdminProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const AdminAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(204, 0, 0, 0.1);
  border: 2px solid #cc0000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cc0000;
  font-size: 18px;
`;

export const AdminInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const AdminName = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`;

export const AdminRole = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }
`;

export const ContentArea = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;
