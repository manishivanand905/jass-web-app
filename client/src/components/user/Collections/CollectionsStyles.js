import styled, { keyframes } from "styled-components";

// ─── Animations ────────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0);     }
`;

const arrowBounce = keyframes`
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(5px); }
`;

// ─── Section Wrapper ───────────────────────────────────────────────────────────
export const SectionWrapper = styled.section`
  background: #0a0a0a;
  padding: 90px 60px 80px;
  position: relative;
  overflow: hidden;

  /* Subtle top border accent */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #cc0000, transparent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 70px 40px 60px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 60px 24px 50px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 48px 16px 40px;
  }
`;

// ─── Section Header ────────────────────────────────────────────────────────────
export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 56px;
  animation: ${fadeInUp} 0.7s ease both;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 40px;
  }
`;

export const SectionEyebrow = styled.p`
  font-family: "Barlow Condensed", "Arial Narrow", Arial, sans-serif;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: 0.25em;
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

// ─── Products Grid ─────────────────────────────────────────────────────────────
export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 56px;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

// ─── Product Card ──────────────────────────────────────────────────────────────
export const ProductCard = styled.article`
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition:
    border-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
  animation: ${fadeInUp} 0.7s ease ${({ $delay }) => $delay || "0s"} both;

  &:hover {
    border-color: rgba(204, 0, 0, 0.45);
    transform: translateY(-6px);
    box-shadow:
      0 20px 48px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(204, 0, 0, 0.2);

    img {
      transform: scale(1.07);
    }

    /* Reveal the "View Details" text */
    .view-details-text {
      opacity: 1;
      color: #cc0000;
    }

    .arrow-icon {
      animation: ${arrowBounce} 0.6s ease infinite;
      color: #cc0000;
    }
  }
`;

export const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #0d0d0d;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    filter: brightness(0.9) contrast(1.05);
  }
`;

export const BadgePill = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
  background: #cc0000;
  color: #ffffff;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 100px;
  z-index: 2;
`;

export const CardBody = styled.div`
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
`;

export const CardCategory = styled.p`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #cc0000;
  margin: 0;
`;

export const CardName = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: #ffffff;
  line-height: 1.25;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

export const CardDescription = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.6;
  margin: 0;
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const CardPrice = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: #ffffff;
  letter-spacing: 0.02em;
`;

export const ViewDetailsBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid #cc0000;
  width: 110px;
  height: 33px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: #cc0000;
  transition:
    color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
  clip-path: polygon(
    0 0,
    calc(100% - 7px) 0,
    100% 7px,
    100% 100%,
    7px 100%,
    0 calc(100% - 7px)
  );

  &:hover {
    color: #ffffff;
    background: #cc0000;
    box-shadow: 0 4px 16px rgba(204, 0, 0, 0.4);

    .arrow-icon {
      color: #ffffff;
    }
  }

  .arrow-icon {
    font-size: 10px;
    color: #cc0000;
    transition: color 0.25s ease;
    margin-left: 6px;
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 128px;
    height: 32px;
  }
`;

// ─── View All Button ───────────────────────────────────────────────────────────
export const ViewAllWrapper = styled.div`
  display: flex;
  justify-content: center;
  animation: ${slideInLeft} 0.7s ease 0.5s both;
`;

export const ViewAllButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  padding: 18px 52px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  /* Red fill on hover */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: #cc0000;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  span,
  i {
    position: relative;
    z-index: 1;
  }

  &:hover {
    border-color: #cc0000;
    color: #ffffff;

    &::before {
      transform: scaleX(1);
    }

    i {
      animation: ${arrowBounce} 0.6s ease infinite;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 16px 36px;
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
