import AgregarBebida from "./components/AgregarBebida";
import RegistrarVenta from "./components/RegistrarVenta";
import VentasPorDia from "./components/VentasPorDia";

export default function App() {
  return (
    <div className="p-4">
      <h1>🍻 Bar Manager</h1>

      <section>
        <h2>Agregar bebida</h2>
        <AgregarBebida />
      </section>

      <section>
        <h2>Registrar venta</h2>
        <RegistrarVenta />
      </section>

      <section>
        <h2>Ver ventas por día</h2>
        <VentasPorDia />
      </section>
    </div>
  );
}