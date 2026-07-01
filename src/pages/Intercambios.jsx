import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/index";

export default function Intercambios() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // Llamamos al archivo PHP que ya tienes creado
    fetch("http://localhost:8080/Figus/listar_intercambios.php", { 
      credentials: "include" 
    })
      .then((res) => res.json())
      .then((data) => {
        // Si no hay error, guardamos los datos reales en el estado
        if (!data.error) setTrades(data);
      })
      .catch((err) => console.error("Error al cargar:", err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-[#0F2D52] mb-6">Intercambios</h1>
      
      <div className="flex flex-col gap-4">
        {trades.length > 0 ? (
          trades.map((trade) => (
            <div key={trade.ID} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="font-bold">Intercambio #{trade.ID}</p>
              <p className="text-sm text-gray-500">Estado: {trade.status || "pendiente"}</p>
              {/* Aquí puedes agregar los botones de aceptar/cancelar */}
            </div>
          ))
        ) : (
          <p className="text-center py-20 text-gray-500">No hay intercambios registrados.</p>
        )}
      </div>
    </div>
  );
}