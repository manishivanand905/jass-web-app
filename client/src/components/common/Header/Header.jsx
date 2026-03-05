import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useBookingModal } from "../../../hooks/useNewBookingModal";
import {
  HeaderContainer,
  Logo,
  RightSection,
  NavDivider,
  SearchWrapper,
  SearchBar,
  SearchIcon,
  SearchInput,
  NotifBtn,
  QuickBookBtn,
  AuthButton,
} from "./HeaderStyles";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { openModal } = useBookingModal();
  const { user, logoutUser } = useAuth();
  const { cartCount } = useCart();

  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      logoutUser();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleSearchToggle = () => {
    setSearchExpanded((prev) => !prev);
    if (searchExpanded) setSearchQuery("");
  };

  return (
    <>
      <HeaderContainer>
        {/* Logo */}
        <Logo onClick={() => navigate("/")}>
          <img
            src="https://res.cloudinary.com/dqcdwpr9y/image/upload/v1771493154/jass-logo_ixxpng.png"
            alt="Jass Automotives"
          />
        </Logo>

        {/* Right utility controls — no nav links */}
        <RightSection>
          {/* Search */}
          <SearchWrapper>
            <SearchBar $expanded={searchExpanded}>
              <SearchIcon
                $expanded={searchExpanded}
                onClick={handleSearchToggle}
                aria-label="Toggle search"
              >
                <i
                  className={`fa-solid fa-${
                    searchExpanded ? "xmark" : "magnifying-glass"
                  }`}
                />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                $expanded={searchExpanded}
                autoFocus={searchExpanded}
              />
            </SearchBar>
          </SearchWrapper>

          <NavDivider />

          {/* Notification Bell */}
          <NotifBtn aria-label="Notifications" title="Notifications">
            <i className="fa-solid fa-bell" />
          </NotifBtn>

          {/* Quick Book */}
          <QuickBookBtn
            onClick={openModal}
            aria-label="Book a service"
            title="Book a service"
          >
            <i className="fa-solid fa-calendar-check" />
            <span>Book Now</span>
          </QuickBookBtn>

          <QuickBookBtn
            onClick={() => navigate('/cart')}
            aria-label="View cart"
            title="View cart"
            style={{ position: 'relative' }}
          >
            <i className="fa-solid fa-shopping-cart" />
            {cartCount > 0 && <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#cc0000', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>{cartCount}</span>}
          </QuickBookBtn>

          <NavDivider />

          {/* Auth */}
          <AuthButton
            onClick={handleAuth}
            title={user ? "Logout" : "Login"}
          >
            <i
              className={`fa-solid fa-${
                user ? "right-from-bracket" : "right-to-bracket"
              }`}
            />
            <span className="btn-label">{user ? "Logout" : "Login"}</span>
          </AuthButton>
        </RightSection>
      </HeaderContainer>
    </>
  );
};

export default Header;
