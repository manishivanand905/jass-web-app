import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 80px 16px 40px;
  }
`;

export const SuccessIcon = styled.div`
  font-size: 80px;
  color: #00c853;
  margin-bottom: 20px;
  animation: scaleIn 0.5s ease;

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

  @media (max-width: 768px) {
    font-size: 60px;
  }
`;

export const Title = styled.h1`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 3rem;
  font-weight: 900;
  color: white;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const BookingId = styled.p`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #cc0000;
  margin: 0 0 40px 0;
  letter-spacing: 0.1em;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 30px;
  }
`;

export const Card = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  clip-path: polygon(
    0 0,
    calc(100% - 20px) 0,
    100% 20px,
    100% 100%,
    20px 100%,
    0 calc(100% - 20px)
  );

  @media (max-width: 768px) {
    padding: 24px;
    gap: 24px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const Label = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
`;

export const Value = styled.span`
  font-family: ${({ $small, $large }) =>
    $large ? '"Barlow Condensed", Arial, sans-serif' : '"Cormorant Garamond", Georgia, serif'};
  font-size: ${({ $small, $large }) => ($small ? "0.95rem" : $large ? "2rem" : "1.1rem")};
  font-weight: ${({ $large }) => ($large ? "900" : "400")};
  color: ${({ $large }) => ($large ? "#cc0000" : "white")};
  font-style: ${({ $small, $large }) => ($large ? "normal" : "italic")};
  opacity: ${({ $small }) => ($small ? 0.7 : 1)};
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 8px 20px;
  border-radius: 100px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: ${({ $status }) => {
    switch ($status) {
      case "confirmed":
        return "rgba(0, 200, 83, 0.15)";
      case "pending":
        return "rgba(255, 193, 7, 0.15)";
      case "completed":
        return "rgba(33, 150, 243, 0.15)";
      case "cancelled":
        return "rgba(244, 67, 54, 0.15)";
      default:
        return "rgba(255, 255, 255, 0.1)";
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case "confirmed":
        return "#00c853";
      case "pending":
        return "#ffc107";
      case "completed":
        return "#2196f3";
      case "cancelled":
        return "#f44336";
      default:
        return "white";
    }
  }};
  border: 1px solid
    ${({ $status }) => {
      switch ($status) {
        case "confirmed":
          return "rgba(0, 200, 83, 0.3)";
        case "pending":
          return "rgba(255, 193, 7, 0.3)";
        case "completed":
          return "rgba(33, 150, 243, 0.3)";
        case "cancelled":
          return "rgba(244, 67, 54, 0.3)";
        default:
          return "rgba(255, 255, 255, 0.2)";
      }
    }};
  width: fit-content;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 40px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 30px;
  }
`;

export const Button = styled.button`
  flex: 1;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 30px;
  background: ${({ $variant }) => ($variant === "secondary" ? "transparent" : "#cc0000")};
  border: 1.5px solid #cc0000;
  border-radius: 6px;
  color: ${({ $variant }) => ($variant === "secondary" ? "#cc0000" : "white")};
  cursor: pointer;
  transition: all 0.3s ease;
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );

  &:hover {
    background: ${({ $variant }) => ($variant === "secondary" ? "#cc0000" : "#a00000")};
    color: white;
    transform: translateY(-2px);
  }

  i {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
`;
