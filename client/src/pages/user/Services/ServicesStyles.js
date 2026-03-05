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

export const ServicesWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background-image: url("https://images.pexels.com/photos/20051463/pexels-photo-20051463.jpeg");
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
  max-width: 700px;
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
  max-width: 600px;
`;

export const StatsStrip = styled.div`
  background: #111111;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 40px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  animation: ${fadeInUp} 0.8s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    padding: 30px;
  }
`;

export const StatBlock = styled.div`
  text-align: center;
`;

export const StatNumber = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 3rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 8px;
`;

export const StatLabel = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
`;

export const StatDivider = styled.div`
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ServiceSection = styled.section`
  padding: 100px 60px;
  background: ${(props) => (props.$reverse ? "#0d0d0d" : "#0a0a0a")};

  @media (max-width: 768px) {
    padding: 60px 30px;
  }
`;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.$reverse ? "1fr 1fr" : "1fr 1fr")};
  gap: 60px;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

export const ImagePanel = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(204, 0, 0, 0.2);
`;

export const ServiceImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  filter: brightness(0.8);

  @media (max-width: 768px) {
    height: 350px;
  }
`;

export const ImageBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 8px 16px;
  background: #cc0000;
  color: #ffffff;
  border-radius: 20px;
`;

export const ContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ServiceEyebrow = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #cc0000;
`;

export const ServiceTitle = styled.h2`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 0.9;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;

  span {
    color: #cc0000;
  }
`;

export const ServiceDescription = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.05rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0;
`;

export const TiersRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TierCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 18px 16px;
  text-align: center;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(204, 0, 0, 0.6);
    background: rgba(204, 0, 0, 0.05);
    transform: translateY(-3px);
  }
`;

export const TierIcon = styled.div`
  font-size: 22px;
  color: #cc0000;
  margin-bottom: 8px;
`;

export const TierName = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 6px;
`;

export const TierCoverage = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 0.8rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
  min-height: 30px;
`;

export const TierPrice = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.35rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 10px;
`;

export const TierButton = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #cc0000;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    color: #ff0000;
  }
`;

export const BenefitsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BenefitItem = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 10px;

  i {
    color: #cc0000;
    font-size: 14px;
  }
`;

export const ComboSection = styled.section`
  padding: 100px 60px;
  background: #0d0d0d;

  @media (max-width: 768px) {
    padding: 60px 30px;
  }
`;

export const ComboHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

export const ComboGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ComboCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid
    ${(props) =>
      props.$popular ? "rgba(204, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.1)"};
  border-radius: 12px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    border-color: rgba(204, 0, 0, 0.6);
    transform: translateY(-6px);
  }
`;

export const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 16px;
  background: #cc0000;
  color: #ffffff;
  border-radius: 20px;
  z-index: 1;
`;

export const ComboTopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #cc0000;
  border-radius: 12px 12px 0 0;
  z-index: 0;
`;

export const ComboIconCircle = styled.div`
  width: 70px;
  height: 70px;
  background: rgba(204, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;

  i {
    font-size: 32px;
    color: #cc0000;
  }
`;

export const ComboName = styled.h3`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.75rem;
  font-weight: 900;
  color: #ffffff;
  text-transform: uppercase;
  margin: 0 0 20px 0;
`;

export const ComboIncludes = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    i {
      color: #cc0000;
      font-size: 12px;
    }
  }
`;

export const ComboPricing = styled.div`
  margin-bottom: 24px;
`;

export const OldPrice = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: line-through;
  margin-bottom: 4px;
`;

export const NewPrice = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 2.25rem;
  font-weight: 900;
  color: #ffffff;
`;

export const ComboButton = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  width: 100%;
  padding: 14px;
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
`;

export const CTABanner = styled.section`
  padding: 100px 60px;
  background:
    radial-gradient(circle at center, rgba(204, 0, 0, 0.1), transparent 70%),
    #0a0a0a;
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
  display: flex;
  align-items: center;
  gap: 10px;
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
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;

  &:hover {
    border-color: #cc0000;
    color: #cc0000;
  }

  i {
    font-size: 16px;
  }
`;
