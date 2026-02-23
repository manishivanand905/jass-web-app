import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s;
  animation: ${fadeInUp} 0.6s ease both;
  animation-delay: ${props => props.$index * 0.05}s;

  &:hover {
    border-color: rgba(204, 0, 0, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(204, 0, 0, 0.2);
  }
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Stars = styled.div`
  display: flex;
  gap: 3px;

  i {
    font-size: 16px;
  }
`;

export const VerifiedBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 4px 10px;
  background: rgba(0, 200, 0, 0.1);
  border: 1px solid rgba(0, 200, 0, 0.3);
  border-radius: 12px;
  color: #00cc00;

  i {
    font-size: 12px;
  }
`;

export const Date = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  margin-left: auto;
`;

export const ReviewText = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.85;
  margin: 0;
`;

export const ServiceTag = styled.div`
  display: inline-block;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 15px;
  background: ${props => {
    if (props.$service === "PPF" || props.$service === "Ceramic") return "#cc0000";
    return "rgba(255, 255, 255, 0.1)";
  }};
  color: white;
  width: fit-content;
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
`;

export const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Barlow Condensed", Arial, sans-serif;

  i {
    color: rgba(255, 255, 255, 0.5);
    font-size: 24px;
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-size: 0.95rem;
    font-weight: 700;
    color: white;
  }

  span {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const HelpfulRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;

  i {
    font-size: 16px;
    transition: all 0.3s;
  }

  &:hover {
    color: #cc0000;

    i {
      color: #cc0000;
      transform: scale(1.1);
    }
  }
`;
