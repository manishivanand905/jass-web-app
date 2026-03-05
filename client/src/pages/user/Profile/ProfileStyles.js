import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
`;

export const HeroBanner = styled.div`
  height: 220px;
  background: linear-gradient(to bottom, rgba(10,10,10,0.6), rgba(10,10,10,0.95)), url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1600') center/cover;
  border-top: 3px solid #cc0000;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 30px 5%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(204,0,0,0.12), transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    height: 170px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 1;
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #cc0000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: rgba(10,10,10,0.8);

  i {
    font-size: 50px;
    color: #cc0000;
  }
`;

export const CameraButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #0d0d0d;
  border: 2px solid #cc0000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;

  i {
    font-size: 12px;
    color: white;
  }

  &:hover {
    background: #cc0000;
  }
`;

export const HeroInfo = styled.div`
  h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.8rem;
    font-weight: 900;
    color: white;
    margin-bottom: 5px;
  }

  p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    color: rgba(255,255,255,0.5);
    font-size: 0.9rem;
  }
`;

export const VerifiedBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #27ae60;
  font-size: 0.7rem;
  margin-top: 5px;

  i {
    font-size: 0.7rem;
  }
`;

export const StatPills = styled.div`
  display: flex;
  gap: 15px;
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StatPill = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
  transition: 0.3s;

  i {
    color: #cc0000;
  }

  &:hover {
    border-color: #cc0000;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 5%;
  gap: 40px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const SideNav = styled.div`
  width: 240px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 100%;
    display: flex;
    gap: 10px;
    overflow-x: auto;
  }
`;

export const NavTab = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  background: ${props => props.$active ? 'rgba(204,0,0,0.08)' : 'transparent'};
  border: none;
  border-left: ${props => props.$active ? '3px solid #cc0000' : '3px solid transparent'};
  color: ${props => props.$active ? 'white' : 'rgba(255,255,255,0.4)'};
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: 0.3s;

  i {
    color: ${props => props.$active ? '#cc0000' : 'rgba(255,255,255,0.4)'};
  }

  &:hover {
    background: rgba(204,0,0,0.05);
    color: white;
  }

  @media (max-width: 1024px) {
    border-left: none;
    border-bottom: ${props => props.$active ? '3px solid #cc0000' : '3px solid transparent'};
    white-space: nowrap;
  }
`;

export const MainContent = styled.div`
  flex: 1;
`;

export const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  margin-bottom: 10px;

  span {
    color: white;
  }

  &::after {
    content: ' Profile Details';
    color: #cc0000;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #B0B0B0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px 12px 45px;
  background: ${props => props.$error ? 'rgba(204,0,0,0.05)' : 'rgba(255,255,255,0.04)'};
  border: 1px solid ${props => props.$error ? '#cc0000' : 'rgba(255,255,255,0.1)'};
  border-radius: 6px;
  color: white;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.95rem;
  transition: 0.3s;

  &:focus {
    outline: none;
    border-color: #cc0000;
    box-shadow: 0 0 0 3px rgba(204,0,0,0.12);
  }
`;

export const InputIcon = styled.i`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(204,0,0,0.5);
  font-size: 0.9rem;
`;

export const ErrorText = styled.span`
  font-size: 0.65rem;
  color: #cc0000;
  display: flex;
  align-items: center;
  gap: 5px;

  i {
    font-size: 0.65rem;
  }
`;

export const SaveButton = styled.button`
  flex: 1;
  padding: 15px;
  background: #cc0000;
  color: white;
  border: none;
  border-radius: 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.3s;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));

  &:hover:not(:disabled) {
    background: #a00000;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DiscardButton = styled.button`
  padding: 15px 30px;
  background: transparent;
  color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: white;
    border-color: rgba(255,255,255,0.4);
  }
`;
