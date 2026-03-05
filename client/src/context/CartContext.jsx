import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      console.log('Loading cart from localStorage:', savedCart);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        console.log('Parsed cart:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Failed to parse cart:', error);
    }
    return [];
  });

  useEffect(() => {
    try {
      console.log('Saving cart to localStorage:', cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const productId = String(product._id || product.id);
    console.log('Adding to cart:', { productId, product });
    
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
