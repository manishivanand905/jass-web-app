import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 70px;
  height: calc(100vh - 70px);
  background: #0a0a0a;
  border-right: 1px solid rgba(204, 0, 0, 0.2);
  z-index: 1000;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${props => props.$isOpen ? '240px' : '70px'};
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const NavList = styled.nav`
  padding: 20px 0;
`;

export const NavItem = styled.div`
  position: relative;
  margin: 5px 0;
`;

export const NavLink = styled.a`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-family: 'Barlow Condensed', Arial, sans-serif;
  font-size: 15px;
  letter-spacing: 0.05em;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: #cc0000;
    transform: scaleY(0);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: #ffffff;
    background: rgba(204, 0, 0, 0.1);
    
    &::before {
      transform: scaleY(1);
    }

    i {
      color: #cc0000;
      transform: scale(1.2);
    }
  }

  &.active {
    color: #ffffff;
    background: rgba(204, 0, 0, 0.15);
    
    &::before {
      transform: scaleY(1);
    }

    i {
      color: #cc0000;
    }
  }

  i {
    font-size: 20px;
    min-width: 30px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  span {
    margin-left: 15px;
    white-space: nowrap;
    opacity: ${props => props.$isOpen ? '1' : '0'};
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const ProfileSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 0 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 12px;

  &:hover {
    background: rgba(204, 0, 0, 0.1);
  }
`;

export const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #cc0000 0%, #a00000 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    color: white;
    font-size: 18px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
`;

export const ProfileName = styled.div`
  font-family: 'Barlow Condensed', Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: white;
  white-space: nowrap;
`;

export const ProfileEmail = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
`;

export const ProfileMenu = styled.div`
  background: #0d0d0d;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 0;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ProfileMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Barlow Condensed', Arial, sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 12px;

  i {
    font-size: 16px;
    min-width: 20px;
    color: rgba(204, 0, 0, 0.7);
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(204, 0, 0, 0.1);
    color: white;

    i {
      color: #cc0000;
      transform: translateX(3px);
    }
  }
`;

export const PageWrapper = styled.div`
  margin-left: ${props => props.$isOpen ? '240px' : '70px'};
  margin-top: 70px;
  transition: margin-left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: calc(100vh - 70px);
  width: calc(100% - ${props => props.$isOpen ? '240px' : '70px'});
  background: #0d0d0d;

  @media (max-width: 1024px) {
    margin-left: 0;
    width: 100%;
    padding-bottom: 70px;
  }
`;

export const MobileBottomNav = styled.nav`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
    border-top: 2px solid rgba(204, 0, 0, 0.3);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
  }
`;

export const MobileProfileMenu = styled.div`
  position: fixed;
  bottom: 70px;
  right: 10px;
  background: #0d0d0d;
  border: 1px solid rgba(204, 0, 0, 0.3);
  border-radius: 12px;
  padding: 8px 0;
  min-width: 250px;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.8);
  animation: slideUpMobile 0.3s ease;
  z-index: 999;

  @keyframes slideUpMobile {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MobileProfileHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
`;

export const MobileProfileName = styled.div`
  font-family: 'Barlow Condensed', Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
`;

export const MobileProfileEmail = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
`;

export const MobileNavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px 15px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  flex: 1;
  max-width: 100px;
  border-radius: 12px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: #cc0000;
    border-radius: 0 0 3px 3px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  i {
    font-size: 22px;
    transition: all 0.3s ease;
  }

  span {
    font-family: 'Barlow Condensed', Arial, sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }

  &:active {
    transform: scale(0.95);
  }

  &.active {
    color: #cc0000;
    background: rgba(204, 0, 0, 0.1);

    &::before {
      opacity: 1;
    }

    i {
      transform: translateY(-2px);
      filter: drop-shadow(0 0 8px rgba(204, 0, 0, 0.5));
    }

    span {
      color: #ffffff;
      font-weight: 600;
    }
  }

  &:hover:not(.active) {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.05);

    i {
      transform: translateY(-2px);
    }
  }
`;
