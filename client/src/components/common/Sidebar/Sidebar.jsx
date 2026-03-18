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
  const [showHint, setShowHint] = useState(false); // 🔥 NEW

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const menuItems = userMenuItems;

  // ✅ SHOW HINT AFTER 20s (DESKTOP ONLY)
  useEffect(() => {
    if (window.innerWidth <= 1024) return;

    const timer = setTimeout(() => {
      setShowHint(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ CLOSE MOBILE PROFILE MENU
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMobileProfileMenu) {
        setShowMobileProfileMenu(false);
      }
    };

    if (showMobileProfileMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMobileProfileMenu]);

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileMenu(false);
    setShowMobileProfileMenu(false);
  };

  // ✅ FIXED SIDEBAR CLICK
  const handleSidebarClick = (e) => {
    if (e.target.closest(".profile-card")) return;

    setIsOpen((prev) => !prev);
    setShowProfileMenu(false);
    setShowHint(false); // hide hint when used
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

      {/* SIDEBAR */}
      <SidebarContainer $isOpen={isOpen} onClick={handleSidebarClick}>
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

        {/* PROFILE */}
        <ProfileSection $isOpen={isOpen}>
          {user ? (
            <>
              <ProfileCard
                className="profile-card"
                $isOpen={isOpen}
                onClick={(e) => {
                  e.stopPropagation();

                  // 🔥 FIX: open sidebar first
                  if (!isOpen) {
                    setIsOpen(true);
                    setShowHint(false);
                    return;
                  }

                  setShowProfileMenu((prev) => !prev);
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
                  <i
                    className={`fa-solid fa-chevron-${
                      showProfileMenu ? "up" : "down"
                    }`}
                    style={{
                      marginLeft: "auto",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  />
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

      {/* 🔥 HINT ARROW (DESKTOP ONLY) */}
      {showHint && !isOpen && window.innerWidth > 1024 && (
        <div
          onClick={() => {
            setIsOpen(true);
            setShowHint(false);
          }}
          style={{
            position: "fixed",
            top: "90px",
            left: "75px",
            zIndex: 1200,
            background: "rgba(204,0,0,0.9)",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "12px",
            fontFamily: "Barlow Condensed",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            animation: "fadeInUp 0.4s ease",
          }}
        >
          <i className="fa-solid fa-arrow-left" />
          Open Menu
        </div>
      )}

      {/* MOBILE NAV (UNCHANGED) */}
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
