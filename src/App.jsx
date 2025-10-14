import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from './context/CartContext';

// Importa tus componentes/páginas
import PaginaVenta from "./components/PaginaVenta";
import VentasPorDia from "./components/VentasPorDia";
import AgregarProducto from './components/AgregarProducto';
import GestionProductos from "./components/GestionProductos"; // <-- 1. IMPORTA EL NUEVO COMPONENTE

import ThemeSwitcher from './components/ThemeSwitcher';
import KuervoLogo from './assets/logo-kuervo.jpg';

export default function App() {
  return (
    <CartProvider>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <BrowserRouter>
          <div className="p-4">
            <header className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              {/* ... tu header no cambia ... */}
              <nav className="mt-4 flex flex-wrap gap-4">
                <Link to="/" className="text-sky-500 dark:text-sky-400 hover:underline">Registrar Venta</Link>
                <Link to="/agregar-producto" className="text-sky-500 dark:text-sky-400 hover:underline">Agregar Producto</Link>
                {/* 2. AÑADE EL NUEVO ENLACE */}
                <Link to="/productos" className="text-sky-500 dark:text-sky-400 hover:underline">Gestionar Productos</Link>
                <Link to="/reporte-ventas" className="text-sky-500 dark:text-sky-400 hover:underline">Ventas del Día</Link>
              </nav>
            </header>

            <main>
              <Routes>
                <Route path="/" element={<PaginaVenta />} />
                <Route path="/agregar-producto" element={<AgregarProducto />} />
                {/* 3. AÑADE LA NUEVA RUTA */}
                <Route path="/productos" element={<GestionProductos />} />
                <Route path="/reporte-ventas" element={<VentasPorDia />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}