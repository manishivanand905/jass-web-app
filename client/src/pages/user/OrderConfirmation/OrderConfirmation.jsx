import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/common/Sidebar/Sidebar';
import { ConfirmationContainer, SuccessIcon, ConfirmationCard, OrderId, Message, OrderDetails, DetailRow, ActionButtons, Button } from './OrderConfirmationStyles';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <Sidebar>
      <ConfirmationContainer>
        <ConfirmationCard>
          <SuccessIcon>
            <i className="fa-solid fa-circle-check" />
          </SuccessIcon>
          <h1>Order Placed Successfully!</h1>
          <Message>Thank you for your order. We'll send you a confirmation email shortly.</Message>
          <OrderDetails>
            <DetailRow>
              <span>Order ID:</span>
              <OrderId>{orderId}</OrderId>
            </DetailRow>
          </OrderDetails>
          <ActionButtons>
            <Button onClick={() => navigate('/my-orders')}>
              <i className="fa-solid fa-shopping-bag" /> View My Orders
            </Button>
            <Button $secondary onClick={() => navigate('/')}>
              <i className="fa-solid fa-home" /> Continue Shopping
            </Button>
          </ActionButtons>
        </ConfirmationCard>
      </ConfirmationContainer>
    </Sidebar>
  );
};

export default OrderConfirmation;
