import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import {
  SidebarContainer,
  NavList,
  NavItem,
  NavLink,
  ProfileSection,
  PageWrapper,
  MobileBottomNav,
  MobileNavItem,
} from "./SidebarStyles";

const userMenuItems = [
  { path: "/", icon: "fa-solid fa-home", label: "Home" },
  { path: "/services", icon: "fa-solid fa-wrench", label: "Services" },
  { path: "/products", icon: "fa-solid fa-box", label: "Products" },
  { path: "/explore", icon: "fa-solid fa-compass", label: "Explore" },
  { path: "/comparison", icon: "fa-solid fa-scale-balanced", label: "Compare" },
  { path: "/reviews", icon: "fa-solid fa-star", label: "Reviews" },
  { path: "/contact", icon: "fa-solid fa-envelope", label: "Contact" },
];

const adminMenuItems = [
  {
    path: "/admin/dashboard",
    icon: "fa-solid fa-chart-line",
    label: "Dashboard",
  },
  {
    path: "/admin/bookings",
    icon: "fa-solid fa-calendar-check",
    label: "Bookings",
  },
  { path: "/admin/products", icon: "fa-solid fa-box-open", label: "Products" },
  { path: "/admin/users", icon: "fa-solid fa-users", label: "Users" },
  { path: "/admin/settings", icon: "fa-solid fa-gear", label: "Settings" },
];

const Sidebar = ({ type = "user", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = type === "admin" ? adminMenuItems : userMenuItems;

  const handleNavigation = (path) => {
    navigate(path);
  };

  const mobileMenuItems = type === "admin" 
    ? adminMenuItems.slice(0, 4)
    : [
        { path: "/", icon: "fa-solid fa-home", label: "Home" },
        { path: "/services", icon: "fa-solid fa-wrench", label: "Services" },
        { path: "/products", icon: "fa-solid fa-box", label: "Products" },
        { path: "/profile", icon: "fa-solid fa-user", label: "Account" },
      ];

  return (
    <>
      <Header />
      <SidebarContainer $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <NavList>
          {menuItems.map((item) => (
            <NavItem key={item.path}>
              <NavLink
                $isOpen={isOpen}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => handleNavigation(item.path)}
              >
                <i className={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            </NavItem>
          ))}
        </NavList>

        <ProfileSection $isOpen={isOpen}>
          <NavLink
            $isOpen={isOpen}
            className={location.pathname === "/profile" ? "active" : ""}
            onClick={() => handleNavigation("/profile")}
          >
            <i className="fa-solid fa-user" />
            <span>Profile</span>
          </NavLink>
        </ProfileSection>
      </SidebarContainer>
      
      <MobileBottomNav>
        {mobileMenuItems.map((item) => (
          <MobileNavItem
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
            onClick={() => handleNavigation(item.path)}
          >
            <i className={item.icon} />
            <span>{item.label}</span>
          </MobileNavItem>
        ))}
      </MobileBottomNav>
      
      <PageWrapper $isOpen={isOpen}>{children}</PageWrapper>
    </>
  );
};

export default Sidebar;
