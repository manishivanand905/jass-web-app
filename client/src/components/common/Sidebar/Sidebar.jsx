import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Header from "../Header/Header";
import {
  SidebarContainer,
  NavList,
  NavItem,
  NavLink,
  ProfileSection,
  ProfileCard,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  ProfileMenu,
  ProfileMenuItem,
  PageWrapper,
  MobileBottomNav,
  MobileNavItem,
  MobileProfileMenu,
  MobileProfileHeader,
  MobileProfileName,
  MobileProfileEmail,
} from "./SidebarStyles";

const userMenuItems = [
  { path: "/", icon: "fa-solid fa-home", label: "Home" },
  { path: "/services", icon: "fa-solid fa-wrench", label: "Services" },
  { path: "/products", icon: "fa-solid fa-box", label: "Products" },
  { path: "/comparison", icon: "fa-solid fa-scale-balanced", label: "Compare" },
  { path: "/contact", icon: "fa-solid fa-envelope", label: "Contact" },
];

const Sidebar = ({ type = "user", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileProfileMenu, setShowMobileProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const menuItems = userMenuItems;

  useEffect(() => {
    const handleClickOutside = () => {
      if (showMobileProfileMenu) {
        setShowMobileProfileMenu(false);
      }
    };
    
    if (showMobileProfileMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMobileProfileMenu]);

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileMenu(false);
    setShowMobileProfileMenu(false);
  };

  const handleSidebarClick = (e) => {
    if (e.target.closest('.profile-card')) {
      return;
    }
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    logoutUser();
    setShowMobileProfileMenu(false);
    navigate("/login");
  };

  const mobileMenuItems = [
    { path: "/", icon: "fa-solid fa-home", label: "Home" },
    { path: "/services", icon: "fa-solid fa-wrench", label: "Services" },
    { path: "/products", icon: "fa-solid fa-box", label: "Products" },
    { path: "/profile", icon: "fa-solid fa-user", label: "Profile" },
  ];

  return (
    <>
      <Header />
      <SidebarContainer $isOpen={isOpen} onClick={(e) => { setIsOpen(!isOpen); handleSidebarClick(e); }}>
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
          {user ? (
            <>
              <ProfileCard
                className="profile-card"
                $isOpen={isOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                }}
              >
                <ProfileAvatar>
                  <i className="fa-solid fa-user" />
                </ProfileAvatar>
                <ProfileInfo $isOpen={isOpen}>
                  <ProfileName>{user.name}</ProfileName>
                  <ProfileEmail>{user.email}</ProfileEmail>
                </ProfileInfo>
                {isOpen && (
                  <i className={`fa-solid fa-chevron-${showProfileMenu ? 'up' : 'down'}`} style={{ marginLeft: 'auto', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }} />
                )}
              </ProfileCard>
              {showProfileMenu && isOpen && (
                <ProfileMenu>
                  <ProfileMenuItem onClick={() => handleNavigation("/profile")}>
                    <i className="fa-solid fa-user-circle" />
                    <span>My Profile</span>
                  </ProfileMenuItem>
                  <ProfileMenuItem onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket" />
                    <span>Logout</span>
                  </ProfileMenuItem>
                </ProfileMenu>
              )}
            </>
          ) : (
            <NavLink
              $isOpen={isOpen}
              className={location.pathname === "/login" ? "active" : ""}
              onClick={() => handleNavigation("/login")}
            >
              <i className="fa-solid fa-right-to-bracket" />
              <span>Login</span>
            </NavLink>
          )}
        </ProfileSection>
      </SidebarContainer>
      
      <MobileBottomNav>
        {mobileMenuItems.slice(0, 3).map((item) => (
          <MobileNavItem
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
            onClick={() => handleNavigation(item.path)}
          >
            <i className={item.icon} />
            <span>{item.label}</span>
          </MobileNavItem>
        ))}
        
        <MobileNavItem
          className={showMobileProfileMenu ? "active" : ""}
          onClick={(e) => {
            e.stopPropagation();
            setShowMobileProfileMenu(!showMobileProfileMenu);
          }}
        >
          <i className="fa-solid fa-user" />
          <span>Profile</span>
        </MobileNavItem>
      </MobileBottomNav>

      {showMobileProfileMenu && user && (
        <MobileProfileMenu onClick={(e) => e.stopPropagation()}>
          <MobileProfileHeader>
            <MobileProfileName>{user.name}</MobileProfileName>
            <MobileProfileEmail>{user.email}</MobileProfileEmail>
          </MobileProfileHeader>
          <ProfileMenuItem onClick={() => handleNavigation("/profile")}>
            <i className="fa-solid fa-user-circle" />
            <span>My Profile</span>
          </ProfileMenuItem>
          <ProfileMenuItem onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket" />
            <span>Logout</span>
          </ProfileMenuItem>
        </MobileProfileMenu>
      )}
      
      <PageWrapper $isOpen={isOpen}>{children}</PageWrapper>
    </>
  );
};

export default Sidebar;
