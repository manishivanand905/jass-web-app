import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { userAPI } from '../../../services/user/api';
import { showToast } from '../../../components/common/Toast/toastConfig';
import Sidebar from '../../../components/common/Sidebar/Sidebar';
import {
  CheckoutContainer,
  TopBar,
  StepIndicator,
  Step,
  StepNumber,
  StepLabel,
  CheckoutContent,
  AddressSection,
  SectionIntro,
  AddressCard,
  AddressTag,
  AddressDetails,
  AddNewBtn,
  AddressForm,
  AddressFormGrid,
  FieldGroup,
  FieldInput,
  FieldTextarea,
  InlineCheckbox,
  PaymentSection,
  PaymentOption,
  OrderSummary,
  SummaryItem,
  TotalAmount,
  PlaceOrderBtn,
  ContinueBtn,
  ActionRow,
  SecondaryBtn
} from './CheckoutStyles';

const buildUserAddresses = (user) => {
  if (!user) return [];

  if (Array.isArray(user.addresses) && user.addresses.length > 0) {
    return user.addresses.map((address, index) => ({
      ...address,
      id: address._id || address.id || `saved-address-${index}`
    }));
  }

  if (user.address) {
    return [{
      id: 'profile-default-address',
      fullName: user.name || '',
      phone: user.phone || '',
      addressLine: user.address,
      city: user.city || '',
      state: '',
      pincode: '',
      isDefault: true
    }];
  }

  return [];
};

const getInitialAddressForm = (user) => ({
  fullName: user?.name || '',
  phone: user?.phone || '',
  addressLine: user?.address || '',
  city: user?.city || '',
  state: '',
  pincode: '',
  isDefault: buildUserAddresses(user).length === 0
});

const formatAddressLine = (address) =>
  [address.addressLine, address.city, address.state, address.pincode].filter(Boolean).join(', ');

