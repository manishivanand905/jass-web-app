import styled, { keyframes } from "styled-components";

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0);     }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0   rgba(204, 0, 0, 0.5); }
  50%       { box-shadow: 0 0 0 6px rgba(204, 0, 0, 0);   }
`;

const ringBell = keyframes`
  0%, 100% { transform: rotate(0deg);   }
  15%       { transform: rotate(16deg);  }
  30%       { transform: rotate(-14deg); }
  45%       { transform: rotate(10deg);  }
  60%       { transform: rotate(-6deg);  }
  75%       { transform: rotate(3deg);   }
`;

// ─── Header Container ─────────────────────────────────────────────────────────
export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 68px;
  z-index: 900;
  animation: ${fadeInDown} 0.5s ease both;

  background: rgba(8, 8, 8, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(204, 0, 0, 0.2);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.03) inset,
    0 4px 24px rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;

  /* Red accent top-right */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #cc0000);
    pointer-events: none;
  }

  /* Red accent bottom-left */
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, #cc0000, transparent);
    pointer-events: none;
  }

  @media (max-width: 767px) {
    padding: 0 16px;
    height: 60px;
  }

  @media (max-width: 420px) {
    padding: 0 10px;
    height: 56px;
  }
`;

// ─── Logo ─────────────────────────────────────────────────────────────────────
export const Logo = styled.div`
  cursor: pointer;
  flex-shrink: 1;
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  min-width: 0;

  img {
    height: 44px;
    width: auto;
    display: block;
    transition: filter 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background: #cc0000;
    transition: width 0.35s ease;
    border-radius: 2px;
  }

  &:hover {
    transform: translateY(-1px);

    img {
      filter: drop-shadow(0 0 10px rgba(204, 0, 0, 0.5));
    }

    &::after {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    img {
      height: 36px;
    }
  }

  @media (max-width: 420px) {
    max-width: 42vw;

    img {
      max-height: 30px;
      width: 100%;
      object-fit: contain;
    }
  }
`;

// ─── Right Controls ───────────────────────────────────────────────────────────
export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 420px) {
    gap: 4px;
  }
`;

// ─── Divider ──────────────────────────────────────────────────────────────────
export const NavDivider = styled.div`
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;

  @media (max-width: 420px) {
    display: none;
  }
`;

// ─── Search ───────────────────────────────────────────────────────────────────
export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${({ $expanded }) =>
    $expanded ? "rgba(204,0,0,0.08)" : "rgba(255,255,255,0.04)"};
  border: 1px solid
    ${({ $expanded }) => ($expanded ? "#cc0000" : "rgba(255,255,255,0.09)")};
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  width: ${({ $expanded }) => ($expanded ? "220px" : "38px")};
  box-shadow: ${({ $expanded }) =>
    $expanded ? "0 0 14px rgba(204,0,0,0.18)" : "none"};
  clip-path: polygon(
    0 0,
    calc(100% - 7px) 0,
    100% 7px,
    100% 100%,
    7px 100%,
    0 calc(100% - 7px)
  );

  @media (max-width: 767px) {
    width: ${({ $expanded }) => ($expanded ? "160px" : "34px")};
  }

  @media (max-width: 420px) {
    width: ${({ $expanded }) => ($expanded ? "130px" : "30px")};
  }
`;

export const SearchIcon = styled.button`
  background: none;
  border: none;
  width: 38px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.25s ease;

  i {
    font-size: 13px;
    color: ${({ $expanded }) =>
      $expanded ? "#cc0000" : "rgba(255,255,255,0.45)"};
    transition:
      color 0.25s ease,
      transform 0.25s ease;
  }

  &:hover i {
    color: #cc0000;
    transform: scale(1.15);
  }

  @media (max-width: 767px) {
    width: 34px;
    height: 32px;
  }

  @media (max-width: 420px) {
    width: 30px;
    height: 30px;
  }
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.83rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  padding: 0 10px 0 0;
  width: ${({ $expanded }) => ($expanded ? "160px" : "0")};
  opacity: ${({ $expanded }) => ($expanded ? "1" : "0")};
  transition:
    width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.28);
  }

  @media (max-width: 767px) {
    width: ${({ $expanded }) => ($expanded ? "110px" : "0")};
  }

  @media (max-width: 420px) {
    width: ${({ $expanded }) => ($expanded ? "82px" : "0")};
    font-size: 0.75rem;
  }
`;

