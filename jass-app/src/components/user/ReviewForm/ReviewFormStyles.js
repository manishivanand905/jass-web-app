import styled from "styled-components";

export const FormSection = styled.section`
  padding: 80px 40px;
  background: #0d0d0d;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
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

export const FormContainer = styled.form`
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;

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
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);

  i {
    color: #cc0000;
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
  border-radius: 6px;
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
  border-radius: 6px;
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
  border-radius: 6px;
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

export const StarSelector = styled.div`
  display: flex;
  gap: 10px;
`;

export const StarButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s;

  i {
    font-size: 32px;
    color: ${props => props.$filled ? "#cc0000" : "rgba(255, 255, 255, 0.2)"};
    transition: all 0.3s;
  }

  &:hover i {
    transform: scale(1.2);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
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
  margin-top: 24px;
  transition: all 0.3s;
  clip-path: polygon(
    0 0,
    calc(100% - 15px) 0,
    100% 15px,
    100% 100%,
    0 100%
  );

  &:hover {
    background: #ff0000;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(204, 0, 0, 0.4);
  }

  i {
    font-size: 18px;
  }
`;