const Checkout = () => {
  const { cart, clearCart, cartTotal } = useCart();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const updateUserRef = useRef(updateUser);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState(() => buildUserAddresses(user));
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [paymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(() => getInitialAddressForm(user));

  useEffect(() => {
    updateUserRef.current = updateUser;
  }, [updateUser]);

  useEffect(() => {
    const nextAddresses = buildUserAddresses(user);
    setAddresses(nextAddresses);
    setAddressForm(getInitialAddressForm(user));

    setSelectedAddress((current) => {
      if (nextAddresses.length === 0) return null;
      if (current) {
        const match = nextAddresses.find((item) => String(item.id) === String(current.id));
        if (match) return match;
      }
      return nextAddresses.find((item) => item.isDefault) || nextAddresses[0];
    });
  }, [user]);

  useEffect(() => {
    if (!user?.id) return;

    let cancelled = false;

    const syncUserProfile = async () => {
      const response = await userAPI.getMe();
      if (!cancelled && response.success && response.user) {
        updateUserRef.current(response.user);
      }
    };

    syncUserProfile();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const handleAddressInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAddressForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddAddress = async (event) => {
    event.preventDefault();

    if (!addressForm.fullName.trim() || !addressForm.phone.trim() || !addressForm.addressLine.trim() || !addressForm.city.trim()) {
      showToast.error('Please fill full name, phone, delivery address and city');
      return;
    }

    setSavingAddress(true);
    try {
      const response = await userAPI.addAddress(addressForm);
      if (!response.success) {
        showToast.error(response.message || 'Unable to save address');
        return;
      }

      const nextAddresses = buildUserAddresses(response.user);
      updateUser(response.user);
      setAddresses(nextAddresses);
      setSelectedAddress(nextAddresses.find((item) => item.isDefault) || nextAddresses[nextAddresses.length - 1] || null);
      setAddressForm(getInitialAddressForm(response.user));
      setShowAddressForm(false);
      showToast.success(response.message || 'Address added successfully');
    } catch (error) {
      showToast.error('Unable to save address right now');
    } finally {
      setSavingAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      showToast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      showToast.error('Your cart is empty');
      navigate('/products');
      return;
    }

    if (deliveryType === 'delivery' && !selectedAddress) {
      showToast.error('Please select a delivery address');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cart.map((item) => ({
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

  if (!user) {
    return (
      <Sidebar>
        <CheckoutContainer>
          <TopBar>
            <h1>Checkout</h1>
            <SecondaryBtn style={{ width: 'auto', minWidth: '180px' }} onClick={() => navigate('/cart')}>
              Back to Cart
            </SecondaryBtn>
          </TopBar>

          <CheckoutContent>
            <h2>Login Required</h2>
            <SectionIntro>Please login or subscribe first to save a delivery address and complete your checkout.</SectionIntro>
            <ActionRow>
              <SecondaryBtn onClick={() => navigate('/cart')}>Back to Cart</SecondaryBtn>
              <ContinueBtn onClick={() => navigate('/login')}>Login / Subscribe</ContinueBtn>
            </ActionRow>
          </CheckoutContent>
        </CheckoutContainer>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <CheckoutContainer>
        <TopBar>
          <h1>Checkout</h1>
          <SecondaryBtn style={{ width: 'auto', minWidth: '180px' }} onClick={() => navigate('/cart')}>
            Back to Cart
          </SecondaryBtn>
        </TopBar>

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
              <SectionIntro>Choose store pickup or ship your products to one of your saved delivery addresses.</SectionIntro>

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
                  <p>Get your order delivered to your shipping address</p>
                </div>
              </PaymentOption>

              {deliveryType === 'delivery' && (
                <>
                  <h2>Select Delivery Address</h2>
                  <SectionIntro>Your saved delivery address from registration appears here automatically. You can also add another shipping address below.</SectionIntro>

                  {addresses.length > 0 ? (
                    addresses.map((addr) => (
                      <AddressCard key={addr.id} $selected={selectedAddress?.id === addr.id} onClick={() => setSelectedAddress(addr)}>
                        <input type="radio" checked={selectedAddress?.id === addr.id} readOnly />
                        <AddressDetails>
                          {addr.isDefault && <AddressTag>Default</AddressTag>}
                          <strong>{addr.fullName}</strong>
                          <p>{addr.addressLine}</p>
                          <p>{[addr.city, addr.state].filter(Boolean).join(', ')}{addr.pincode ? ` - ${addr.pincode}` : ''}</p>
                          <p>Phone: {addr.phone || 'Not provided'}</p>
                        </AddressDetails>
                      </AddressCard>
                    ))
                  ) : (
                    <SectionIntro>No delivery address is saved yet. Add a shipping address below to continue.</SectionIntro>
                  )}

                  <AddNewBtn onClick={() => setShowAddressForm((current) => !current)}>
                    <i className={`fa-solid ${showAddressForm ? 'fa-minus' : 'fa-plus'}`} /> {showAddressForm ? 'Hide Address Form' : 'Add Shipping Address'}
                  </AddNewBtn>

                  {showAddressForm && (
                    <AddressForm onSubmit={handleAddAddress}>
                      <AddressFormGrid>
                        <FieldGroup>
                          <label htmlFor="fullName">Full Name</label>
                          <FieldInput id="fullName" name="fullName" value={addressForm.fullName} onChange={handleAddressInputChange} placeholder="Enter full name" />
                        </FieldGroup>

                        <FieldGroup>
                          <label htmlFor="phone">Phone Number</label>
                          <FieldInput id="phone" name="phone" value={addressForm.phone} onChange={handleAddressInputChange} placeholder="Enter phone number" />
                        </FieldGroup>
                      </AddressFormGrid>

                      <FieldGroup>
                        <label htmlFor="addressLine">Shipping Address</label>
                        <FieldTextarea id="addressLine" name="addressLine" value={addressForm.addressLine} onChange={handleAddressInputChange} placeholder="House no, street, area, landmark" />
                      </FieldGroup>

                      <AddressFormGrid>
                        <FieldGroup>
                          <label htmlFor="city">City</label>
                          <FieldInput id="city" name="city" value={addressForm.city} onChange={handleAddressInputChange} placeholder="City" />
                        </FieldGroup>

                        <FieldGroup>
                          <label htmlFor="state">State</label>
                          <FieldInput id="state" name="state" value={addressForm.state} onChange={handleAddressInputChange} placeholder="State" />
                        </FieldGroup>
                      </AddressFormGrid>

                      <AddressFormGrid>
                        <FieldGroup>
                          <label htmlFor="pincode">Pincode</label>
                          <FieldInput id="pincode" name="pincode" value={addressForm.pincode} onChange={handleAddressInputChange} placeholder="Pincode" />
                        </FieldGroup>
                      </AddressFormGrid>

                      <InlineCheckbox>
                        <input type="checkbox" name="isDefault" checked={addressForm.isDefault} onChange={handleAddressInputChange} />
                        Save as default delivery address
                      </InlineCheckbox>

                      <ActionRow>
                        <SecondaryBtn type="button" onClick={() => setShowAddressForm(false)}>
                          Cancel
                        </SecondaryBtn>
                        <ContinueBtn type="submit" disabled={savingAddress}>
                          {savingAddress ? 'Saving Address...' : 'Save Address'}
                        </ContinueBtn>
                      </ActionRow>
                    </AddressForm>
                  )}
                </>
              )}

              <ActionRow>
                <SecondaryBtn onClick={() => navigate('/cart')}>Back to Cart</SecondaryBtn>
                <ContinueBtn
                  onClick={() => (deliveryType === 'pickup' || selectedAddress) && setCurrentStep(2)}
                  disabled={deliveryType === 'delivery' && !selectedAddress}
                >
                  Continue to Payment
                </ContinueBtn>
              </ActionRow>
            </AddressSection>
          )}

          {currentStep === 2 && (
            <PaymentSection>
              <h2>Select Payment Method</h2>
              <SectionIntro>Cash on Delivery is available now. Online payments can be added later without changing the checkout flow.</SectionIntro>

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

              <ActionRow>
                <SecondaryBtn onClick={() => setCurrentStep(1)}>Back to Address</SecondaryBtn>
                <ContinueBtn onClick={() => setCurrentStep(3)}>
                  Continue to Review
                </ContinueBtn>
              </ActionRow>
            </PaymentSection>
          )}

          {currentStep === 3 && (
            <OrderSummary>
              <h2>Order Summary</h2>
              {cart.map((item) => (
                <SummaryItem key={item._id || item.id || item.product}>
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
                  <>
                    <p style={{ color: '#ECECEC', margin: '8px 0' }}><strong>Recipient:</strong> {selectedAddress.fullName}</p>
                    <p style={{ color: '#ECECEC', margin: '8px 0' }}><strong>Address:</strong> {formatAddressLine(selectedAddress)}</p>
                    <p style={{ color: '#ECECEC', margin: '8px 0' }}><strong>Phone:</strong> {selectedAddress.phone || 'Not provided'}</p>
                  </>
                )}
                <p style={{ color: '#ECECEC', margin: '8px 0' }}><strong>Payment:</strong> Cash on Delivery</p>
              </div>

              <ActionRow>
                <SecondaryBtn onClick={() => setCurrentStep(2)}>Back to Payment</SecondaryBtn>
                <PlaceOrderBtn onClick={handlePlaceOrder} disabled={loading}>
                  {loading ? 'Placing Order...' : 'Place Order'}
                </PlaceOrderBtn>
              </ActionRow>
            </OrderSummary>
          )}
        </CheckoutContent>
      </CheckoutContainer>
    </Sidebar>
  );
};

export default Checkout;
