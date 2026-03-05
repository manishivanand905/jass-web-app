import styled, { keyframes } from "styled-components";

// ─── Animations ────────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const rotatePulse = keyframes`
  0%   { transform: rotate(0deg) scale(1);    opacity: 0.25; }
  50%  { transform: rotate(180deg) scale(1.05); opacity: 0.4;  }
  100% { transform: rotate(360deg) scale(1);  opacity: 0.25; }
`;

const iconGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 4px rgba(204,0,0,0.0)); }
  50%       { filter: drop-shadow(0 0 10px rgba(204,0,0,0.7)); }
`;

// ─── Section Wrapper ───────────────────────────────────────────────────────────
export const SectionWrapper = styled.section`
  background: #0a0a0a;
  padding: 100px 60px 110px;
  position: relative;
  overflow: hidden;

  /* top fade */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #cc0000, transparent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 80px 40px 90px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 64px 24px 72px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 52px 16px 60px;
  }
`;

export const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1300px;
  margin: 0 auto;
`;

// ─── Header ────────────────────────────────────────────────────────────────────
export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  animation: ${fadeInUp} 0.7s ease both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 56px;
  }
`;

export const Eyebrow = styled.p`
  font-family: "Barlow Condensed", "Arial Narrow", Arial, sans-serif;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 14px;
`;

export const SectionTitle = styled.h2`
  font-family: "Barlow Condensed", "Arial Narrow", Arial, sans-serif;
  font-size: clamp(2.6rem, 6vw, 5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1;
  color: #ffffff;

  span {
    color: #cc0000;
  }
`;

// ─── Steps Row ─────────────────────────────────────────────────────────────────
export const StepsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  position: relative;

  /* Horizontal connector line between circles */
  &::before {
    content: "";
    position: absolute;
    top: 72px; /* vertically centred with circles */
    left: calc(100% / 6);
    right: calc(100% / 6);
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(204, 0, 0, 0.3) 20%,
      rgba(204, 0, 0, 0.3) 80%,
      transparent 100%
    );
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 48px;

    &::before {
      display: none;
    }
  }
`;

// ─── Single Step ───────────────────────────────────────────────────────────────
export const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 24px;
  animation: ${fadeInUp} 0.7s ease ${({ $delay }) => $delay || "0s"} both;
  position: relative;
  z-index: 1;
`;

// ─── Icon Block ────────────────────────────────────────────────────────────────
export const IconBlock = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* The rotating dashed ring behind the circle */
export const RingOuter = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px dashed rgba(204, 0, 0, 0.2);
  animation: ${rotatePulse} 8s linear infinite;
`;

/* Dark filled circle */
export const IconCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #1a1a1a 0%, #0d0d0d 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease;

  i {
    font-size: 1.75rem;
    color: #cc0000;
    transition: filter 0.35s ease;
  }

  /* Hover — glow ring + icon glow */
  ${StepItem}:hover & {
    border-color: rgba(204, 0, 0, 0.5);
    box-shadow:
      0 0 28px rgba(204, 0, 0, 0.18),
      inset 0 0 16px rgba(204, 0, 0, 0.06);

    i {
      animation: ${iconGlow} 1.4s ease infinite;
    }
  }
`;

/* Step number badge — top-right of the outer ring */
export const StepNumber = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.08em;
  color: #cc0000;
  z-index: 3;
  line-height: 1;
`;

// ─── Text ──────────────────────────────────────────────────────────────────────
export const StepTitle = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: #ffffff;
  line-height: 1.2;
  margin: 0 0 16px;
`;

export const StepDescription = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.8;
  margin: 0;
  max-width: 280px;
`;
