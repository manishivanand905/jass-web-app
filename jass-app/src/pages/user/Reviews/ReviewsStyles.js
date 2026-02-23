import styled from "styled-components";

export const ReviewsWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background-image: url("https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 60px;
  border-top: 2px solid #cc0000;

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

export const StatsStrip = styled.div`
  background: #111111;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 40px 60px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const OverallScore = styled.div`
  text-align: center;
`;

export const ScoreNumber = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 5rem;
  font-weight: 900;
  color: white;
  line-height: 1;
  margin-bottom: 10px;
`;

export const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 10px;
`;

export const ScoreLabel = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
`;

export const BreakdownBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BreakdownRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);

  span:first-child {
    min-width: 30px;
  }
`;

export const BarTrack = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const BarFill = styled.div`
  height: 100%;
  width: ${props => props.$percentage}%;
  background: #cc0000;
  transition: width 0.5s ease;
`;

export const Percentage = styled.span`
  min-width: 40px;
  text-align: right;
  color: rgba(255, 255, 255, 0.5);
`;

export const ServiceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ServiceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;

  span {
    color: rgba(255, 255, 255, 0.7);
  }

  div {
    color: white;
    font-weight: 600;

    i {
      color: #cc0000;
      font-size: 14px;
    }
  }
`;

export const TrustBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);

  i {
    color: #cc0000;
    font-size: 18px;
  }
`;

export const FilterBar = styled.div`
  position: sticky;
  top: 70px;
  z-index: 100;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding: 20px 40px;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    padding: 15px 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterPills = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const FilterPill = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid ${props => props.$active ? "#cc0000" : "rgba(255, 255, 255, 0.2)"};
  background: ${props => props.$active ? "#cc0000" : "transparent"};
  color: ${props => props.$active ? "white" : "rgba(255, 255, 255, 0.7)"};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #cc0000;
    color: white;
  }
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 15px;
  flex: 1;
  min-width: 250px;
  transition: all 0.3s;

  &:focus-within {
    border-color: #cc0000;
    box-shadow: 0 0 15px rgba(204, 0, 0, 0.2);
  }

  i {
    color: rgba(204, 0, 0, 0.7);
    font-size: 14px;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 15px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const SortSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const SortLabel = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
`;

export const SortSelect = styled.select`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.9rem;
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #cc0000;
  }

  option {
    background: #1a1a1a;
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const ResultsCount = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  padding: 20px 40px;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

export const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 40px 60px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 0 20px 40px;
  }
`;

export const FeaturedCard = styled.div`
  grid-column: 1 / -1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 400px 1fr;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const FeaturedBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 14px;
  background: #cc0000;
  color: white;
  border-radius: 15px;
`;

export const FeaturedImage = styled.div`
  position: relative;
  height: 100%;
  min-height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 80px;
    color: white;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);
      color: #cc0000;
    }
  }
`;

export const FeaturedContent = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 1.3rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.85;
    margin: 0;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 0.95rem;

    i {
      color: rgba(255, 255, 255, 0.5);
      font-size: 24px;
    }

    strong {
      color: white;
    }

    span {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  @media (max-width: 1024px) {
    padding: 30px;
  }
`;

export const LoadMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 40px;
  background: #cc0000;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin: 0 auto 60px;
  transition: all 0.3s;

  &:hover {
    background: #ff0000;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(204, 0, 0, 0.4);
  }

  i {
    font-size: 14px;
  }
`;
