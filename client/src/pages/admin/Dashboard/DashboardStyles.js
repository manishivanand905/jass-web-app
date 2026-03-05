import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Header = styled.div`
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const Title = styled.h1`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #c90000;
  letter-spacing: 0.1em;
  margin: 0 0 10px 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 8px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 25px;
  }
`;

export const StatCard = styled.div`
  background: ${(props) =>
    props.$highlight
      ? "rgba(201, 0, 0, 0.1)"
      : props.$alert
        ? "rgba(255, 152, 0, 0.1)"
        : "rgba(255, 255, 255, 0.03)"};
  border: 1px solid
    ${(props) =>
      props.$highlight
        ? "rgba(201, 0, 0, 0.3)"
        : props.$alert
          ? "rgba(255, 152, 0, 0.3)"
          : "rgba(255, 255, 255, 0.1)"};
  border-radius: 12px;
  padding: 25px;
  display: flex;
  gap: 20px;
  align-items: center;
  clip-path: polygon(
    0 0,
    calc(100% - 15px) 0,
    100% 15px,
    100% 100%,
    15px 100%,
    0 calc(100% - 15px)
  );
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 12px;
    gap: 12px;
  }
`;

export const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(201, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c90000;
  font-size: 1.8rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.4rem;
  }
`;

export const StatContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StatNumber = styled.div`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ececec;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const StatLabel = styled.div`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(236, 236, 236, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const StatSubtext = styled.div`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.9rem;
  color: rgba(236, 236, 236, 0.5);
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const Section = styled.div`
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const SectionTitle = styled.h2`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ececec;
  letter-spacing: 0.08em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ViewAllLink = styled.span`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 1rem;
  color: #c90000;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #860000;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const Table = styled.table`
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const TableHeader = styled.thead`
  background: rgba(201, 0, 0, 0.1);
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const TableCell = styled.td`
  font-family: "Barlow Condensed", sans-serif;
  font-size: 0.95rem;
  color: #ececec;
  padding: 15px;

  ${TableHeader} & {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.75rem;
  }
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${(props) => props.$color}33;
  color: ${(props) => props.$color};
  border: 1px solid ${(props) => props.$color};
  display: inline-block;

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 0.65rem;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: rgba(236, 236, 236, 0.4);
  font-size: 2rem;

  @media (max-width: 768px) {
    min-height: 250px;
    font-size: 1.2rem;
  }
`;
