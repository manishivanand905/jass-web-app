import styled from "styled-components";

export const VisualiserWrapper = styled.div`
  padding: 80px 40px;
  background: #0d0d0d;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
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

export const Title = styled.h2`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 0.9;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 0 16px 0;

  span {
    color: #cc0000;
  }
`;

export const Subtitle = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.05rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  max-width: 700px;
  margin: 0 auto;
`;

export const ProtectionSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 0 auto 40px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ProtectionCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid ${props => props.$active ? "#cc0000" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  i {
    font-size: 40px;
    color: ${props => props.$active ? "#cc0000" : "rgba(255, 255, 255, 0.5)"};
    margin-bottom: 15px;
    transition: all 0.3s;
  }

  h3 {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: white;
    margin: 0 0 8px 0;
  }

  p {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 0.95rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
  }

  &:hover {
    border-color: #cc0000;
    background: rgba(204, 0, 0, 0.05);

    i {
      color: #cc0000;
      transform: scale(1.1);
    }
  }
`;

export const VehicleTypeSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

export const VehicleTypeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 12px 24px;
  border-radius: 25px;
  border: 1px solid ${props => props.$active ? "#cc0000" : "rgba(255, 255, 255, 0.2)"};
  background: ${props => props.$active ? "#cc0000" : "transparent"};
  color: ${props => props.$active ? "white" : "rgba(255, 255, 255, 0.7)"};
  cursor: pointer;
  transition: all 0.3s;

  i {
    font-size: 16px;
  }

  &:hover {
    border-color: #cc0000;
    color: white;
  }
`;

export const UploadPanel = styled.div`
  max-width: 900px;
  margin: 0 auto 40px;
`;

export const UploadZone = styled.div`
  border: 2px dashed rgba(204, 0, 0, 0.3);
  border-radius: 12px;
  padding: 80px 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.02);

  &:hover {
    border-color: #cc0000;
    background: rgba(204, 0, 0, 0.05);
  }

  @media (max-width: 768px) {
    padding: 60px 30px;
  }
`;

export const UploadIcon = styled.div`
  font-size: 60px;
  color: rgba(204, 0, 0, 0.7);
  margin-bottom: 20px;
`;

export const UploadText = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
`;

export const UploadSubtext = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 0.95rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const VisualiserPanel = styled.div`
  max-width: 900px;
  margin: 0 auto 40px;
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 12px;
  cursor: ew-resize;
  user-select: none;
`;

export const ImageHalf = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  clip-path: ${props => props.$side === "before" 
    ? `inset(0 ${100 - props.$position}% 0 0)` 
    : `inset(0 0 0 ${props.$position}%)`};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: ${props => {
      if (props.$side === "after") {
        const intensity = props.$intensity / 100;
        if (props.$type === "ppf") {
          return `brightness(${1 + 0.05 * intensity}) contrast(${1 + 0.1 * intensity}) saturate(${1 - 0.05 * intensity})`;
        } else {
          return `brightness(${1 + 0.1 * intensity}) contrast(${1 + 0.08 * intensity}) saturate(${1 + 0.15 * intensity})`;
        }
      }
      return "none";
    }};
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${props => {
      if (props.$side === "after") {
        const intensity = props.$intensity / 100;
        if (props.$type === "ppf") {
          return `linear-gradient(135deg, rgba(255,255,255,${0.04 * intensity}) 0%, transparent 50%)`;
        } else {
          return `linear-gradient(135deg, rgba(255,255,255,${0.08 * intensity}) 0%, transparent 50%)`;
        }
      }
      return "none";
    }};
    pointer-events: none;
  }
`;

export const SliderHandle = styled.div`
  position: absolute;
  top: 50%;
  left: ${props => props.$position}%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: #cc0000;
  border: 3px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 200vh;
    background: white;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    z-index: -1;
  }
`;

export const Label = styled.div`
  position: absolute;
  top: 20px;
  ${props => props.$side === "before" ? "left: 20px;" : "right: 20px;"}
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${props => props.$side === "before" ? "#1a1a1a" : "#cc0000"};
  color: white;
  z-index: 5;
`;

export const IntensityControl = styled.div`
  margin-top: 30px;
  text-align: center;
`;

export const IntensityLabel = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 15px;
`;

export const IntensitySlider = styled.input`
  width: 100%;
  max-width: 400px;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #cc0000;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(204, 0, 0, 0.5);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #cc0000;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(204, 0, 0, 0.5);
  }
`;

export const BookingCTA = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 900px;
  margin: 60px auto 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const CTACard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 40px 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: rgba(204, 0, 0, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(204, 0, 0, 0.2);
  }
`;

export const CTAIcon = styled.div`
  font-size: 40px;
  color: #cc0000;
  margin-bottom: 20px;
`;

export const CTATitle = styled.h3`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
  margin: 0 0 10px 0;
`;

export const CTAPrice = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
`;

export const CTAButton = styled.button`
  width: 100%;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px;
  background: #cc0000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #ff0000;
  }
`;
