import styled from 'styled-components';

export const ConfirmationContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

export const ConfirmationCard = styled.div`
  background: rgba(0,0,0,0.3);
  padding: 60px 40px;
  border-radius: 12px;
  text-align: center;
  max-width: 600px;
  width: 100%;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    color: ${props => props.theme.colors.background};
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    h1 { font-size: 28px; }
  }
`;

export const SuccessIcon = styled.div`
  i {
    font-size: 80px;
    color: ${props => props.theme.colors.primary};
  }
`;

export const Message = styled.p`
  font-size: 18px;
  color: ${props => props.theme.colors.gray};
  margin: 20px 0 40px;
  line-height: 1.6;
`;

export const OrderDetails = styled.div`
  background: rgba(0,0,0,0.2);
  padding: 30px;
  border-radius: 8px;
  margin: 30px 0;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: ${props => props.theme.colors.background};

  span:first-child {
    color: ${props => props.theme.colors.gray};
  }
`;

export const OrderId = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  font-size: 20px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  flex: 1;
  padding: 15px 30px;
  background: ${props => props.$secondary ? 'transparent' : props.theme.colors.primary};
  color: ${props => props.$secondary ? props.theme.colors.primary : props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: ${props => props.theme.transitions.normal};

  &:hover {
    background: ${props => props.$secondary ? props.theme.colors.primary : props.theme.colors.primaryDark};
    color: ${props => props.theme.colors.background};
  }
`;
