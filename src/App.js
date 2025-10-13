import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Importa tus componentes/páginas
import AgregarBebida from "./components/AgregarBebida";
import RegistrarVenta from "./components/RegistrarVenta";
import VentasPorDia from "./components/VentasPorDia";

export default function App() {
  return (
    // BrowserRouter envuelve toda tu app para habilitar la navegación
    <BrowserRouter>
      <div className="p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">🍻 Bar Manager</h1>
          {/* Menú de navegación */}
          <nav className="mt-4 flex gap-4">
            <Link to="/" className="text-blue-500 hover:underline">Registrar Venta</Link>
            <Link to="/agregar-bebida" className="text-blue-500 hover:underline">Agregar Bebida</Link>
            <Link to="/reporte-ventas" className="text-blue-500 hover:underline">Ventas del Día</Link>
          </nav>
        </header>

        <main>
          {/* Aquí es donde React Router cambiará el contenido según la URL */}
          <Routes>
            <Route path="/" element={<RegistrarVenta />} />
            <Route path="/agregar-bebida" element={<AgregarBebida />} />
            <Route path="/reporte-ventas" element={<VentasPorDia />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}