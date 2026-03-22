import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();
const LEGACY_CART_KEY = 'cart';
const GUEST_CART_KEY = 'guest_cart';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const skipNextPersistRef = useRef(false);
  const storageKey = user?.id ? `cart:${user.id}` : GUEST_CART_KEY;

  useEffect(() => {
    try {
      // Drop the old shared cart key so guests do not inherit stale/demo items.
      localStorage.removeItem(LEGACY_CART_KEY);

      const savedCart = localStorage.getItem(storageKey);
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      setCart(Array.isArray(parsedCart) ? parsedCart : []);
      skipNextPersistRef.current = true;
    } catch (error) {
      console.error('Failed to load cart:', error);
      setCart([]);
    }
  }, [storageKey]);

  useEffect(() => {
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [cart, storageKey]);

  const addToCart = (product, quantity = 1) => {
    const productId = String(product._id || product.id);

    setCart(prev => {
      const existing = prev.find(item => String(item._id || item.id || item.product) === productId);
      if (existing) {
        return prev.map(item =>
          String(item._id || item.id || item.product) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, _id: productId, product: productId, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => String(item._id || item.id || item.product) !== String(productId)));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        String(item._id || item.id || item.product) === String(productId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
