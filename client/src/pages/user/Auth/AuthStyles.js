import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  background: #0a0a0a;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
`;

export const VisualPanel = styled.div`
  width: 45%;
  position: relative;
  background: url("https://images.pexels.com/photos/31154218/pexels-photo-31154218.jpeg")
    center/cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(10, 10, 10, 0.75) 100%
    );
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled.div`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 28px;
  font-weight: 900;

  span:first-child {
    color: #fff;
  }

  span:last-child {
    color: #cc0000;
    margin-left: 8px;
  }
`;

export const QuoteSection = styled.div`
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

export const Quote = styled.p`
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 2rem;
  color: #fff;
  line-height: 1.4;
  margin-bottom: 24px;
`;

export const Divider = styled.div`
  width: 40px;
  height: 2px;
  background: #cc0000;
  margin: 0 auto 32px;
`;

export const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`;

export const Badge = styled.div`
  text-align: center;

  i {
    font-size: 24px;
    color: #cc0000;
    margin-bottom: 8px;
    display: block;
  }

  span {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const BottomLink = styled.div`
  text-align: center;
  font-family: "Cormorant Garamond", serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);

  button {
    background: none;
    border: none;
    color: #cc0000;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #ff0000;
    }
  }
`;

export const FormPanel = styled.div`
  width: 55%;
  background: #0d0d0d;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 48px;
  overflow-y: auto;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: #cc0000;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 30px 20px;
    height: auto;
    min-height: 100vh;
    background: url("https://images.pexels.com/photos/31154218/pexels-photo-31154218.jpeg") center/cover;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(10, 10, 10, 0.92);
      z-index: 0;
    }
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 420px;

  @media (max-width: 768px) {
    max-width: 100%;
    position: relative;
    z-index: 1;
  }
`;

export const Eyebrow = styled.p`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #cc0000;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 8px;
  }
`;

export const Title = styled.h1`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 6px 0;

  span {
    color: ${(props) => (props.$accent ? "#cc0000" : "#fff")};
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 0 0 4px 0;
  }
`;

export const Subtitle = styled.p`
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
`;

export const TabSwitcher = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 10px;
  background: ${(props) => (props.$active ? "#cc0000" : "transparent")};
  border: 1px solid
    ${(props) => (props.$active ? "#cc0000" : "rgba(255,255,255,0.1)")};
  border-radius: 6px;
  color: ${(props) => (props.$active ? "#fff" : "rgba(255,255,255,0.5)")};
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #cc0000;
    color: #fff;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 14px;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
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
  padding: 12px 16px 12px 44px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid
    ${(props) => (props.$hasError ? "#cc0000" : "rgba(255,255,255,0.1)")};
  border-radius: 8px;
  color: #fff;
  font-family: "Cormorant Garamond", serif;
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

  @media (max-width: 768px) {
    padding: 11px 14px 11px 40px;
    font-size: 15px;
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

export const ForgotPassword = styled.button`
  background: none;
  border: none;
  font-family: "Cormorant Garamond", serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  text-align: right;
  transition: color 0.3s ease;

  &:hover {
    color: #cc0000;
  }
`;

export const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Cormorant Garamond", serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;

  input {
    accent-color: #cc0000;
    width: 16px;
    height: 16px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: ${(props) => (props.disabled ? "#444" : "#cc0000")};
  color: #fff;
  border: none;
  border-radius: 8px;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 12px),
    calc(100% - 12px) 100%,
    0 100%
  );
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 6px;

  &:hover {
    background: ${(props) => (props.disabled ? "#444" : "#b30000")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-1px)")};
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0 8px 24px rgba(204,0,0,0.3)"};
  }

  i {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    padding: 11px;
    font-size: 0.9rem;
    margin-top: 4px;
  }
`;

export const Divider2 = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 12px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  span {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const SocialButton = styled.button`
  flex: 1;
  padding: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #fff;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    border-color: #cc0000;
  }

  i {
    font-size: 16px;
  }
`;

export const BottomText = styled.p`
  text-align: center;
  margin-top: 16px;
  font-family: "Cormorant Garamond", serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);

  button {
    background: none;
    border: none;
    color: #cc0000;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #ff0000;
      text-decoration: underline;
    }
  }
`;

export const PasswordStrength = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

export const StrengthBar = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  gap: 2px;
`;

export const StrengthSegment = styled.div`
  flex: 1;
  background: ${(props) => (props.$filled ? props.$color : "transparent")};
  transition: background 0.3s ease;
`;

export const StrengthLabel = styled.span`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) => props.$color};
  text-transform: uppercase;
`;

export const TermsCheckbox = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: "Cormorant Garamond", serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;

  input {
    accent-color: #cc0000;
    width: 18px;
    height: 18px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  a {
    color: #cc0000;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ff0000;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    gap: 8px;

    input {
      width: 16px;
      height: 16px;
    }
  }
`;

export const SuccessScreen = styled.div`
  text-align: center;
  padding: 60px 20px;

  i {
    font-size: 80px;
    color: #cc0000;
    margin-bottom: 24px;
    animation: scaleIn 0.5s ease;
  }

  h2 {
    font-family: "Barlow Condensed", sans-serif;
    font-size: 2rem;
    font-weight: 900;
    color: #fff;
    margin: 0 0 12px 0;
  }

  p {
    font-family: "Cormorant Garamond", serif;
    font-style: italic;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 32px;
  }

  @keyframes scaleIn {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
`;

export const ModalCard = styled.div`
  width: min(100%, 460px);
  background: #111111;
  border: 1px solid rgba(204, 0, 0, 0.25);
  border-radius: 18px;
  padding: 28px 24px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    padding: 22px 16px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  button {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    font-size: 18px;

    &:hover {
      color: #cc0000;
    }
  }
`;

export const ModalTitle = styled.h3`
  margin: 0 0 6px;
  color: #fff;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
`;

export const ModalSubtitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
  font-family: "Cormorant Garamond", serif;
  font-size: 1rem;
  line-height: 1.4;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const SecondaryAction = styled.button`
  flex: 1;
  padding: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: #fff;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #cc0000;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const OtpPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;

  span {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #fff;
    font-family: "Barlow Condensed", sans-serif;
    font-size: 1rem;
    font-weight: 700;
  }
`;
