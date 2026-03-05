import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`display: flex; min-height: 100vh;`;
const Sidebar = styled.aside`width: 250px; background: ${p => p.theme.colors.secondary}; color: white; padding: 20px;`;
const Nav = styled.nav`display: flex; flex-direction: column; gap: 10px; margin-top: 30px;`;
const NavLink = styled(Link)`padding: 12px; border-radius: 6px; &:hover { background: rgba(255,255,255,0.1); }`;
const Content = styled.main`flex: 1; padding: 30px;`;

const UserLayout = () => (
  <Container>
    <Sidebar>
      <h2>User Panel</h2>
      <Nav>
        <NavLink to="/user/dashboard">Dashboard</NavLink>
        <NavLink to="/user/favourites">Favourites</NavLink>
        <NavLink to="/user/profile">Profile</NavLink>
        <NavLink to="/user/settings">Settings</NavLink>
        <NavLink to="/">Home</NavLink>
      </Nav>
    </Sidebar>
    <Content><Outlet /></Content>
  </Container>
);

export default UserLayout;
