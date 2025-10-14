// src/components/PaginaVenta.jsx

import SeleccionarProductos from './SeleccionarProductos';
import Carrito from './Carrito';

export default function PaginaVenta() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Columna Izquierda: Selección de Productos */}
      <div className="w-full lg:w-2/3">
        <SeleccionarProductos />
      </div>

      {/* Columna Derecha: Resumen del Carrito */}
      <div className="w-full lg:w-1/3">
        <Carrito />
      </div>
    </div>
  );
}