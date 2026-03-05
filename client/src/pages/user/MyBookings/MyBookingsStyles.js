import styled from 'styled-components';

export const Container = styled.div`
  padding: 100px 5%;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const Title = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 5px;

  span {
    color: white;
  }

  &::after {
    content: ' Services';
    color: #cc0000;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  color: rgba(255,255,255,0.5);
  font-size: 0.95rem;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.div`
  flex: 1;
  position: relative;

  i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(204,0,0,0.5);
  }

  input {
    width: 100%;
    padding: 12px 15px 12px 45px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    color: white;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.95rem;

    &:focus {
      outline: none;
      border-color: #cc0000;
      box-shadow: 0 0 0 3px rgba(204,0,0,0.12);
    }

    &::placeholder {
      color: rgba(255,255,255,0.3);
    }
  }
`;

export const StatusChip = styled.button`
  padding: 10px 20px;
  background: ${props => props.$active ? 'rgba(204,0,0,0.15)' : 'rgba(255,255,255,0.02)'};
  border: 1px solid ${props => props.$active ? '#cc0000' : 'rgba(255,255,255,0.1)'};
  border-radius: 20px;
  color: ${props => props.$active ? 'white' : 'rgba(255,255,255,0.6)'};
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;

  &:hover {
    background: rgba(204,0,0,0.1);
    border-color: #cc0000;
    color: white;
  }
`;

export const BookingCard = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.07);
  border-left: 3px solid ${props => {
    switch(props.$status) {
      case 'Pending': return '#e67e22';
      case 'Confirmed': return '#3498db';
      case 'Completed': return '#27ae60';
      case 'Cancelled': return '#cc0000';
      default: return 'rgba(255,255,255,0.1)';
    }
  }};
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 20px;
  transition: 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(204,0,0,0.15);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const StatusPill = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 0.05em;
  background: ${props => {
    switch(props.$status) {
      case 'Pending': return 'rgba(230,126,34,0.15)';
      case 'Confirmed': return 'rgba(52,152,219,0.15)';
      case 'Completed': return 'rgba(39,174,96,0.15)';
      case 'Cancelled': return 'rgba(204,0,0,0.15)';
      default: return 'rgba(255,255,255,0.1)';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$status) {
      case 'Pending': return 'rgba(230,126,34,0.4)';
      case 'Confirmed': return 'rgba(52,152,219,0.4)';
      case 'Completed': return 'rgba(39,174,96,0.4)';
      case 'Cancelled': return 'rgba(204,0,0,0.4)';
      default: return 'rgba(255,255,255,0.2)';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'Pending': return '#e67e22';
      case 'Confirmed': return '#3498db';
      case 'Completed': return '#27ae60';
      case 'Cancelled': return '#cc0000';
      default: return '#ECECEC';
    }
  }};
`;

export const BookingId = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  margin-left: 15px;
`;

export const ServiceIcon = styled.i`
  font-size: 2rem;
  color: #cc0000;
`;

export const ServiceName = styled.h3`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);

  i {
    color: #cc0000;
    font-size: 0.75rem;
  }
`;

export const Price = styled.div`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.4rem;
  font-weight: 900;
  color: white;
  margin-bottom: 15px;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid;

  ${props => {
    switch(props.$variant) {
      case 'ghost':
        return `
          background: transparent;
          border-color: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          &:hover {
            border-color: rgba(255,255,255,0.4);
            color: white;
          }
        `;
      case 'danger':
        return `
          background: rgba(204,0,0,0.1);
          border-color: #cc0000;
          color: #cc0000;
          &:hover {
            background: rgba(204,0,0,0.2);
          }
        `;
      case 'success':
        return `
          background: rgba(39,174,96,0.1);
          border-color: #27ae60;
          color: #27ae60;
          &:hover {
            background: rgba(39,174,96,0.2);
          }
        `;
      case 'primary':
        return `
          background: #cc0000;
          border-color: #cc0000;
          color: white;
          &:hover {
            background: #a00000;
          }
        `;
      default:
        return '';
    }
  }}
`;

export const NoBookings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 20px;

  i {
    font-size: 5rem;
    color: rgba(255,255,255,0.08);
  }

  h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: rgba(255,255,255,0.6);
  }

  p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    color: rgba(255,255,255,0.4);
  }
`;
