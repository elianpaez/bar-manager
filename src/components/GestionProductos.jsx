// src/components/GestionProductos.jsx

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import EditProductModal from './EditProductModal'; 

export default function GestionProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null); 

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('nombre', { ascending: true });
    
    if (error) {
      console.error('Error fetching productos:', error);
    } else {
      setProductos(data);
    }
    setLoading(false);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const { error } = await supabase.from('productos').delete().eq('id', productId);
      if (error) {
        alert(`Error al eliminar: ${error.message}`);
      } else {
        // Actualiza la lista de productos en la UI sin recargar la página
        setProductos(productos.filter(p => p.id !== productId));
        alert('Producto eliminado con éxito.');
      }
    }
  };
  
  const handleSave = () => {
    setEditingProduct(null); 
    fetchProductos(); 
  };

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Cargando productos...</p>;
  }

  return (
    <>
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Gestionar Productos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Categoría</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <tr key={producto.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-3">{producto.nombre}</td>
                  <td className="p-3 capitalize">{producto.categoria}</td>
                  <td className="p-3">${(producto.precio || 0).toFixed(2)}</td>
                  <td className="p-3">{producto.stock}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => setEditingProduct(producto)} className="text-yellow-500 hover:text-yellow-700">Editar</button>
                    <button onClick={() => handleDelete(producto.id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* El modal de edición aparecerá aquí cuando 'editingProduct' no sea null */}
      {editingProduct && (
        <EditProductModal 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
}