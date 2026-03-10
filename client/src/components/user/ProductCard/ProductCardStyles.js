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

export const CardContainer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${(props) => props.$index * 0.05}s;
  opacity: 0;
  display: ${(props) => (props.$viewMode === "list" ? "flex" : "block")};
  flex-direction: ${(props) => (props.$viewMode === "list" ? "row" : "column")};

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(204, 0, 0, 0.5);
    box-shadow: 0 10px 30px rgba(204, 0, 0, 0.2);

    img {
      transform: scale(1.06);
    }
  }

  @media (max-width: 768px) {
    /* Ensure cards are visible on mobile */
    opacity: 1;
    animation: none;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 2;
  background: #cc0000;
  color: white;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 20px;
`;

export const CardImage = styled.div`
  position: relative;
  width: ${(props) => (props.$viewMode === "list" ? "180px" : "100%")};
  aspect-ratio: ${(props) => (props.$viewMode === "list" ? "1/1" : "4/3")};
  overflow: hidden;
  background: #0d0d0d;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  @media (max-width: 768px) {
    width: ${(props) => (props.$viewMode === "list" ? "120px" : "100%")};
    aspect-ratio: ${(props) => (props.$viewMode === "list" ? "1/1" : "3/2")};
  }
`;

export const CardContent = styled.div`
  padding: ${(props) => (props.$viewMode === "list" ? "20px" : "20px")};
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$viewMode === "list" ? "10px" : "12px")};
  flex: 1;

  @media (max-width: 768px) {
    padding: ${(props) => (props.$viewMode === "list" ? "12px" : "16px")};
    gap: ${(props) => (props.$viewMode === "list" ? "6px" : "8px")};
  }
`;

export const CategoryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const CategoryLabel = styled.span`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);

  @media (max-width: 768px) {
    font-size: 9px;
    letter-spacing: 0.5px;
  }
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  i {
    font-size: 8px;
  }

  span {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 9px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 2px;
  }

  @media (max-width: 768px) {
    i {
      font-size: 7px;
    }
    span {
      font-size: 8px;
    }
  }
`;

export const ProductName = styled.h3`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 22px;
  font-weight: 600;
  color: white;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: ${(props) => (props.$viewMode === "list" ? "18px" : "16px")};
    line-height: 1.2;
    font-weight: 700;
  }
`;

export const ProductDescription = styled.p`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 15px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.$viewMode === "list" ? "1" : "2")};
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: ${(props) => (props.$viewMode === "list" ? "11px" : "12px")};
    -webkit-line-clamp: 1;
    line-height: 1.3;
    color: rgba(255, 255, 255, 0.45);
  }
`;

export const SpecsPreview = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SpecPill = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 12px;
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s;

  &:hover {
    border-color: rgba(204, 0, 0, 0.3);
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  gap: 10px;
`;

export const Price = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  min-width: fit-content;

  @media (max-width: 768px) {
    font-size: 20px;
    font-weight: 800;
  }
`;

export const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cc0000;
  background: transparent;
  border: 1px solid #cc0000;
  width: 36px;
  height: 36px;
  transition:
    color 0.3s ease,
    background 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
  flex-shrink: 0;
  cursor: pointer;
  clip-path: polygon(
    0 0,
    calc(100% - 7px) 0,
    100% 7px,
    100% 100%,
    7px 100%,
    0 calc(100% - 7px)
  );

  &:hover {
    background: #cc0000;
    color: #ffffff;
    box-shadow: 0 4px 16px rgba(204, 0, 0, 0.4);

    i {
      color: #ffffff;
    }
  }

  i {
    font-size: 11px;
    color: #cc0000;
    transition: color 0.25s ease;
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;
