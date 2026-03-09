import styled from "styled-components";

export const ContactWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background-image: url("https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg");
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
  background: linear-gradient(105deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.3) 100%);
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

export const QuickContactStrip = styled.div`
  background: #111111;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactBlock = styled.div`
  padding: 40px 30px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:last-child {
    border-right: none;
  }

  &:hover {
    border-bottom: 3px solid #cc0000;
    transform: translateY(-4px);
    background: rgba(204, 0, 0, 0.05);
  }

  @media (max-width: 1024px) {
    &:nth-child(2n) {
      border-right: none;
    }
  }

  @media (max-width: 640px) {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
`;

export const ContactIcon = styled.div`
  font-size: 32px;
  color: #cc0000;
  margin-bottom: 15px;
`;

export const ContactLabel = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
`;

export const ContactValue = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
`;

export const ContactSubtext = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 0.9rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.4);
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 60px 20px;
  }
`;

export const LeftColumn = styled.div``;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 24px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 20px;

  i {
    font-size: 18px;
  }
`;

export const HoursTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HoursRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: ${props => props.$isToday ? "rgba(204, 0, 0, 0.08)" : "transparent"};
  border-left: ${props => props.$isToday ? "3px solid #cc0000" : "3px solid transparent"};
  border-radius: 4px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;

  span:first-child {
    color: rgba(255, 255, 255, 0.7);
  }

  span:last-child {
    color: white;
    font-weight: 600;
  }
`;

export const StatusBadge = styled.div`
  margin-left: auto;
  font-size: 0.7rem;
  padding: 4px 10px;
  border-radius: 12px;
  background: ${props => props.$open ? "rgba(0, 200, 0, 0.1)" : "rgba(200, 0, 0, 0.1)"};
  border: 1px solid ${props => props.$open ? "rgba(0, 200, 0, 0.3)" : "rgba(200, 0, 0, 0.3)"};
  color: ${props => props.$open ? "#00cc00" : "#cc0000"};
`;

export const WhyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const WhyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);

  i {
    color: #cc0000;
    font-size: 18px;
    width: 24px;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`;

export const SocialButton = styled.a`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  font-size: 20px;
  transition: all 0.3s;
  text-decoration: none;

  &:hover {
    background: #cc0000;
    border-color: #cc0000;
    transform: scale(1.1);
  }
`;

export const MapSection = styled.div`
  position: relative;
  width: 100%;
  height: 420px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  filter: invert(90%) hue-rotate(180deg);
`;

export const MapOverlay = styled.div`
  position: absolute;
  bottom: 30px;
  left: 40px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 24px;
  max-width: 350px;

  i {
    font-size: 24px;
    color: #cc0000;
    margin-bottom: 12px;
  }

  h3 {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
    margin: 0 0 8px 0;
  }

  p {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 0.95rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 16px 0;
  }

  a {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #cc0000;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      color: #ff0000;
    }
  }

  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
    max-width: none;
  }
`;

export const CTABanner = styled.section`
  padding: 100px 60px;
  background: radial-gradient(circle at center, rgba(204, 0, 0, 0.1), transparent 70%), #0d0d0d;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 30px;
  }
`;

export const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const CTATitle = styled.h2`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 0 16px 0;

  span {
    color: #cc0000;
  }
`;

export const CTASubtitle = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 40px 0;
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 16px 32px;
  background: #cc0000;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #ff0000;
    transform: translateY(-2px);
  }

  i {
    font-size: 16px;
  }
`;

export const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 16px 32px;
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;

  &:hover {
    border-color: #cc0000;
    color: #cc0000;
  }

  i {
    font-size: 16px;
  }
`;

export const FooterFix = styled.div`
  @media (max-width: 1024px) {
    margin-bottom: -70px;
  }
`;
