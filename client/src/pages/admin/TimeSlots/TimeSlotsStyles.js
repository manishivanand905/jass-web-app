import styled from "styled-components";

export const Container = styled.div`
  padding: 30px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
`;

export const Title = styled.h2`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const AddButton = styled.button`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 12px 24px;
  background: #cc0000;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));

  &:hover {
    background: #a00000;
    transform: translateY(-2px);
  }

  i {
    margin-right: 8px;
  }
`;

export const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

export const DateCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
`;

export const DateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const DateLabel = styled.h3`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #cc0000;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
`;

export const SlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SlotCard = styled.div`
  background: ${({ $available }) =>
    $available ? "rgba(0, 200, 83, 0.05)" : "rgba(244, 67, 54, 0.05)"};
  border: 1px solid
    ${({ $available }) =>
      $available ? "rgba(0, 200, 83, 0.2)" : "rgba(244, 67, 54, 0.2)"};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SlotTime = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
`;

export const SlotStatus = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $available }) => ($available ? "#00c853" : "#f44336")};
`;

export const SlotActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

export const IconButton = styled.button`
  width: ${({ $small }) => ($small ? "28px" : "32px")};
  height: ${({ $small }) => ($small ? "28px" : "32px")};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $variant }) =>
    $variant === "danger"
      ? "rgba(244, 67, 54, 0.15)"
      : $variant === "success"
        ? "rgba(0, 200, 83, 0.15)"
        : "rgba(204, 0, 0, 0.15)"};
  border: 1px solid
    ${({ $variant }) =>
      $variant === "danger"
        ? "rgba(244, 67, 54, 0.3)"
        : $variant === "success"
          ? "rgba(0, 200, 83, 0.3)"
          : "rgba(204, 0, 0, 0.3)"};
  border-radius: 6px;
  color: ${({ $variant }) =>
    $variant === "danger" ? "#f44336" : $variant === "success" ? "#00c853" : "#cc0000"};
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: ${({ $variant }) =>
      $variant === "danger"
        ? "rgba(244, 67, 54, 0.25)"
        : $variant === "success"
          ? "rgba(0, 200, 83, 0.25)"
          : "rgba(204, 0, 0, 0.25)"};
    transform: scale(1.05);
  }

  i {
    font-size: ${({ $small }) => ($small ? "11px" : "13px")};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;

  i {
    font-size: 60px;
    color: rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
  }

  p {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 1.1rem;
    font-style: italic;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
  }
`;
