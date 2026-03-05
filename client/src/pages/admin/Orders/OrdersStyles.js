import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px;
  @media (max-width: 768px) { padding: 15px 0; }
`;

export const Header = styled.div`
  margin-bottom: 20px;
  @media (max-width: 768px) { padding: 0 15px; }
`;

export const Title = styled.h1`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #C90000;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  @media (max-width: 768px) { font-size: 1.3rem; margin-bottom: 12px; }
`;

export const HeaderActions = styled.div``;

export const FilterChips = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  @media (max-width: 768px) { margin-bottom: 15px; gap: 8px; }
`;

export const Chip = styled.button`
  font-family: 'Barlow Condensed', sans-serif;
  padding: 8px 16px;
  background: ${props => props.$active ? '#C90000' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$active ? '#C90000' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 20px;
  color: #ECECEC;
  cursor: pointer;
  font-weight: ${props => props.$active ? '700' : '400'};
  transition: all 0.3s ease;
  &:hover { background: ${props => props.$active ? '#860000' : 'rgba(255, 255, 255, 0.1)'}; }
`;

export const Table = styled.table`
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 15px;
    border: none;
    background: transparent;
    width: calc(100% - 30px);
    margin: 0 15px;
  }
`;

export const TableHeader = styled.thead`
  background: rgba(201, 0, 0, 0.1);
  @media (max-width: 768px) { display: none; }
`;

export const TableBody = styled.tbody`
  @media (max-width: 768px) { display: contents; }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  &:hover { background: rgba(255, 255, 255, 0.02); }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px;
    gap: 8px;
  }
`;

export const TableCell = styled.td`
  font-family: 'Barlow Condensed', sans-serif;
  padding: 15px;
  color: #ECECEC;
  ${TableHeader} & { font-weight: 700; text-transform: uppercase; font-size: 0.85rem; }
  @media (max-width: 768px) {
    padding: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    &::before {
      content: attr(data-label);
      font-weight: 700;
      color: #c90000;
      min-width: 60px;
      text-transform: uppercase;
      font-size: 0.65rem;
    }
  }
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${props => props.$color}33;
  color: ${props => props.$color};
  border: 1px solid ${props => props.$color};
`;

export const ActionButton = styled.button`
  padding: 8px 12px;
  background: rgba(201, 0, 0, 0.1);
  border: 1px solid #C90000;
  border-radius: 6px;
  color: #C90000;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover { background: rgba(201, 0, 0, 0.2); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalContent = styled.div`
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 30px;
  @media (max-width: 768px) { padding: 20px; }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const ModalTitle = styled.h2`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.8rem;
  color: #C90000;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ECECEC;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover { color: #C90000; }
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 12px; }
`;

export const DetailItem = styled.div``;

export const DetailLabel = styled.div`
  font-family: 'Barlow Condensed', sans-serif;
  color: rgba(236, 236, 236, 0.6);
  font-size: 0.85rem;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

export const DetailValue = styled.div`
  font-family: 'Barlow Condensed', sans-serif;
  color: #ECECEC;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const ProductGrid = styled.div`
  display: grid;
  gap: 15px;
  margin-bottom: 20px;
`;

export const ProductCard = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  @media (max-width: 768px) { width: 60px; height: 60px; }
`;

export const ProductInfo = styled.div`
  flex: 1;
  strong {
    font-family: 'Barlow Condensed', sans-serif;
    color: #ECECEC;
    font-size: 1.1rem;
    display: block;
    margin-bottom: 5px;
  }
  p {
    font-family: 'Barlow Condensed', sans-serif;
    color: rgba(236, 236, 236, 0.7);
    margin: 0;
  }
`;

export const Select = styled.select`
  font-family: 'Barlow Condensed', sans-serif;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ECECEC;
  font-size: 1rem;
  width: 100%;
  cursor: pointer;
  &:focus { outline: none; border-color: #C90000; }
  option { background: #0a0a0a; color: #ECECEC; }
`;

export const SubmitButton = styled.button`
  font-family: 'Barlow Condensed', sans-serif;
  width: 100%;
  padding: 12px;
  background: #C90000;
  border: none;
  border-radius: 8px;
  color: #ECECEC;
  font-weight: 700;
  cursor: pointer;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  &:hover { background: #860000; }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  color: rgba(236, 236, 236, 0.4);
  i { font-size: 60px; margin-bottom: 20px; }
  p { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; margin: 0; }
  @media (max-width: 768px) { padding: 40px 15px; i { font-size: 40px; } p { font-size: 1rem; } }
`;
