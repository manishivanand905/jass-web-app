import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const Modal = styled.div`
  background: #0d0d0d;
  border: 2px solid #cc0000;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #cc0000;
  }

  i {
    font-size: 24px;
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
  font-size: 14px;
  font-weight: 600;
  color: #ccc;
  text-transform: uppercase;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: #1a1a1a;
  border: 1px solid ${props => props.$hasError ? '#cc0000' : '#333'};
  border-radius: 8px;
  color: #fff;
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #cc0000;
  }

  &::placeholder {
    color: #666;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background: #1a1a1a;
  border: 1px solid ${props => props.$hasError ? '#cc0000' : '#333'};
  border-radius: 8px;
  color: #fff;
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #cc0000;
  }

  &::placeholder {
    color: #666;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const Button = styled.button`
  flex: 1;
  padding: 14px;
  background: ${props => props.$variant === 'secondary' ? '#333' : '#cc0000'};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${props => props.$variant === 'secondary' ? '#444' : '#b30000'};
  }

  &:disabled {
    background: #444;
    cursor: not-allowed;
  }
`;
