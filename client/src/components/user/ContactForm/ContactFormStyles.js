import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateY(16px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  z-index: 1200;
`;

export const ModalShell = styled.div`
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: min(760px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  z-index: 1201;
  background: linear-gradient(160deg, rgba(24, 24, 24, 0.98), rgba(10, 10, 10, 0.98));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55);
  animation: ${slideIn} 0.24s ease;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: rgba(204, 0, 0, 0.18);
    border-color: rgba(204, 0, 0, 0.45);
    color: #ffb3b3;
  }

  i {
    font-size: 1rem;
  }
`;

export const FormSection = styled.div`
  position: relative;
  padding: 40px;

  @media (max-width: 640px) {
    padding: 28px 18px 22px;
  }
`;

export const FormHeader = styled.div`
  margin-bottom: 32px;
  padding-right: 52px;
`;

export const Eyebrow = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #cc0000;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: clamp(2.3rem, 5vw, 3.8rem);
  font-weight: 900;
  line-height: 0.9;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 0 14px;

  span {
    color: #cc0000;
  }
`;

export const Subtitle = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.08rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.68);
  margin: 0 0 16px;
  line-height: 1.6;
`;

export const TypeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(204, 0, 0, 0.12);
  border: 1px solid rgba(204, 0, 0, 0.3);
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffd6d6;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

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
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.74);

  i {
    color: rgba(204, 0, 0, 0.82);
    font-size: 14px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1rem;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  transition: all 0.25s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.32);
  }

  &:focus {
    outline: none;
    border-color: rgba(204, 0, 0, 0.7);
    box-shadow: 0 0 0 4px rgba(204, 0, 0, 0.1);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.08rem;
  font-style: italic;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: white;
  resize: vertical;
  min-height: 140px;
  transition: all 0.25s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.32);
  }

  &:focus {
    outline: none;
    border-color: rgba(204, 0, 0, 0.7);
    box-shadow: 0 0 0 4px rgba(204, 0, 0, 0.1);
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 16px;
  background: linear-gradient(135deg, #cc0000, #ff2b2b);
  color: white;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 16px 34px rgba(204, 0, 0, 0.24);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 20px 36px rgba(204, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.72;
    cursor: not-allowed;
  }
`;

export const Toast = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1300;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left: 3px solid #00b84f;
  border-radius: 12px;
  padding: 16px 22px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.98rem;
  color: white;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4);

  i {
    color: #00cc66;
    font-size: 20px;
  }

  @media (max-width: 640px) {
    left: 16px;
    right: 16px;
    bottom: 16px;
  }
`;
