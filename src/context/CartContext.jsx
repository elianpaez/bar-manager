// src/context/CartContext.jsx

import { createContext, useState, useContext, useMemo } from 'react';


const CartContext = createContext();


export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  
  const addToCart = (producto, cantidad) => {
    
    setCart(currentCart => {
      const itemExists = currentCart.find(item => item.id === producto.id);
      
      if (itemExists) {
        
        return currentCart.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + parseInt(cantidad) } 
            : item
        );
      } else {
        return [...currentCart, { ...producto, cantidad: parseInt(cantidad) }];
      }
    });
  };

  const removeFromCart = (productoId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productoId));
  };

  const updateQuantity = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removeFromCart(productoId); 
    } else {
      setCart(currentCart =>
        currentCart.map(item =>
          item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };
  
  
  const clearCart = () => setCart([]);

  
  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }, [cart]);


  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}


export const useCart = () => {
  return useContext(CartContext);
};