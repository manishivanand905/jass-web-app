import styled from 'styled-components';

export const CartContainer = styled.div`
  padding: 100px 5%;
  min-height: 100vh;
  h1 { font-family: 'Barlow Condensed', sans-serif; font-size: 2.5rem; color: ${props => props.theme.colors.primary}; margin-bottom: 30px; }
`;

export const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 150px 100px 50px;
  gap: 20px;
  align-items: center;
  background: rgba(255,255,255,0.05);
  padding: 20px;
  border-radius: 8px;
  @media (max-width: 768px) { grid-template-columns: 80px 1fr 100px; }
`;

export const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ItemName = styled.h3`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.background};
`;

export const ItemPrice = styled.span`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 700;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  button { background: ${props => props.theme.colors.primary}; color: ${props => props.theme.colors.background}; border: none; width: 30px; height: 30px; border-radius: 4px; cursor: pointer; }
  span { font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; color: ${props => props.theme.colors.background}; min-width: 30px; text-align: center; }
`;

export const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  cursor: pointer;
  &:hover { color: ${props => props.theme.colors.primaryLight}; }
`;

export const CheckoutCard = styled.div`
  background: rgba(255,255,255,0.05);
  padding: 30px;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 100px;
`;

export const CheckoutTitle = styled.h2`
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.background};
  margin-bottom: 20px;
`;

export const DeliveryOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

export const RadioBtn = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  input { accent-color: ${props => props.theme.colors.primary}; width: 18px; height: 18px; }
  span { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: ${props => props.theme.colors.background}; }
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 20px;
  span { font-family: 'Barlow Condensed', sans-serif; font-size: 1.3rem; color: ${props => props.theme.colors.background}; font-weight: 700; }
  span:last-child { color: ${props => props.theme.colors.primary}; }
`;

export const CheckoutBtn = styled.button`
  width: 100%;
  padding: 15px;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 8px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: ${props => props.theme.transitions.normal};
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:hover:not(:disabled) { background: ${props => props.theme.colors.primaryDark}; }
`;

export const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  gap: 20px;
  i { font-size: 5rem; color: ${props => props.theme.colors.primary}; }
  h2 { font-family: 'Barlow Condensed', sans-serif; font-size: 2rem; color: ${props => props.theme.colors.background}; }
  button { padding: 15px 40px; background: ${props => props.theme.colors.primary}; color: ${props => props.theme.colors.background}; border: none; border-radius: 8px; font-family: 'Barlow Condensed', sans-serif; font-size: 1.1rem; cursor: pointer; transition: ${props => props.theme.transitions.normal}; &:hover { background: ${props => props.theme.colors.primaryDark}; } }
`;
