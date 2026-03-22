import styled from "styled-components";

export const DetailWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  padding: 40px 0;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

export const DetailContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 52% 48%;
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
    gap: 30px;
  }
`;

export const ImagePanel = styled.div`
  position: relative;
  background: #0d0d0d;
  border-radius: 12px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ImageBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  background: #cc0000;
  color: white;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 8px 16px;
  border-radius: 20px;
`;

export const MainImage = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

export const ThumbnailStrip = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid ${(props) => (props.$active ? "#cc0000" : "rgba(255,255,255,0.15)")};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: #cc0000;
  }
`;

export const ZoomHint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);

  i {
    font-size: 14px;
  }
`;

export const DetailsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);

  span {
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #cc0000;
    }
  }

  i {
    font-size: 10px;
  }
`;

export const CategoryLabel = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #cc0000;
`;

export const ProductName = styled.h1`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 900;
  text-transform: uppercase;
  color: white;
  margin: 0;
  line-height: 1.1;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  i {
    font-size: 16px;
  }

  span {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);

    &.count {
      color: rgba(255, 255, 255, 0.4);
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #cc0000;
      }
    }
  }
`;

export const Price = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 48px;
  font-weight: 900;
  color: white;
  border-bottom: 2px solid #cc0000;
  padding-bottom: 10px;
  display: inline-block;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    align-items: stretch;
  }
`;

export const PriceCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 14px 24px;
  background: #cc0000;
  border: 1px solid #cc0000;
  border-radius: 10px;
  color: #ffffff;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 24px rgba(204, 0, 0, 0.28);

  &:hover {
    background: #e00000;
    border-color: #e00000;
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(204, 0, 0, 0.38);
  }

  &:disabled {
    border-color: rgba(255, 255, 255, 0.18);
    color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.08);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const Description = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 17px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.85;
  margin: 0;
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
  margin: 10px 0;
`;

export const SectionLabel = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #cc0000;
  margin-top: 10px;
`;

export const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const SpecPill = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 14px;
  transition: all 0.3s;

  .label {
    color: rgba(255, 255, 255, 0.5);
    margin-right: 6px;
  }

  .value {
    color: white;
    font-weight: 600;
  }

  &:hover {
    border-color: rgba(204, 0, 0, 0.3);
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);

  i {
    color: #cc0000;
    font-size: 16px;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const BookButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: transparent;
  border: 1px solid #cc0000;
  min-height: 56px;
  padding: 16px 32px;
  color: #cc0000;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );

  &:hover {
    background: #cc0000;
    color: #ffffff;
    box-shadow: 0 8px 20px rgba(204, 0, 0, 0.4);
  }

  &:disabled {
    border-color: rgba(255, 255, 255, 0.18);
    color: rgba(255, 255, 255, 0.35);
    background: transparent;
    cursor: not-allowed;
    box-shadow: none;
  }

  @media (max-width: 640px) {
    min-height: 48px;
    padding: 14px 24px;
    font-size: 14px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 16px 32px;
  color: white;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #cc0000;
    color: #cc0000;
  }

  i {
    font-size: 16px;
  }
`;
