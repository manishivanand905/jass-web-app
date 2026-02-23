import styled, { keyframes } from "styled-components";

// ─── Animations ────────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const iconPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(204, 0, 0, 0.4); }
  50%       { box-shadow: 0 0 0 12px rgba(204, 0, 0, 0); }
`;

// ─── Section Wrapper ───────────────────────────────────────────────────────────
export const SectionWrapper = styled.section`
  background: #0d0d0d;
  padding: 100px 60px 110px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 400px;
    background: radial-gradient(
      ellipse at center,
      rgba(204, 0, 0, 0.05) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
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
  max-width: 1400px;
  margin: 0 auto;
`;

// ─── Header ────────────────────────────────────────────────────────────────────
export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 72px;
  animation: ${fadeInUp} 0.7s ease both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 52px;
  }
`;

export const Eyebrow = styled.p`
  font-family: "Barlow Condensed", "Arial Narrow", Arial, sans-serif;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 16px;
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

// ─── Features Grid ─────────────────────────────────────────────────────────────
export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

// ─── Feature Card ──────────────────────────────────────────────────────────────
export const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 44px 32px 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transition:
    border-color 0.3s ease,
    background 0.3s ease,
    transform 0.3s ease;
  animation: ${fadeInUp} 0.7s ease ${({ $delay }) => $delay || "0s"} both;

  &:hover {
    border-color: rgba(204, 0, 0, 0.35);
    background: rgba(204, 0, 0, 0.04);
    transform: translateY(-6px);
  }

  &:hover .icon-circle {
    animation: ${iconPulse} 1.2s ease infinite;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 36px 24px 40px;
  }
`;

export const IconCircle = styled.div.attrs({ className: "icon-circle" })`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #cc0000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    font-size: 1.55rem;
    color: #ffffff;
    line-height: 1;
  }
`;

export const FeatureTitle = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: #ffffff;
  line-height: 1.2;
  margin: 0;
`;

export const FeatureDescription = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.75;
  margin: 0;
  max-width: 260px;
`;
