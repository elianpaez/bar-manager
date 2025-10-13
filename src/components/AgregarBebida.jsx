import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AgregarBebida() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("bebidas").insert([
      { nombre, precio: parseFloat(precio), stock: parseInt(stock) },
    ]);
    if (error) alert(error.message);
    else alert("✅ Bebida agregada con éxito");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button type="submit">Agregar Bebida</button>
    </form>
  );
}
