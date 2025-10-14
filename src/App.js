import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from './context/CartContext';

// Importa los componentes/páginas correctos
import PaginaVenta from "./components/PaginaVenta";
import VentasPorDia from "./components/VentasPorDia";
import AgregarProducto from './components/AgregarProducto';

import ThemeSwitcher from './components/ThemeSwitcher';
import KuervoLogo from './assets/logo-kuervo.jpg';

export default function App() {
  return (
    <CartProvider>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <BrowserRouter>
          <div className="p-4">
            <header className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={KuervoLogo}
                    alt="Logo de Kuervo Estudio"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h1 className="text-3xl font-bold">Kuervo Estudio</h1>
                  </div>
                </div>
                <ThemeSwitcher />
              </div>

              <nav className="mt-4 flex gap-4">
                <Link to="/" className="text-sky-500 dark:text-sky-400 hover:underline">Registrar Venta</Link>
                <Link to="/agregar-producto" className="text-sky-500 dark:text-sky-400 hover:underline">Agregar Producto</Link>
                <Link to="/reporte-ventas" className="text-sky-500 dark:text-sky-400 hover:underline">Ventas del Día</Link>
              </nav>
            </header>

            <main>
              <Routes>
                <Route path="/" element={<PaginaVenta />} />
                <Route path="/agregar-producto" element={<AgregarProducto />} />
                <Route path="/reporte-ventas" element={<VentasPorDia />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}