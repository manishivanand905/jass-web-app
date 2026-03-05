import styled from 'styled-components';

export const CeramicVisualiserWrap = styled.div`
  width: 100%;
  padding: 60px 20px;
  background: #0a0a0a;
`;

export const CeramicContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const CeramicHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const CeramicTitle = styled.h2`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 12px;
  
  span {
    color: #cc0000;
  }
`;

export const CeramicSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.125rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
`;

export const UploadZone = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 40px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.02);
  border: 2px dashed rgba(204, 0, 0, 0.25);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #cc0000;
    background: rgba(255, 255, 255, 0.04);
  }
  
  i {
    font-size: 3rem;
    color: #cc0000;
    margin-bottom: 16px;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 8px;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const SideBySideWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ImageCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ImageLabel = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 16px;
  background: ${props => props.$after ? '#cc0000' : 'rgba(0, 0, 0, 0.8)'};
  border-radius: 4px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 2;
`;

export const CarImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: ${props => props.$shine ? 'brightness(1.2) contrast(1.15) saturate(1.3)' : 'none'};
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

export const ClearBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px auto 0;
  padding: 12px 24px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #ffffff;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #cc0000;
    background: rgba(204, 0, 0, 0.1);
  }
  
  i {
    font-size: 1rem;
  }
`;
