import React from "react";
import { Link } from "react-router-dom";
import { useAlbum } from "../context/AlbumContext";
import { useAuth } from "../context/AuthContext";
import { ProgressBar, StatCard, Button } from "../components/ui/index";

export default function Dashboard() {
  const { stickers, cargando } = useAlbum();
  const { user } = useAuth();

  // 1. Calculamos stats localmente solo cuando 'stickers' tenga datos
  // Esto evita el error de "undefined" sin tocar el contexto
  const stats = React.useMemo(() => {
    if (!stickers || Object.keys(stickers).length === 0) return null;
    
    const values = Object.values(stickers);
    const total = 980;
    const owned = values.filter(v => v >= 1).length;
    const repeated = values.filter(v => v === 2).length;
    const missing = total - owned;
    const percent = total > 0 ? Math.round((owned / total) * 100) : 0;
    
    return { total, owned, repeated, missing, percent };
  }, [stickers]);

  // 2. Si está cargando o stats aún es null, mostramos un estado seguro
  if (cargando || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando tu progreso...</p>
      </div>
    );
  }

  // 3. Renderizado seguro con los datos ya calculados
  return (
    <div className="min-h-screen bg-white">
      {/* ... Hero Section se mantiene igual ... */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-xl font-black text-[#0F2D52] mb-6">
          {user ? `Tu progreso` : "Tu progreso"}
          </h2>
          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-5xl font-black text-[#0F2D52]">
                {stats.percent}
                <span className="text-2xl text-gray-300">%</span>
              </span>
              <p className="text-sm text-gray-400 mt-1">completado</p>
            </div>
          </div>
          <ProgressBar value={stats.owned} max={stats.total} color="#2D6BFF" height={12} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Obtenidas" value={stats.owned} icon="✅" />
          <StatCard label="Repetidas" value={stats.repeated} icon="🔄" accent="#16A34A" />
          <StatCard label="Faltantes" value={stats.missing} icon="❌" accent="#DC2626" />
          <StatCard label="Completado" value={`${stats.percent}%`} icon="🏆" accent="#2D6BFF" />
        </div>
      </div>
    </div>
  );
}