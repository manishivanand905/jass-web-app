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
    content: ' Orders';
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

export const OrderCard = styled.div`
  background: #0d0d0d;
  border: 1px solid rgba(255,255,255,0.1);
  border-left: 3px solid ${props => {
    switch(props.$status) {
      case 'processing': return '#e67e22';
      case 'shipped': return '#3498db';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#cc0000';
      default: return 'rgba(255,255,255,0.1)';
    }
  }};
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const OrderHeader = styled.div`
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
      case 'processing': return 'rgba(230,126,34,0.15)';
      case 'shipped': return 'rgba(52,152,219,0.15)';
      case 'completed': return 'rgba(39,174,96,0.15)';
      case 'cancelled': return 'rgba(204,0,0,0.15)';
      default: return 'rgba(255,255,255,0.1)';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$status) {
      case 'processing': return 'rgba(230,126,34,0.4)';
      case 'shipped': return 'rgba(52,152,219,0.4)';
      case 'completed': return 'rgba(39,174,96,0.4)';
      case 'cancelled': return 'rgba(204,0,0,0.4)';
      default: return 'rgba(255,255,255,0.2)';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'processing': return '#e67e22';
      case 'shipped': return '#3498db';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#cc0000';
      default: return '#ECECEC';
    }
  }};
`;

export const OrderId = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  margin-left: 15px;
`;

export const ProductItem = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255,255,255,0.05);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductName = styled.h3`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem;
  color: #ECECEC;
  margin-bottom: 5px;
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TimelineRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;

  span:first-child {
    color: #ECECEC;
    font-weight: 600;
  }

  span:last-child {
    color: #B0B0B0;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3px;
  }
`;

export const SectionTitle = styled.h4`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  color: #B0B0B0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 15px;
`;

export const AddressBox = styled.div`
  background: rgba(201,0,0,0.1);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(201,0,0,0.3);

  p {
    color: #ECECEC;
    font-size: 0.9rem;
    margin: 5px 0;
    line-height: 1.6;
    font-family: 'Barlow Condensed', sans-serif;
  }

  strong {
    color: #ECECEC;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;

  span {
    color: #ECECEC;
  }
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  border-top: 1px solid rgba(255,255,255,0.1);
  margin-top: 10px;
  font-family: 'Barlow Condensed', sans-serif;

  strong {
    color: #ECECEC;
    font-size: 1.1rem;
  }
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

export const NoOrders = styled.div`
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
    text-align: center;
  }

  button {
    padding: 15px 30px;
    background: #cc0000;
    color: white;
    border: none;
    border-radius: 6px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.3s;

    &:hover {
      background: #a00000;
    }
  }
`;
