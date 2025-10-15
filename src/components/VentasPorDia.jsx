// src/components/VentasPorDia.jsx

import { useState, useMemo } from "react";
import { supabase } from "../supabaseClient";

export default function VentasPorDia() {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const buscarVentas = async () => {
    if (!fecha) {
      alert("Por favor, selecciona una fecha.");
      return;
    }
    setLoading(true);
    setSearched(true);
    
    const { data, error } = await supabase
      .from("ventas")
      .select("*, productos(nombre, precio)")
      .eq('fecha', fecha) 
      .order('id', { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setVentas(data || []);
    }
    setLoading(false);
  };

  const totalDelDia = useMemo(() => {
    return ventas.reduce((acc, venta) => acc + (venta.total || 0), 0);
  }, [ventas]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Reporte de Ventas por Día</h2>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="w-full">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Selecciona una fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
        <button 
          onClick={buscarVentas} 
          disabled={loading}
          className="w-full sm:w-auto mt-2 sm:mt-8 bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? "Buscando..." : "Buscar Ventas"}
        </button>
      </div>

      <div>
        {loading && <p className="text-center text-gray-500 dark:text-gray-400">Cargando...</p>}
        
        {!loading && searched && ventas.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No se encontraron ventas para la fecha seleccionada.</p>
        )}

        {!loading && ventas.length > 0 && (
          <>
            <ul className="space-y-3">
              {ventas.map((venta) => (
                <li key={venta.id} className="p-3 flex justify-between items-center bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{venta.productos?.nombre || 'Producto no encontrado'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cantidad: {venta.cantidad}</p>
                  </div>
                  <p className="font-medium text-lg text-green-600 dark:text-green-400">
                    ${(venta.total || 0).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600 flex justify-between items-center">
              <p className="text-xl font-bold text-gray-900 dark:text-white">Total del Día:</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${totalDelDia.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}