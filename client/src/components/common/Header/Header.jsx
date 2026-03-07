import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useBookingModal } from "../../../hooks/useNewBookingModal";
import NotificationDropdown from "../Notifications/NotificationDropdown";
import axios from "axios";
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
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { openModal } = useBookingModal();
  const { user, logoutUser } = useAuth();
  const { cartCount } = useCart();
  const searchRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const { data } = await axios.get(`${apiUrl}/api/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchResults(data.results);
        setShowResults(true);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

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
    if (searchExpanded) {
      setSearchQuery("");
      setShowResults(false);
    }
  };

  const handleResultClick = (result) => {
    navigate(result.url);
    setSearchQuery("");
    setShowResults(false);
    setSearchExpanded(false);
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
          <SearchWrapper ref={searchRef}>
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
                placeholder="Search products & services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                $expanded={searchExpanded}
                autoFocus={searchExpanded}
              />
            </SearchBar>
            {showResults && searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#1a1a1a',
                border: '1px solid #403D40',
                borderRadius: '8px',
                marginTop: '4px',
                zIndex: 1000,
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <img
                      src={result.image}
                      alt={result.title}
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#ECECEC', fontSize: '0.9rem', fontWeight: '600' }}>
                        {result.title}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                        {result.category} • {result.type}
                        {result.price && ` • ₹${result.price}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SearchWrapper>

          <NavDivider />

          {/* Notification Bell */}
          <NotificationDropdown />

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
