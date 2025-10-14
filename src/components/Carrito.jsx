// src/components/Carrito.jsx

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabaseClient';

export default function Carrito() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formaPago, setFormaPago] = useState('efectivo');
  
  const handleFinalizarVenta = async () => {
    setLoading(true);
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      setLoading(false);
      return;
    }

    try {
      // Obtenemos la fecha actual en formato YYYY-MM-DD
      const fechaActual = new Date().toISOString().split('T')[0];

      // Añadimos la fecha a cada producto del carrito antes de guardarlo
      const ventasParaInsertar = cart.map(item => ({
        producto_id: item.id,
        cantidad: item.cantidad,
        total: item.precio * item.cantidad,
        forma_pago: formaPago,
        fecha: fechaActual // <-- AQUÍ SE AÑADE LA FECHA
      }));

      const { error: ventaError } = await supabase.from('ventas').insert(ventasParaInsertar);
      if (ventaError) throw ventaError;

      // Actualizamos el stock de cada producto
      for (const item of cart) {
        const newStock = item.stock - item.cantidad;
        const { error: stockError } = await supabase
          .from('productos')
          .update({ stock: newStock })
          .eq('id', item.id);
        if (stockError) throw stockError;
      }

      alert("✅ ¡Venta registrada con éxito!");
      clearCart();

    } catch (error) {
      alert(`Error al registrar la venta: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Mi Pedido</h2>
        <p className="text-gray-500 dark:text-gray-400">El carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Mi Pedido</h2>
      
      <div className="flex-grow space-y-3">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-white dark:bg-gray-700 p-2 rounded">
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{item.nombre}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">${item.precio.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.cantidad - 1)} className="px-2 bg-gray-200 dark:bg-gray-600 rounded">-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => updateQuantity(item.id, item.cantidad + 1)} className="px-2 bg-gray-200 dark:bg-gray-600 rounded">+</button>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Forma de pago</label>
          <select 
              value={formaPago} 
              onChange={(e) => setFormaPago(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
          </select>
        </div>

        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-gray-800 dark:text-gray-100">Total:</span>
          <span className="text-sky-500 dark:text-sky-400">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleFinalizarVenta}
          disabled={loading}
          className="w-full mt-4 bg-green-500 text-white p-3 rounded-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? "Registrando..." : "Finalizar Venta"}
        </button>
      </div>
    </div>
  );
}