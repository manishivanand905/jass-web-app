import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  background: #0a0a0a;

  @media (max-width: 768px) {
    flex-direction: column;
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
  padding: 48px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 32px 20px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 420px;
`;

export const Eyebrow = styled.p`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #cc0000;
  margin-bottom: 12px;
`;

export const Title = styled.h1`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 8px 0;

  span {
    color: ${(props) => (props.$accent ? "#cc0000" : "#fff")};
  }
`;

export const Subtitle = styled.p`
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 32px;
`;

export const TabSwitcher = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 12px;
  background: ${(props) => (props.$active ? "#cc0000" : "transparent")};
  border: 1px solid
    ${(props) => (props.$active ? "#cc0000" : "rgba(255,255,255,0.1)")};
  border-radius: 6px;
  color: ${(props) => (props.$active ? "#fff" : "rgba(255,255,255,0.5)")};
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.9rem;
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
  gap: 20px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

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
  font-family: "Barlow Condensed", sans-serif;
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
  padding: 16px;
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
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;

  &:hover {
    background: ${(props) => (props.disabled ? "#444" : "#b30000")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-1px)")};
    box-shadow: ${(props) =>
      props.disabled ? "none" : "0 8px 24px rgba(204,0,0,0.3)"};
  }

  i {
    font-size: 18px;
  }
`;

export const Divider2 = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;

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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SocialButton = styled.button`
  flex: 1;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #fff;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.9rem;
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
    font-size: 18px;
  }
`;

export const BottomText = styled.p`
  text-align: center;
  margin-top: 24px;
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
