import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
  min-height: 100vh;
`;

export const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.secondary};
  padding: 20px 0;
`;

export const NavContainer = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoContainer = styled(Link)`
  img {
    height: 50px;
  }
`;

export const LoginButton = styled(Link)`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MainContainer = styled.main`
  width: 100%;
`;
