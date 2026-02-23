import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const Spinner = styled.div`
  width: ${props => props.size || '20px'};
  height: ${props => props.size || '20px'};
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: ${props => props.color || '#cc0000'};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const SpinnerText = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${props => props.color || 'rgba(255, 255, 255, 0.7)'};
`;
