import styled from "styled-components";

export const Section = styled.div`
  background: #0d0d0d;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

export const SectionTitle = styled.h2`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
`;

export const DateCard = styled.div`
  background: ${(props) => (props.$blocked ? "#1a0a0a" : "#1a1a1a")};
  border: 1px solid ${(props) => (props.$blocked ? "#cc0000" : "#333")};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  opacity: ${(props) => (props.$blocked ? 0.6 : 1)};
  transition: all 0.3s ease;

  &:hover {
    border-color: #cc0000;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const DateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #333;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`;

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "Cormorant Garamond", serif;
  font-size: 18px;
  color: #fff;

  i {
    color: #cc0000;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const BlockButton = styled.button`
  padding: 10px 20px;
  background: ${(props) => (props.$blocked ? "#4caf50" : "#f44336")};
  color: #fff;
  border: none;
  border-radius: 6px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${(props) => (props.$blocked ? "#45a049" : "#d32f2f")};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SlotCard = styled.div`
  background: ${(props) =>
    props.$blocked
      ? "#0d0d0d"
      : props.$available
        ? "rgba(76, 175, 80, 0.1)"
        : "rgba(244, 67, 54, 0.1)"};
  border: 2px solid
    ${(props) =>
      props.$blocked ? "#333" : props.$available ? "#4caf50" : "#f44336"};
  border-radius: 8px;
  padding: 16px;
  cursor: ${(props) => (props.$blocked ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  pointer-events: ${(props) => (props.$blocked ? "none" : "auto")};

  &:hover {
    transform: ${(props) => (props.$blocked ? "none" : "translateY(-4px)")};
    box-shadow: ${(props) =>
      props.$blocked
        ? "none"
        : props.$available
          ? "0 4px 12px rgba(76, 175, 80, 0.3)"
          : "0 4px 12px rgba(244, 67, 54, 0.3)"};
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const SlotTime = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;

  i {
    color: #cc0000;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const SlotStatus = styled.div`
  font-family: "Cormorant Garamond", serif;
  font-size: 14px;
  color: ${(props) => (props.$available ? "#4caf50" : "#f44336")};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;

  i {
    font-size: 64px;
    color: #333;
    margin-bottom: 16px;
  }

  p {
    font-family: "Cormorant Garamond", serif;
    font-size: 18px;
    color: #666;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    i {
      font-size: 48px;
    }

    p {
      font-size: 16px;
    }
  }
`;
