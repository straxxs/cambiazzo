import React, { useState, useEffect } from "react";
import { Button, Badge, CompatibilityBadge } from "../components/ui/index";
import { Link } from "react-router-dom";
import { obtenerMatcheo } from "../services/api";

export default function Buscar() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerMatcheo()
      .then((data) => {
        if (data.success) setMatches(data.matches);
      })
      .catch((err) => console.error("Error al cargar matcheo:", err))
      .finally(() => setCargando(false));
  }, []);

  const results = matches.filter((m) =>
    m.nombre?.toLowerCase().includes(query.toLowerCase())
  );

  // Convierte cantidad de intercambios en un % para el badge de compatibilidad
  const calcularScore = (m) => {
    if (m.posibles >= 3) return 90;
    if (m.posibles >= 1) return 60;
    return 30;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-[#0F2D52] mb-2">Buscar intercambios</h1>
      <p className="text-gray-500 mb-6">
        Usuarios ordenados por compatibilidad con tu álbum 🔄
      </p>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="w-full p-4 rounded-2xl border border-gray-200 mb-6 focus:outline-none focus:border-[#2D6BFF]"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      {cargando ? (
        <p className="text-center py-20 text-gray-400">Buscando compatibilidades...</p>
      ) : results.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500">
            No hay usuarios compatibles todavía. <br />
            Marcá tus figuritas repetidas y faltantes para encontrar matches.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {results.map((m) => (
            <div
              key={m.id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0F2D52] flex items-center justify-center">
                    <span className="text-white font-bold">
                      {m.nombre?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-[#0F2D52]">{m.nombre}</p>
                    <CompatibilityBadge score={calcularScore(m)} />
                  </div>
                </div>
                <Link to={`/perfil-usuario/${m.id}`}>
                  <Button variant="primary" size="sm">Intercambiar</Button>
                </Link>
              </div>

              {/* Detalle del match */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Le doy */}
                <div className="bg-[#EEF3FF] rounded-xl p-3">
                  <p className="text-xs font-bold text-[#2D6BFF] mb-2">
                    LE PODÉS DAR ({m.yoLeDoy.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.yoLeDoy.slice(0, 8).map((f) => (
                      <span key={f.id} className="px-2 py-0.5 bg-white text-[#2D6BFF] rounded-md text-xs font-bold">
                        {f.code}
                      </span>
                    ))}
                    {m.yoLeDoy.length > 8 && (
                      <span className="px-2 py-0.5 text-[#2D6BFF] text-xs font-bold">
                        +{m.yoLeDoy.length - 8}
                      </span>
                    )}
                  </div>
                </div>

                {/* Me da */}
                <div className="bg-[#E6FBF5] rounded-xl p-3">
                  <p className="text-xs font-bold text-[#1faa80] mb-2">
                    TE PUEDE DAR ({m.elMeDa.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {m.elMeDa.slice(0, 8).map((f) => (
                      <span key={f.id} className="px-2 py-0.5 bg-white text-[#1faa80] rounded-md text-xs font-bold">
                        {f.code}
                      </span>
                    ))}
                    {m.elMeDa.length > 8 && (
                      <span className="px-2 py-0.5 text-[#1faa80] text-xs font-bold">
                        +{m.elMeDa.length - 8}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {m.posibles > 0 && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  ⚡ {m.posibles} intercambio{m.posibles > 1 ? "s" : ""} mutuo{m.posibles > 1 ? "s" : ""} posible{m.posibles > 1 ? "s" : ""}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}