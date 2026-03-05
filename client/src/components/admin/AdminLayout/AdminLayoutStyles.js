import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
`;

export const Sidebar = styled.div`
  width: 260px;
  background: rgba(255, 255, 255, 0.03);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    transform: translateX(${props => props.$open ? '0' : '-100%'});
  }
`;

export const Logo = styled.div`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #C90000;
  text-align: center;
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  letter-spacing: 0.1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  i { font-size: 1.8rem; }
`;

export const NavItem = styled.div`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.$active ? '#C90000' : '#ECECEC'};
  padding: 15px 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  background: ${props => props.$active ? 'rgba(201, 0, 0, 0.1)' : 'transparent'};
  border-left: 3px solid ${props => props.$active ? '#C90000' : 'transparent'};
  letter-spacing: 0.05em;
  border-top: ${props => props.style?.marginTop === 'auto' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};

  &:hover {
    background: rgba(201, 0, 0, 0.1);
    color: #C90000;
  }

  i { font-size: 1.1rem; width: 20px; }
`;

export const MainContent = styled.div`
  flex: 1;
  margin-left: 260px;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const TopBar = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 30px;
  display: none;
  position: sticky;
  top: 0;
  z-index: 999;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    transform: translateY(${props => props.$show ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
`;

export const MenuIcon = styled.div`
  font-size: 1.5rem;
  color: #ECECEC;
  cursor: pointer;
`;

export const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  z-index: 999;

  @media (max-width: 768px) {
    display: ${props => props.$open ? 'block' : 'none'};
  }
`;
