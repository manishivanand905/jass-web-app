import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ExploreWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background-image: url("https://images.pexels.com/photos/7154635/pexels-photo-7154635.jpeg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 60px;

  @media (max-width: 768px) {
    height: 280px;
    padding: 0 30px;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
`;

export const Eyebrow = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 12px;
`;

export const HeroTitle = styled.h1`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 0.9;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0 0 16px 0;

  span {
    color: #cc0000;
  }
`;

export const HeroSubtitle = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.6;
`;

export const FilterBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 20px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px 30px;
    align-items: stretch;
  }
`;

export const FilterLeft = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FilterPill = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 10px 24px;
  border-radius: 25px;
  border: 1px solid
    ${(props) => (props.$active ? "#cc0000" : "rgba(255, 255, 255, 0.2)")};
  background: ${(props) => (props.$active ? "#cc0000" : "transparent")};
  color: ${(props) => (props.$active ? "#ffffff" : "rgba(255, 255, 255, 0.6)")};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #cc0000;
    color: #ffffff;
    background: ${(props) =>
      props.$active ? "#cc0000" : "rgba(204, 0, 0, 0.1)"};
  }
`;

export const FilterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SortLabel = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
`;

export const SortSelect = styled.select`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.875rem;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #cc0000;
    background: rgba(204, 0, 0, 0.1);
  }

  option {
    background: #1a1a1a;
    color: #ffffff;
  }
`;

export const ResultsCount = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.35);
  padding: 20px 60px;

  @media (max-width: 768px) {
    padding: 20px 30px;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 60px 80px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 30px 60px;
  }
`;

export const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  animation: ${fadeInUp} 0.6s ease both;
  animation-delay: ${(props) => props.$delay}s;

  &:hover {
    border-color: rgba(204, 0, 0, 0.5);
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(204, 0, 0, 0.2);

    img {
      transform: scale(1.1);
    }
  }
`;

export const ProductImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3/2;
  overflow: hidden;
  background: #111;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.9);
    transition: transform 0.5s;
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 14px;
  background: #cc0000;
  color: #ffffff;
  border-radius: 20px;
`;

export const ProductInfo = styled.div`
  padding: 24px;
`;

export const Category = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 8px;
`;

export const ProductName = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const Stars = styled.div`
  display: flex;
  gap: 4px;

  i {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.2);

    &.filled {
      color: #cc0000;
    }
  }
`;

export const RatingCount = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.4);
`;

export const Description = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 0.95rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 20px 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Price = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
`;

export const ViewButton = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;

  &:hover {
    color: #cc0000;

    i {
      transform: translateX(4px);
    }
  }

  i {
    font-size: 12px;
    transition: transform 0.3s;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 40px;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 80px;
  color: rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
`;

export const EmptyTitle = styled.h3`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 12px 0;
`;

export const EmptyText = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 32px 0;
`;

export const ViewAllButton = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 12px 32px;
  background: #cc0000;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #ff0000;
    transform: translateY(-2px);
  }
`;
