import { useState } from 'react'; // 'useEffect' ha sido eliminado de esta línea
import { supabase } from '../supabaseClient';

export default function EditProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...product });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('productos')
      .update({
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        categoria: formData.categoria
      })
      .eq('id', formData.id);

    if (error) {
      alert(`Error al actualizar: ${error.message}`);
    } else {
      alert('Producto actualizado con éxito.');
      onSave();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Editar Producto</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700" />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700">
              <option value="bebida">Bebida</option>
              <option value="comida">Comida</option>
              <option value="cigarrillos">Cigarrillos</option>
              <option value="golosinas">Golosinas</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Precio</label>
              <input type="number" name="precio" value={formData.precio} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700" step="0.01" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700" />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="py-2 px-4 bg-sky-500 text-white rounded hover:bg-sky-600 disabled:bg-gray-400">
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}