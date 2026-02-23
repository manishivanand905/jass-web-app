import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(204, 0, 0, 0.5);
  }
  100% {
    box-shadow: 0 0 0 16px rgba(204, 0, 0, 0);
  }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
`;

const glow1 = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.06; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.08; }
`;

const glow2 = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.05; }
  50% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.07; }
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #080808;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(204, 0, 0, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(204, 0, 0, 0.04) 1px, transparent 1px);
    background-size: 50px 50px;
    transform: rotate(-15deg) scale(1.5);
  }

  &::after {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(204, 0, 0, 0.06) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${glow1} 8s ease-in-out infinite;
  }
`;

export const Glow2 = styled.div`
  position: absolute;
  bottom: -20%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(204, 0, 0, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${glow2} 10s ease-in-out infinite;
`;

export const Card = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(13, 13, 13, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-top: 3px solid #cc0000;
  border-radius: 8px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
  padding: 48px 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.9);
  animation: scaleIn 0.4s ease;

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    clip-path: none;
    border-radius: 8px;
    padding: 40px 32px;
  }
`;

export const ShieldIcon = styled.div`
  text-align: center;
  margin-bottom: 24px;

  i {
    font-size: 64px;
    color: #cc0000;
    animation: ${pulse} 2s infinite;
  }
`;

export const Title = styled.h1`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  text-align: center;
  color: #fff;
  margin: 0 0 4px 0;
  letter-spacing: 4px;
`;

export const Subtitle = styled.p`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
  color: #cc0000;
  margin: 0 0 24px 0;
  letter-spacing: 0.3em;
  text-transform: uppercase;
`;

export const WarningStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(230, 126, 34, 0.08);
  border: 1px solid rgba(230, 126, 34, 0.2);
  border-radius: 4px;
  margin-bottom: 32px;

  i {
    color: #e67e22;
    font-size: 16px;
  }

  span {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.8rem;
    color: #e67e22;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.i`
  position: absolute;
  left: 16px;
  color: rgba(204, 0, 0, 0.6);
  font-size: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px 14px 44px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${props => props.$hasError ? '#cc0000' : 'rgba(255, 255, 255, 0.08)'};
  border-radius: 8px;
  color: #fff;
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #cc0000;
    box-shadow: 0 0 0 3px rgba(204, 0, 0, 0.12);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;

  &:hover {
    color: #cc0000;
  }

  i {
    font-size: 18px;
  }
`;

export const HelpText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 8px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.disabled ? '#444' : '#cc0000'};
  color: #fff;
  border: none;
  border-radius: 8px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;

  &:hover {
    background: ${props => props.disabled ? '#444' : '#b30000'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 8px 24px rgba(204,0,0,0.3)'};
  }

  &.shake {
    animation: ${shake} 0.5s;
  }

  i {
    font-size: 18px;
  }
`;

export const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(204, 0, 0, 0.12);
  border: 1px solid rgba(204, 0, 0, 0.3);
  border-radius: 6px;
  margin-top: 16px;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  i {
    color: #cc0000;
    font-size: 18px;
  }

  span {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.9rem;
    color: #fff;
  }
`;

export const SecurityBadges = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 16px;
  padding-top: 24px;
  margin-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SecurityBadge = styled.div`
  text-align: center;

  i {
    font-size: 16px;
    color: rgba(204, 0, 0, 0.6);
    margin-bottom: 6px;
    display: block;
  }

  span {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.6rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

export const Footer = styled.div`
  text-align: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.2);
    margin: 0;

    span {
      color: rgba(255, 255, 255, 0.15);
      margin-left: 8px;
    }
  }
`;
