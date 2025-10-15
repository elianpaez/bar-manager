import { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabaseClient";
import { useCart } from '../context/CartContext';

export default function SeleccionarProductos() {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [selecciones, setSelecciones] = useState({});
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data } = await supabase.from("productos").select("*").order('categoria').order('nombre', { ascending: true });
      setProductos(data || []);
    };
    fetchProductos();
  }, []);

  const productosAgrupados = useMemo(() => {
    return productos.reduce((acc, producto) => {
      const categoria = producto.categoria || 'Sin categoría';
      if (!acc[categoria]) acc[categoria] = [];
      acc[categoria].push(producto);
      return acc;
    }, {});
  }, [productos]);

  
  const handleSelectionChange = (e, categoria) => {
    const productoId = e.target.value;
    setSelecciones(prevSelecciones => ({
      ...prevSelecciones,
      [categoria]: productoId,
    }));
  };

  
  const handleAddToCart = (e) => {
    e.preventDefault();
    const productosSeleccionados = Object.values(selecciones).filter(Boolean); 

    if (productosSeleccionados.length === 0) {
      alert("Por favor, selecciona al menos un producto.");
      return;
    }

    let productosAgregadosNombres = [];
    productosSeleccionados.forEach(productoId => {
      const producto = productos.find(p => p.id === productoId);
      if (producto) {
        addToCart(producto, parseInt(cantidad));
        productosAgregadosNombres.push(producto.nombre);
      }
    });

    alert(`Se agregaron: ${productosAgregadosNombres.join(', ')} al pedido.`);
    
    
    setSelecciones({});
    setCantidad(1);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Seleccionar Productos</h2>
      <form onSubmit={handleAddToCart} className="flex flex-col gap-4">
        
        {}
        {Object.keys(productosAgrupados).map((categoria) => (
          <div key={categoria}>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 capitalize">
              {categoria}
            </label>
            <select
              value={selecciones[categoria] || ""} 
              onChange={(e) => handleSelectionChange(e, categoria)} 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            >
              <option value="">-- Elige un {categoria} --</option>
              {productosAgrupados[categoria].map((p) => (
                <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                  {p.nombre} - (Stock: {p.stock})
                </option>
              ))}
            </select>
          </div>
        ))}

        <hr className="border-gray-300 dark:border-gray-600 my-2" />

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Cantidad (para cada producto seleccionado)</label>
          <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              min="1"
          />
        </div>

        <button 
          type="submit" 
          disabled={Object.values(selecciones).every(v => !v)} 
          className="w-full bg-sky-500 text-white p-2 mt-2 rounded-md hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 transition-colors disabled:bg-gray-400"
        >
          Agregar al Pedido
        </button>
      </form>
    </div>
  );
}