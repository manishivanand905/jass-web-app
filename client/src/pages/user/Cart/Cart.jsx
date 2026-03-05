import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { showToast } from '../../../components/common/Toast/toastConfig';
import Sidebar from '../../../components/common/Sidebar/Sidebar';
import { CartContainer, CartGrid, CartItems, CartItem, ItemImage, ItemDetails, ItemName, ItemPrice, QuantityControl, RemoveBtn, CheckoutCard, CheckoutTitle, TotalRow, CheckoutBtn, EmptyCart } from './CartStyles';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      showToast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <Sidebar>
        <EmptyCart>
          <i className="fa-solid fa-cart-shopping" />
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/products')}>Shop Products</button>
        </EmptyCart>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <CartContainer>
        <h1>Shopping Cart</h1>
        <CartGrid>
          <CartItems>
            {cart.map(item => {
              const itemId = item._id || item.id || item.product;
              return (
              <CartItem key={itemId}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>₹{item.price}</ItemPrice>
                </ItemDetails>
                <QuantityControl>
                  <button onClick={() => updateQuantity(itemId, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(itemId, item.quantity + 1)}>+</button>
                </QuantityControl>
                <ItemPrice>₹{item.price * item.quantity}</ItemPrice>
                <RemoveBtn onClick={() => removeFromCart(itemId)}>
                  <i className="fa-solid fa-trash" />
                </RemoveBtn>
              </CartItem>
            );})}
          </CartItems>

          <CheckoutCard>
            <CheckoutTitle>Order Summary</CheckoutTitle>
            <TotalRow>
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </TotalRow>
            <CheckoutBtn onClick={handleCheckout}>
              Checkout
            </CheckoutBtn>
          </CheckoutCard>
        </CartGrid>
      </CartContainer>
    </Sidebar>
  );
};

export default Cart;
