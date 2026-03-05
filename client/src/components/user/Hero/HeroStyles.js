import styled, { keyframes } from "styled-components";

// ─── Animations ────────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1;   }
  50%       { opacity: 0.4; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px);   }
  50%       { transform: translateY(-10px); }
`;

const scrollLeft = keyframes`
  0%   { transform: translateX(0);       }
  100% { transform: translateX(-50%);    }
`;

// ─── Hero Wrapper ──────────────────────────────────────────────────────────────
export const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("https://images.pexels.com/photos/6873123/pexels-photo-6873123.jpeg");
    background-size: cover;
    background-position: center;
    opacity: 0.5;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
  }

  /* ── Tablet ── */
  @media (max-width: 1023px) {
    min-height: 100svh;
    align-items: flex-end;

    &::after {
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.97) 0%,
        rgba(0, 0, 0, 0.75) 45%,
        rgba(0, 0, 0, 0.3) 100%
      );
    }
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    min-height: 100svh;
    align-items: flex-end;
  }
`;

// ─── Hero Inner ────────────────────────────────────────────────────────────────
export const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 1280px) {
    gap: 48px;
    padding: 80px 48px;
  }

  /* ── Tablet: single column, content at bottom ── */
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    padding: 0 0 56px;
    gap: 0;
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    padding: 0 0 40px;
    gap: 0;
  }
`;

// ─── Left Content ──────────────────────────────────────────────────────────────
export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeInUp} 0.8s ease both;

  /* ── Tablet: centered, padded ── */
  @media (max-width: 1023px) {
    align-items: center;
    text-align: center;
    padding: 0 40px;
    gap: 18px;
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    align-items: center;
    text-align: center;
    padding: 0 20px;
    gap: 16px;
  }
`;

// ─── Badge ─────────────────────────────────────────────────────────────────────
export const BadgeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(204, 0, 0, 0.35);
  border-radius: 100px;
  padding: 6px 14px;
  width: fit-content;
`;

export const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #cc0000;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const BadgeText = styled.span`
  font-family: "Barlow Condensed", "Arial Narrow", Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #cc0000;
`;

// ─── Title ─────────────────────────────────────────────────────────────────────
export const HeroTitle = styled.h1`
  font-family: "Barlow Condensed", "Arial Narrow", Arial, sans-serif;
  font-size: clamp(3.5rem, 8vw, 7rem);
  font-weight: 900;
  line-height: 0.9;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0;

  .gold {
    color: #cc0000;
    display: block;
  }

  /* ── Tablet ── */
  @media (max-width: 1023px) {
    font-size: clamp(3.8rem, 12vw, 6rem);
    line-height: 0.88;
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    font-size: clamp(3rem, 14vw, 4.5rem);
    line-height: 0.9;
  }
`;

// ─── Subtitle ──────────────────────────────────────────────────────────────────
export const HeroSubtitle = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.05rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.65;
  max-width: 400px;
  margin: 0;

  /* ── Tablet ── */
  @media (max-width: 1023px) {
    font-size: 1rem;
    max-width: 520px;
  }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    font-size: 0.9rem;
    max-width: 320px;
  }
`;

// ─── Gold Divider ──────────────────────────────────────────────────────────────
export const GoldDivider = styled.div`
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, #cc0000, #ff4444, #cc0000);
  margin-bottom: -4px;

  @media (max-width: 1023px) {
    margin: 0 auto -4px;
  }
`;

// ─── CTA Group ─────────────────────────────────────────────────────────────────
export const CTAGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 1023px) {
    justify-content: center;
  }

  /* ── Mobile: stack buttons full width ── */
  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }
`;

export const PrimaryButton = styled.button`
  background: #cc0000;
  color: #fff;
  border: none;
  padding: 15px 28px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: #e60000;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(204, 0, 0, 0.4);

    &::before {
      opacity: 1;
      animation: ${shimmer} 0.7s ease;
    }
  }

  &:active {
    transform: translateY(0);
  }

  .arrow {
    transition: transform 0.2s ease;
  }

  &:hover .arrow {
    transform: translateX(4px);
  }

  /* ── Mobile: full width ── */
  @media (max-width: 767px) {
    width: 100%;
    padding: 17px 28px;
    font-size: 1rem;
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 14px 24px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  transition: all 0.25s ease;
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );

  &:hover {
    color: #ffffff;
    border-color: #cc0000;
    background: rgba(204, 0, 0, 0.08);
  }

  /* ── Mobile: full width ── */
  @media (max-width: 767px) {
    width: 100%;
    padding: 15px 24px;
    font-size: 1rem;
  }
`;

// ─── Stats Row (tablet + mobile only) ─────────────────────────────────────────
export const StatsRow = styled.div`
  display: none;

  /* ── Tablet + Mobile: show stats strip ── */
  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    width: 100%;
    padding: 20px 40px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    margin-top: 8px;
  }

  @media (max-width: 767px) {
    padding: 16px 20px 0;
    gap: 0;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex: 1;

  /* Vertical divider between items */
  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const StatNumber = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: #cc0000;
  line-height: 1;
  letter-spacing: -0.01em;

  @media (max-width: 767px) {
    font-size: 1.25rem;
  }
`;

export const StatLabel = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
`;

// ─── Desktop Products Grid ─────────────────────────────────────────────────────
export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  animation: ${fadeInUp} 0.8s ease 0.2s both;

  /* ── Tablet + Mobile: hide desktop grid ── */
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const ProductCard = styled.div`
  background: rgba(10, 10, 10, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${float} ${({ $delay }) => 3.5 + (($delay * 10) % 2)}s ease-in-out
    infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  &:nth-child(2),
  &:nth-child(5) {
    transform: translateY(24px);
  }

  &:hover {
    border-color: rgba(204, 0, 0, 0.45);
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(204, 0, 0, 0.2);
    animation-play-state: paused;

    img {
      transform: scale(1.08);
    }
  }
`;

export const ProductImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #111;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    filter: brightness(0.85) contrast(1.1);
  }
`;

// ─── Scrolling Ticker Strip (tablet + mobile only) ────────────────────────────
export const TickerWrapper = styled.div`
  display: none;

  @media (max-width: 1023px) {
    display: block;
    width: 100%;
    overflow: hidden;
    padding: 28px 0 32px;
    /* Fade edges */
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 12%,
      black 88%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 12%,
      black 88%,
      transparent 100%
    );
  }
`;

export const TickerTrack = styled.div`
  display: flex;
  gap: 12px;
  width: max-content;
  animation: ${scrollLeft} 22s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

export const TickerCard = styled.div`
  width: 130px;
  flex-shrink: 0;
  background: rgba(15, 15, 15, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.25s ease;

  &:hover {
    border-color: rgba(204, 0, 0, 0.45);
  }

  @media (max-width: 767px) {
    width: 110px;
  }
`;

export const TickerImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #111;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.85) contrast(1.1);
    transition: transform 0.4s ease;
  }

  ${TickerCard}:hover & img {
    transform: scale(1.08);
  }
`;

export const TickerLabel = styled.div`
  padding: 8px 10px;

  p {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
    margin: 0 0 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: #cc0000;
  }
`;
