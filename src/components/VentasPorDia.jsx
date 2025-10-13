import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function VentasPorDia() {
  const [fecha, setFecha] = useState("");
  const [ventas, setVentas] = useState([]);

  const buscarVentas = async () => {
    const { data, error } = await supabase
      .from("ventas")
      .select("*, bebidas(nombre)")
      .eq("fecha", fecha);

    if (error) alert(error.message);
    else setVentas(data || []);
  };

  const total = ventas.reduce((acc, v) => acc + parseFloat(v.total || 0), 0);

  return (
    <div className="flex flex-col gap-3">
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <button onClick={buscarVentas}>Buscar ventas</button>

      <ul>
        {ventas.map((v) => (
          <li key={v.id}>
            {v.bebidas.nombre} - {v.cantidad}u - ${v.total}
          </li>
        ))}
      </ul>

      <p><strong>Total del día:</strong> ${total}</p>
    </div>
  );
}
