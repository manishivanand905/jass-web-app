import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    h1 { font-size: 36px; }
  }
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: ${props => props.theme.colors.border};
    z-index: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1;
`;

export const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.$active ? props.theme.colors.background : props.theme.colors.gray};
  border: 2px solid ${props => props.$active ? props.theme.colors.primary : props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: ${props => props.theme.transitions.normal};
`;

export const StepLabel = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.heading};
  font-family: 'Barlow Condensed', sans-serif;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const CheckoutContent = styled.div`
  background: rgba(0,0,0,0.3);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    color: ${props => props.theme.colors.background};
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    h2 { font-size: 24px; }
  }
`;

export const AddressSection = styled.div``;

export const AddressCard = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px;
  border: 2px solid ${props => props.$selected ? props.theme.colors.primary : 'rgba(255,255,255,0.2)'};
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.normal};
  background: rgba(0,0,0,0.2);

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  input[type="radio"] {
    margin-top: 5px;
    cursor: pointer;
    accent-color: ${props => props.theme.colors.primary};
  }
`;

export const AddressDetails = styled.div`
  flex: 1;

  strong {
    display: block;
    font-size: 18px;
    margin-bottom: 8px;
    color: ${props => props.theme.colors.background};
  }

  p {
    margin: 4px 0;
    color: ${props => props.theme.colors.gray};
    font-size: 14px;
  }
`;

export const AddNewBtn = styled.button`
  width: 100%;
  padding: 15px;
  background: transparent;
  border: 2px dashed ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: ${props => props.theme.transitions.normal};

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }
`;

export const PaymentSection = styled.div``;

export const PaymentOption = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px;
  border: 2px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.normal};
  background: rgba(0,0,0,0.2);

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  input[type="radio"] {
    margin-top: 5px;
    cursor: pointer;
    accent-color: ${props => props.theme.colors.primary};
  }

  div {
    flex: 1;

    strong {
      display: block;
      font-size: 18px;
      margin-bottom: 5px;
      color: ${props => props.theme.colors.background};
    }

    p {
      margin: 0;
      color: ${props => props.theme.colors.gray};
      font-size: 14px;
    }
  }
`;

export const OrderSummary = styled.div``;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  font-size: 16px;
  color: ${props => props.theme.colors.background};
`;

export const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  font-size: 20px;
  color: ${props => props.theme.colors.primary};
  border-top: 2px solid ${props => props.theme.colors.primary};
  margin-top: 10px;
`;

export const PlaceOrderBtn = styled.button`
  width: 100%;
  padding: 15px;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
  transition: ${props => props.theme.transitions.normal};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ContinueBtn = styled.button`
  width: 100%;
  padding: 15px;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
  transition: ${props => props.theme.transitions.normal};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
