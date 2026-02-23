import styled from "styled-components";

export const TableWrapper = styled.div`
  padding: 60px 40px;
  background: #0a0a0a;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

export const TableHeader = styled.div`
  text-align: center;
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
  max-width: 700px;
  margin: 0 auto;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: #cc0000;
    border-radius: 4px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #0d0d0d;

  th,
  td {
    padding: 20px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  th:first-child,
  td:first-child {
    text-align: left;
    position: sticky;
    left: 0;
    background: #0d0d0d;
    z-index: 2;
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 15px 10px;
      font-size: 0.9rem;
    }
  }
`;

export const HeaderRow = styled.tr`
  background: rgba(204, 0, 0, 0.05);

  th {
    font-family: "Barlow Condensed", Arial, sans-serif;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    padding: 24px 20px;
  }
`;

export const BrandHeader = styled.th`
  border: ${props => props.$highlight ? "2px solid #cc0000 !important" : "1px solid rgba(255, 255, 255, 0.05)"};
  background: ${props => props.$highlight ? "rgba(204, 0, 0, 0.08) !important" : "transparent"};
  min-width: 180px;

  @media (max-width: 768px) {
    min-width: 150px;
  }
`;

export const BrandName = styled.div`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 900;
  color: white;
  margin-bottom: 6px;
`;

export const BrandOrigin = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 0.85rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
`;

export const TierBadge = styled.div`
  display: inline-block;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 4px 10px;
  background: rgba(204, 0, 0, 0.2);
  border: 1px solid rgba(204, 0, 0, 0.4);
  border-radius: 12px;
  color: #cc0000;
`;

export const FeatureRow = styled.tr`
  background: ${props => props.$index % 2 === 0 ? "rgba(255, 255, 255, 0.02)" : "transparent"};
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

export const FeatureLabel = styled.td`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 10px;

  i {
    color: #cc0000;
    font-size: 16px;
    width: 20px;
  }
`;

export const FeatureCell = styled.td`
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.95rem;
  color: white;
  border: ${props => props.$highlight ? "2px solid #cc0000 !important" : "1px solid rgba(255, 255, 255, 0.05)"};
  background: ${props => props.$highlight ? "rgba(204, 0, 0, 0.03)" : "transparent"};
`;

export const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;

  i {
    font-size: 14px;
  }
`;

export const BestForBadge = styled.div`
  display: inline-block;
  font-family: "Barlow Condensed", Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 6px 12px;
  background: #cc0000;
  border-radius: 15px;
  color: white;
`;
