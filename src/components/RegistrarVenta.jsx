import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function RegistrarVenta() {
  const [bebidas, setBebidas] = useState([]);
  const [bebidaSeleccionada, setBebidaSeleccionada] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [formaPago, setFormaPago] = useState("efectivo");

  useEffect(() => {
    const fetchBebidas = async () => {
      const { data } = await supabase.from("bebidas").select("*");
      setBebidas(data || []);
    };
    fetchBebidas();
  }, []);

  const handleVenta = async (e) => {
    e.preventDefault();
    const bebida = bebidas.find((b) => b.id === bebidaSeleccionada);
    if (!bebida) return alert("Selecciona una bebida");

    if (cantidad > bebida.stock)
      return alert("No hay suficiente stock disponible");

    const { error } = await supabase.from("ventas").insert([
      {
        bebida_id: bebidaSeleccionada,
        cantidad: parseInt(cantidad),
        forma_pago: formaPago,
      },
    ]);

    if (error) alert(error.message);
    else {
      await supabase
        .from("bebidas")
        .update({ stock: bebida.stock - cantidad })
        .eq("id", bebidaSeleccionada);
      alert("✅ Venta registrada");
    }
  };

  return (
    <form onSubmit={handleVenta} className="flex flex-col gap-2">
      <select
        value={bebidaSeleccionada}
        onChange={(e) => setBebidaSeleccionada(e.target.value)}
      >
        <option value="">Seleccionar bebida</option>
        {bebidas.map((b) => (
          <option key={b.id} value={b.id}>
            {b.nombre} - Stock: {b.stock}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Cantidad vendida"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />

      <select value={formaPago} onChange={(e) => setFormaPago(e.target.value)}>
        <option value="efectivo">Efectivo</option>
        <option value="tarjeta">Tarjeta</option>
        <option value="transferencia">Transferencia</option>
      </select>

      <button type="submit">Registrar Venta</button>
    </form>
  );
}
