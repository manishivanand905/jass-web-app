import styled from "styled-components";

export const ComparisonWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background-image: url("https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg");
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

  @media (max-width: 768px) {
    max-width: 100%;
  }
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

export const TabSwitcher = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 40px 20px;
  background: #0d0d0d;

  @media (max-width: 640px) {
    flex-direction: column;
    padding: 30px 20px;
    gap: 15px;
  }
`;

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 16px 40px;
  border-radius: 30px;
  border: 2px solid ${props => props.$active ? "#cc0000" : "rgba(255, 255, 255, 0.2)"};
  background: ${props => props.$active ? "#cc0000" : "transparent"};
  color: ${props => props.$active ? "white" : "rgba(255, 255, 255, 0.7)"};
  cursor: pointer;
  transition: all 0.3s;

  i {
    font-size: 18px;
  }

  &:hover {
    border-color: #cc0000;
    color: white;
    background: ${props => props.$active ? "#cc0000" : "rgba(204, 0, 0, 0.1)"};
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const TableSection = styled.div`
  display: ${props => props.$active ? "block" : "none"};
  opacity: ${props => props.$active ? "1" : "0"};
  transform: translateY(${props => props.$active ? "0" : "20px"});
  transition: all 0.4s ease;
`;
