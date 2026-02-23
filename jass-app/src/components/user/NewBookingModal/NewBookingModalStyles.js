import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(40px) scale(0.97); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
`;

const slideUpMobile = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const stepTransitionIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.25s ease;

  @media (max-width: 767px) {
    align-items: flex-end;
  }
`;

export const ModalCard = styled.div`
  background: #0d0d0d;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 3px solid #cc0000;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.85);
  width: 620px;
  max-height: 88vh;
  overflow-y: auto;
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%);
  animation: ${slideUp} 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (max-width: 1023px) {
    width: 92vw;
    max-height: 90vh;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
  }

  @media (max-width: 767px) {
    width: 100vw;
    max-height: 95vh;
    border-radius: 16px 16px 0 0;
    clip-path: none;
    animation: ${slideUpMobile} 0.35s ease;
  }
`;

export const ModalHeader = styled.div`
  position: relative;
  padding: 28px 28px 0;
  
  @media (max-width: 1023px) {
    padding: 22px 22px 0;
  }

  @media (max-width: 767px) {
    padding: 20px 20px 0;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 28px;
  right: 28px;
  width: 34px;
  height: 34px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(204, 0, 0, 0.1);
    border-color: #cc0000;
    color: #cc0000;
  }
`;

export const ProgressStepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
`;

export const StepConnector = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  z-index: 1;
`;

export const StepConnectorFill = styled.div`
  height: 100%;
  background: #cc0000;
  width: ${props => props.progress}%;
  transition: width 0.4s ease;
`;

export const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

export const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.3s ease;
  
  ${props => {
    if (props.completed) {
      return `
        background: #cc0000;
        color: white;
        border: none;
      `;
    } else if (props.active) {
      return `
        background: transparent;
        border: 2px solid #cc0000;
        color: #cc0000;
        box-shadow: 0 0 0 4px rgba(204, 0, 0, 0.2);
      `;
    } else {
      return `
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.4);
      `;
    }
  }}
`;

export const StepLabel = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 8px;
  color: ${props => props.active ? '#cc0000' : 'rgba(255, 255, 255, 0.4)'};
  transition: color 0.3s ease;

  @media (max-width: 380px) {
    display: none;
  }
`;

export const StepContent = styled.div`
  padding: 0 28px 28px;
  animation: ${stepTransitionIn} 0.3s ease;

  @media (max-width: 1023px) {
    padding: 0 22px 22px;
  }

  @media (max-width: 767px) {
    padding: 0 20px 20px;
  }
`;

export const StepEyebrow = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 12px;
`;

export const StepTitle = styled.h2`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.2;

  .white { color: white; }
  .red { color: #cc0000; }
`;

export const StepSubtitle = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 32px 0;
  line-height: 1.4;
`;

export const ServiceTypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const ServiceTypeCard = styled.div`
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;

  i {
    font-size: 2rem;
    margin-bottom: 12px;
    display: block;
    color: rgba(255, 255, 255, 0.4);
    transition: all 0.25s ease;
  }

  h4 {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
    margin: 0 0 8px 0;
  }

  p {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
    font-size: 0.85rem;
  }

  ${props => props.selected && `
    background: rgba(204, 0, 0, 0.1);
    border-color: #cc0000;
    
    i {
      color: #cc0000;
    }
  `}

  &:hover {
    border-color: #cc0000;
    background: rgba(204, 0, 0, 0.05);
    
    i {
      color: #cc0000;
    }
  }
`;

export const ServiceTierList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${stepTransitionIn} 0.3s ease;
`;

export const ServiceTierRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;

  ${props => props.selected && `
    border-left: 3px solid #cc0000;
    background: rgba(204, 0, 0, 0.08);
    
    .price {
      color: #cc0000;
    }
  `}

  &:hover {
    border-color: rgba(204, 0, 0, 0.3);
  }
`;

export const RadioCircle = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-right: 16px;
  position: relative;
  transition: all 0.25s ease;

  ${props => props.selected && `
    border-color: #cc0000;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: #cc0000;
      border-radius: 50%;
    }
  `}
`;

export const TierInfo = styled.div`
  flex: 1;
  
  .name {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: white;
    margin-bottom: 4px;
  }
  
  .coverage {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const TierPrice = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  transition: color 0.25s ease;
`;

export const PopularBadge = styled.div`
  position: absolute;
  top: -6px;
  right: 16px;
  background: rgba(204, 0, 0, 0.2);
  color: #cc0000;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 10px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldLabel = styled.label`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 8px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px 16px 12px 45px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 14px;
  transition: all 0.25s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    outline: none;
    border-color: #cc0000;
    box-shadow: 0 0 0 3px rgba(204, 0, 0, 0.12);
  }
`;

export const InputIcon = styled.i`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(204, 0, 0, 0.6);
  font-size: 14px;
`;

export const SelectField = styled.select`
  width: 100%;
  padding: 12px 16px 12px 45px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:focus {
    outline: none;
    border-color: #cc0000;
    box-shadow: 0 0 0 3px rgba(204, 0, 0, 0.12);
  }

  option {
    background: #1a1a1a;
    color: white;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px 28px;
  gap: 16px;

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0 20px 20px;
  }
`;

export const FooterButton = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 14px 28px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);

  &.primary {
    background: #cc0000;
    border: 1px solid #cc0000;
    color: white;

    &:hover:not(:disabled) {
      background: #b30000;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.6);

    &:hover {
      border-color: #cc0000;
      color: #cc0000;
    }
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;