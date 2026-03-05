import styled, { keyframes } from "styled-components";

// ─── Animations ────────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

// ─── Section Wrapper ───────────────────────────────────────────────────────────
export const SectionWrapper = styled.section`
  background: #0a0a0a;
  padding: 100px 60px 110px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
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
  max-width: 1400px;
  margin: 0 auto;
`;

// ─── Header ────────────────────────────────────────────────────────────────────
export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
  animation: ${fadeInUp} 0.7s ease both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 48px;
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

// ─── Cards Grid ────────────────────────────────────────────────────────────────
export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

// ─── Review Card ───────────────────────────────────────────────────────────────
export const ReviewCard = styled.article`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 24px 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  transition:
    border-color 0.3s ease,
    background 0.3s ease,
    transform 0.3s ease;
  animation: ${fadeInUp} 0.7s ease ${({ $delay }) => $delay || "0s"} both;

  &:hover {
    border-color: rgba(204, 0, 0, 0.35);
    background: rgba(204, 0, 0, 0.03);
    transform: translateY(-5px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 20px 18px 24px;
  }
`;

// ─── Card Top Row ──────────────────────────────────────────────────────────────
export const CardTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StarsRow = styled.div`
  display: flex;
  gap: 2px;

  i {
    font-size: 0.875rem;
    color: #cc0000;

    &.empty {
      color: rgba(204, 0, 0, 0.25);
    }
  }
`;

export const QuoteIcon = styled.div`
  i {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.1);
    line-height: 1;
  }
`;

// ─── Review Text ───────────────────────────────────────────────────────────────
export const ReviewText = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 0.9rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
  margin: 0;
  flex: 1;
`;

// ─── Author ────────────────────────────────────────────────────────────────────
export const AuthorBlock = styled.div`
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const AuthorName = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.03em;
  color: #ffffff;
  text-transform: none;
`;

export const AuthorVehicle = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.04em;
`;
