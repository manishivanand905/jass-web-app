import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const FormSection = styled.div`
  position: relative;
`;

export const FormHeader = styled.div`
  margin-bottom: 40px;
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
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);

  i {
    color: rgba(204, 0, 0, 0.7);
    font-size: 14px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  transition: all 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
    border-color: #cc0000;
    box-shadow: 0 0 15px rgba(204, 0, 0, 0.2);
  }
`;

export const Select = styled.select`
  width: 100%;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #cc0000;
    box-shadow: 0 0 15px rgba(204, 0, 0, 0.2);
  }

  option {
    background: #1a1a1a;
    color: white;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  resize: vertical;
  transition: all 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
    border-color: #cc0000;
    box-shadow: 0 0 15px rgba(204, 0, 0, 0.2);
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 16px;
  background: #cc0000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%);

  &:hover:not(:disabled) {
    background: #ff0000;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(204, 0, 0, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  i {
    font-size: 18px;
  }
`;

export const Toast = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 3px solid #cc0000;
  border-radius: 6px;
  padding: 16px 24px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  animation: ${slideIn} 0.4s ease;

  i {
    color: #00cc00;
    font-size: 20px;
  }

  @media (max-width: 640px) {
    left: 20px;
    right: 20px;
    bottom: 20px;
  }
`;
