// src/components/AgregarProducto.jsx

import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AgregarProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("bebida");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!nombre || !precio || !stock || !categoria) {
      alert("⚠️ Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("productos").insert([
      { nombre, precio: parseFloat(precio), stock: parseInt(stock), categoria },
    ]);
    if (error) {
      alert(error.message);
    } else {
      alert(`✅ Producto "${nombre}" agregado con éxito.`);
      setNombre("");
      setPrecio("");
      setStock("");
      setCategoria("bebida");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Agregar Nuevo Producto</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          required
        />
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Categoría</label>
          <select 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="bebida">Bebida</option>
            <option value="comida">Comida</option>
            <option value="cigarrillos">Cigarrillos</option>
            <option value="golosinas">Golosinas</option>
            <option value="snacks">Snacks</option>
          </select>
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            min="0"
            step="0.01"
            required
          />
          <input
            type="number"
            placeholder="Stock inicial"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            min="0"
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Agregando...' : 'Agregar Producto'}
        </button>
      </form>
    </div>
  );
}