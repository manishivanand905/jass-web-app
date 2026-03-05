import styled from "styled-components";

export const MobileComparisonSection = styled.section`
  display: none;
  padding: 60px 20px;
  background: #0a0a0a;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const Eyebrow = styled.div`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  font-family: "Barlow Condensed", sans-serif;
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 900;
  color: #fff;
  margin: 0 0 12px;
  line-height: 1;

  span {
    color: #cc0000;
  }
`;

export const Subtitle = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  line-height: 1.6;
`;

export const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const ComparisonCard = styled.button`
  background: rgba(255, 255, 255, 0.02);
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 32px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  clip-path: polygon(
    0 0,
    calc(100% - 12px) 0,
    100% 12px,
    100% 100%,
    12px 100%,
    0 calc(100% - 12px)
  );

  &:hover {
    border-color: #cc0000;
    background: rgba(204, 0, 0, 0.05);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(204, 0, 0, 0.2);
  }

  i {
    font-size: 2.5rem;
    color: #cc0000;
    margin-bottom: 16px;
    display: block;
  }

  h3 {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
    margin: 0 0 8px;
  }

  p {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 0.9rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
    line-height: 1.5;
  }
`;
