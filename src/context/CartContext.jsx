// src/context/CartContext.jsx

import { createContext, useState, useContext, useMemo } from 'react';

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Creamos el Proveedor del contexto (el que maneja la lógica)
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // --- ESTA ES LA FUNCIÓN CLAVE CORREGIDA ---
  const addToCart = (producto, cantidad) => {
    // Usamos la forma funcional de setState para evitar problemas de estado obsoleto
    setCart(currentCart => {
      const itemExists = currentCart.find(item => item.id === producto.id);
      
      if (itemExists) {
        // Si el producto ya está en el carrito, actualizamos su cantidad
        return currentCart.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + parseInt(cantidad) } // Sumamos la nueva cantidad
            : item
        );
      } else {
        // Si es un producto nuevo, lo agregamos al carrito
        return [...currentCart, { ...producto, cantidad: parseInt(cantidad) }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productoId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productoId));
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removeFromCart(productoId); // Si la cantidad es 0 o menos, lo eliminamos
    } else {
      setCart(currentCart =>
        currentCart.map(item =>
          item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };
  
  // Función para vaciar el carrito
  const clearCart = () => setCart([]);

  // Calculamos el total usando useMemo para eficiencia
  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }, [cart]);


  // Hacemos que todas las funciones y el estado estén disponibles para la app
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Creamos un hook personalizado para usar el contexto más fácil
export const useCart = () => {
  return useContext(CartContext);
};