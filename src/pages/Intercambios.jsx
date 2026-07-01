import React, { useState, useEffect, useCallback } from "react";
import { Button, Badge, CompatibilityBadge } from "../components/ui/index";
import { Link } from "react-router-dom";
import {
  listarIntercambios,
  aceptarIntercambio,
  cancelarIntercambio,
  obtenerMatcheo,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useAlbum } from "../context/AlbumContext";

export default function Intercambios() {
  const { user } = useAuth();
  const { recargarAlbum } = useAlbum();
  const [trades, setTrades] = useState([]);
  const [matches, setMatches] = useState([]);
  const [msg, setMsg] = useState("");
  const [cargandoMatch, setCargandoMatch] = useState(true);

  const cargar = useCallback(() => {
    listarIntercambios().then((d) => {
      if (d.success) setTrades(d.data);
    });
  }, []);

  const cargarMatches = useCallback(() => {
    setCargandoMatch(true);
    obtenerMatcheo()
      .then((d) => {
        if (d.success) setMatches(d.matches);
      })
      .finally(() => setCargandoMatch(false));
  }, []);

  useEffect(() => {
    cargar();
    cargarMatches();
  }, [cargar, cargarMatches]);

  const aceptar = async (id) => {
    const r = await aceptarIntercambio(id);
    setMsg(r.mensaje);
    if (r.success) {
      await recargarAlbum();
      cargarMatches(); // refresca recomendaciones tras el cambio
    }
    cargar();
  };

  const cancelar = async (id) => {
    const r = await cancelarIntercambio(id, user.id);
    setMsg(r.mensaje);
    cargar();
  };

  const estadoBadge = (e) => {
    if (e === "Aceptado") return <Badge variant="green">Aceptado</Badge>;
    if (e === "Rechazado") return <Badge variant="red">Rechazado</Badge>;
    return <Badge variant="yellow">Pendiente</Badge>;
  };

  const calcularScore = (m) => {
    if (m.posibles >= 3) return 90;
    if (m.posibles >= 1) return 60;
    return 30;
  };

  // Mostramos solo las mejores 3 recomendaciones
  const topMatches = matches.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-[#0F2D52] mb-6">Intercambios</h1>
      {msg && <p className="mb-4 text-sm font-medium text-[#2D6BFF]">{msg}</p>}

      {/* ─────────── RECOMENDACIONES ─────────── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-[#0F2D52]">
            ⚡ Recomendados para vos
          </h2>
          <Link to="/buscar" className="text-sm font-semibold text-[#2D6BFF] hover:underline">
            Ver todos →
          </Link>
        </div>

        {cargandoMatch ? (
          <p className="text-gray-400 text-sm">Buscando compatibilidades...</p>
        ) : topMatches.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-gray-500 text-sm">
            No hay recomendaciones todavía. Marcá tus figuritas repetidas y faltantes 🔄
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topMatches.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#0F2D52] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {m.nombre?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0F2D52] truncate">{m.nombre}</p>
                    <CompatibilityBadge score={calcularScore(m)} />
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-3 space-y-1">
                  <p>
                    <span className="font-bold text-[#2D6BFF]">Le puedes dar:</span>{" "}
                    {m.yoLeDoy.slice(0, 3).map((f) => f.code).join(", ") || "—"}
                    {m.yoLeDoy.length > 3 && ` +${m.yoLeDoy.length - 3}`}
                  </p>
                  <p>
                    <span className="font-bold text-[#1faa80]">Te puede dar:</span>{" "}
                    {m.elMeDa.slice(0, 3).map((f) => f.code).join(", ") || "—"}
                    {m.elMeDa.length > 3 && ` +${m.elMeDa.length - 3}`}
                  </p>
                </div>

                <Link to={`/perfil-usuario/${m.id}`} className="mt-auto">
                  <Button variant="primary" size="sm" className="w-full">
                    Intercambiar
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─────────── INTERCAMBIOS ACTIVOS ─────────── */}
      <section>
        <h2 className="text-xl font-black text-[#0F2D52] mb-4">Tus intercambios</h2>

        <div className="flex flex-col gap-4">
          {trades.length > 0 ? (
            trades.map((t) => (
              <div
                key={t.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-[#0F2D52]">
                      {t.soyEmisor
                        ? `Le propusiste a ${t.nombreB}`
                        : `${t.nombreA} te propuso`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ofrece{" "}
                      <span className="font-bold text-[#2D6BFF]">{t.ofrece}</span>
                      {"  →  "}
                      Pide <span className="font-bold text-[#38D9A9]">{t.pide}</span>
                    </p>
                  </div>
                  {estadoBadge(t.estado)}
                </div>

                {t.estado === "Pendiente" && (
                  <div className="flex gap-2">
                    {!t.soyEmisor && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => aceptar(t.id)}
                      >
                        Aceptar
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => cancelar(t.id)}
                    >
                      {t.soyEmisor ? "Cancelar" : "Rechazar"}
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center py-16 text-gray-500">
              No tenés intercambios activos.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}