import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { userAPI } from '../../../services/user/api';
import { showToast } from '../../../components/common/Toast/toastConfig';
import Sidebar from '../../../components/common/Sidebar/Sidebar';
import { CheckoutContainer, StepIndicator, Step, StepNumber, StepLabel, CheckoutContent, AddressSection, AddressCard, AddressDetails, AddNewBtn, PaymentSection, PaymentOption, OrderSummary, SummaryItem, TotalAmount, PlaceOrderBtn, ContinueBtn } from './CheckoutStyles';

const Checkout = () => {
  const { cart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [paymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (deliveryType === 'delivery' && !selectedAddress) {
      showToast.error('Please select a delivery address');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cart.map(item => ({ 
          product: String(item._id || item.id || item.product), 
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: cartTotal,
        deliveryType,
        deliveryAddress: deliveryType === 'delivery' ? selectedAddress : null,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone || selectedAddress?.phone || ''
      };

      const response = await userAPI.createOrder(orderData);
      if (response.success) {
        clearCart();
        navigate(`/order/confirmation/${response.data.orderId}`);
      } else {
        showToast.error(response.message || 'Order failed');
      }
    } catch (error) {
      showToast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const dummyAddresses = [
    { id: 1, fullName: user?.name || 'John Doe', phone: '9876543210', addressLine: '123 Main Street, Apartment 4B', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', isDefault: true },
    { id: 2, fullName: user?.name || 'John Doe', phone: '9876543211', addressLine: '456 Park Avenue, Floor 2', city: 'Delhi', state: 'Delhi', pincode: '110001', isDefault: false }
  ];

  return (
    <Sidebar>
      <CheckoutContainer>
        <h1>Checkout</h1>
        
        <StepIndicator>
          <Step $active={currentStep >= 1}>
            <StepNumber $active={currentStep >= 1}>1</StepNumber>
            <StepLabel>Address</StepLabel>
          </Step>
          <Step $active={currentStep >= 2}>
            <StepNumber $active={currentStep >= 2}>2</StepNumber>
            <StepLabel>Payment</StepLabel>
          </Step>
          <Step $active={currentStep >= 3}>
            <StepNumber $active={currentStep >= 3}>3</StepNumber>
            <StepLabel>Confirm</StepLabel>
          </Step>
        </StepIndicator>

        <CheckoutContent>
          {currentStep === 1 && (
            <AddressSection>
              <h2>Select Delivery Option</h2>
              <PaymentOption onClick={() => setDeliveryType('pickup')}>
                <input type="radio" checked={deliveryType === 'pickup'} readOnly />
                <div>
                  <strong>Collect at Store</strong>
                  <p>Pick up your order from our store</p>
                </div>
              </PaymentOption>
              <PaymentOption onClick={() => setDeliveryType('delivery')}>
                <input type="radio" checked={deliveryType === 'delivery'} readOnly />
                <div>
                  <strong>Home Delivery</strong>
                  <p>Get your order delivered to your address</p>
                </div>
              </PaymentOption>

              {deliveryType === 'delivery' && (
                <>
                  <h2>Select Delivery Address</h2>
                  {dummyAddresses.map(addr => (
                    <AddressCard key={addr.id} $selected={selectedAddress?.id === addr.id} onClick={() => setSelectedAddress(addr)}>
                      <input type="radio" checked={selectedAddress?.id === addr.id} readOnly />
                      <AddressDetails>
                        <strong>{addr.fullName}</strong>
                        <p>{addr.addressLine}</p>
                        <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p>Phone: {addr.phone}</p>
                      </AddressDetails>
                    </AddressCard>
                  ))}
                  <AddNewBtn onClick={() => showToast.info('Add address feature coming soon')}>
                    <i className="fa-solid fa-plus" /> Add New Address
                  </AddNewBtn>
                </>
              )}
              <ContinueBtn onClick={() => (deliveryType === 'pickup' || selectedAddress) && setCurrentStep(2)} disabled={deliveryType === 'delivery' && !selectedAddress}>
                Continue to Payment
              </ContinueBtn>
            </AddressSection>
          )}

          {currentStep === 2 && (
            <PaymentSection>
              <h2>Select Payment Method</h2>
              <PaymentOption>
                <input type="radio" checked={paymentMethod === 'cod'} readOnly />
                <div>
                  <strong>Cash on Delivery</strong>
                  <p>Pay when you receive your order</p>
                </div>
              </PaymentOption>
              <PaymentOption onClick={() => showToast.info('Online payment coming soon')}>
                <input type="radio" checked={false} readOnly />
                <div>
                  <strong>Online Payment</strong>
                  <p>Pay using UPI, Card, or Net Banking (Coming Soon)</p>
                </div>
              </PaymentOption>
              <ContinueBtn onClick={() => setCurrentStep(3)}>
                Continue to Review
              </ContinueBtn>
            </PaymentSection>
          )}

          {currentStep === 3 && (
            <OrderSummary>
              <h2>Order Summary</h2>
              {cart.map(item => (
                <SummaryItem key={item._id || item.id}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </SummaryItem>
              ))}
              <TotalAmount>
                <strong>Total Amount</strong>
                <strong>₹{cartTotal}</strong>
              </TotalAmount>
              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: '#ECECEC', margin: '8px 0' }}><strong>Delivery:</strong> {deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}</p>
                {deliveryType === 'delivery' && selectedAddress && (
                  <p style={{ color: '#ECECEC', margin: '8px 0' }}><strong>Address:</strong> {selectedAddress.addressLine}, {selectedAddress.city}</p>
                )}
                <p style={{ color: '#ECECEC', margin: '8px 0' }}><strong>Payment:</strong> Cash on Delivery</p>
              </div>
              <PlaceOrderBtn onClick={handlePlaceOrder} disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </PlaceOrderBtn>
            </OrderSummary>
          )}
        </CheckoutContent>
      </CheckoutContainer>
    </Sidebar>
  );
};

export default Checkout;