// ─── Shared Icon Button ───────────────────────────────────────────────────────
export const IconBtn = styled.button`
  position: relative;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.09);
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(
    0 0,
    calc(100% - 6px) 0,
    100% 6px,
    100% 100%,
    6px 100%,
    0 calc(100% - 6px)
  );

  i {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.25s ease;
  }

  &:hover {
    background: rgba(204, 0, 0, 0.1);
    border-color: rgba(204, 0, 0, 0.45);

    i {
      color: #cc0000;
    }
  }

  @media (max-width: 767px) {
    width: 32px;
    height: 32px;
  }
`;

// ─── Notification Bell ────────────────────────────────────────────────────────
export const NotifBtn = styled.button`
  position: relative;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.09);
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(
    0 0,
    calc(100% - 6px) 0,
    100% 6px,
    100% 100%,
    6px 100%,
    0 calc(100% - 6px)
  );

  i {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.25s ease;
    transform-origin: top center;
  }

  /* Pulsing red badge dot */
  &::after {
    content: "";
    position: absolute;
    top: 7px;
    right: 7px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #cc0000;
    border: 1.5px solid rgba(8, 8, 8, 0.95);
    animation: ${pulse} 2.5s ease infinite;
  }

  &:hover {
    background: rgba(204, 0, 0, 0.1);
    border-color: rgba(204, 0, 0, 0.45);

    i {
      color: #cc0000;
      animation: ${ringBell} 0.65s ease;
    }
  }

  @media (max-width: 767px) {
    width: 32px;
    height: 32px;
  }
`;

// ─── Quick Book CTA ───────────────────────────────────────────────────────────
export const QuickBookBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid #cc0000;
  height: 36px;
  padding: 0 14px;
  cursor: pointer;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #cc0000;
  white-space: nowrap;
  transition: all 0.25s ease;
  clip-path: polygon(
    0 0,
    calc(100% - 7px) 0,
    100% 7px,
    100% 100%,
    7px 100%,
    0 calc(100% - 7px)
  );

  i {
    font-size: 11px;
  }

  &:hover {
    background: #cc0000;
    color: #ffffff;
    box-shadow: 0 4px 16px rgba(204, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.97);
  }

  /* Hide label on mobile — icon only */
  @media (max-width: 767px) {
    height: 32px;
    padding: 0 10px;

    span {
      display: none;
    }
  }

  @media (max-width: 420px) {
    height: 30px;
    padding: 0 8px;
  }
`;

// ─── Auth Button ──────────────────────────────────────────────────────────────
export const AuthButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;
  background: #cc0000;
  border: none;
  padding: 0 14px;
  height: 36px;
  cursor: pointer;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #ffffff;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
  clip-path: polygon(
    0 0,
    calc(100% - 8px) 0,
    100% 8px,
    100% 100%,
    8px 100%,
    0 calc(100% - 8px)
  );
  animation: ${pulse} 3s ease infinite;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  i {
    font-size: 13px;
  }

  &:hover {
    background: #e60000;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(204, 0, 0, 0.4);
    animation: none;

    &::before {
      opacity: 1;
      animation: ${shimmer} 0.6s ease;
    }
  }

  &:active {
    transform: translateY(0);
  }

  /* Icon-only on mobile */
  @media (max-width: 767px) {
    padding: 0 10px;
    height: 32px;
    width: 32px;
    justify-content: center;

    .btn-label {
      display: none;
    }
  }

  @media (max-width: 420px) {
    width: 30px;
    height: 30px;
    padding: 0;
  }
`;
