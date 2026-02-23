import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
`;

export const Header = styled.header`
  background: #0d0d0d;
  border-bottom: 2px solid #cc0000;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-direction: column;
    gap: 16px;
  }
`;

export const Logo = styled.h1`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #cc0000;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const LogoutButton = styled.button`
  padding: 10px 20px;
  background: #cc0000;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #b30000;
  }
`;

export const Content = styled.div`
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  border-bottom: 2px solid #222;

  @media (max-width: 768px) {
    flex-direction: column;
    border-bottom: none;
  }
`;

export const Tab = styled.button`
  padding: 16px 32px;
  background: ${props => props.$active ? '#cc0000' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#999'};
  border: none;
  border-bottom: 3px solid ${props => props.$active ? '#cc0000' : 'transparent'};
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background: ${props => props.$active ? '#cc0000' : '#1a1a1a'};
  }

  @media (max-width: 768px) {
    border-bottom: none;
    border-radius: 6px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

export const StatCard = styled.div`
  background: #0d0d0d;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #cc0000;
    transform: translateY(-4px);
  }
`;

export const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(204, 0, 0, 0.1);
  border: 2px solid #cc0000;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 28px;
    color: #cc0000;
  }
`;

export const StatInfo = styled.div`
  flex: 1;
`;

export const StatValue = styled.h3`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
`;

export const StatLabel = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  color: #999;
`;

export const Section = styled.div`
  background: #0d0d0d;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

export const SectionTitle = styled.h2`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
`;

export const ActionButton = styled.button`
  padding: 12px 24px;
  background: #cc0000;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #b30000;
  }

  &:disabled {
    background: #444;
    cursor: not-allowed;
  }
`;

export const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 6px;
  color: #fff;
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  margin-bottom: 24px;

  &:focus {
    outline: none;
    border-color: #cc0000;
  }

  &::placeholder {
    color: #666;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background: #1a1a1a;
  border-bottom: 2px solid #cc0000;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #222;
  transition: background 0.3s ease;

  &:hover {
    background: #1a1a1a;
  }
`;

export const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #cc0000;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const TableCell = styled.td`
  padding: 16px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 15px;
  color: #ccc;
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  background: ${props => {
    switch(props.$status) {
      case 'pending': return 'rgba(255, 193, 7, 0.1)';
      case 'confirmed': return 'rgba(76, 175, 80, 0.1)';
      case 'completed': return 'rgba(33, 150, 243, 0.1)';
      case 'cancelled': return 'rgba(244, 67, 54, 0.1)';
      default: return 'rgba(158, 158, 158, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'pending': return '#ffc107';
      case 'confirmed': return '#4caf50';
      case 'completed': return '#2196f3';
      case 'cancelled': return '#f44336';
      default: return '#9e9e9e';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$status) {
      case 'pending': return '#ffc107';
      case 'confirmed': return '#4caf50';
      case 'completed': return '#2196f3';
      case 'cancelled': return '#f44336';
      default: return '#9e9e9e';
    }
  }};
  border-radius: 4px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button`
  padding: 8px 12px;
  background: ${props => props.$variant === 'danger' ? '#f44336' : '#cc0000'};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.$variant === 'danger' ? '#d32f2f' : '#b30000'};
  }

  i {
    font-size: 14px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`;

export const PageButton = styled.button`
  padding: 8px 16px;
  background: ${props => props.$active ? '#cc0000' : '#1a1a1a'};
  color: #fff;
  border: 1px solid ${props => props.$active ? '#cc0000' : '#333'};
  border-radius: 4px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #cc0000;
    border-color: #cc0000;
  }

  &:disabled {
    background: #0d0d0d;
    color: #666;
    cursor: not-allowed;
    border-color: #222;

    &:hover {
      background: #0d0d0d;
      border-color: #222;
    }
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
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    color: #666;
  }
`;
