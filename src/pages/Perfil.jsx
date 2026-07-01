import React from "react";
import { useAuth } from "../context/AuthContext";
import { useAlbum } from "../context/AlbumContext";
import { ProgressBar, StatCard, Button } from "../components/ui/index";
import { Link } from "react-router-dom";

export default function Perfil() {
  const { user, signOut } = useAuth();
  const { stats } = useAlbum();

  // 1. Si no hay usuario, mostrar login
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-black text-[#0F2D52] mb-2">Iniciá sesión para ver tu perfil</h2>
        <Link to="/login"><Button variant="primary">Iniciar sesión</Button></Link>
      </div>
    );
  }

  // 2. PROTECCIÓN: Si stats es undefined o está cargando, evitamos el error
  if (!stats) {
    return <div className="text-center py-20 text-gray-500">Cargando datos de tu álbum...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-black text-[#0F2D52]">{user.nombre}</h1>
        <Button variant="secondary" size="sm" onClick={signOut} className="mt-2">Cerrar sesión</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-black text-[#0F2D52] mb-4">Progreso del álbum</h2>
        <ProgressBar value={stats.owned || 0} max={stats.total || 1} height={10} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="Obtenidas" value={stats.owned || 0} icon="✅" />
        <StatCard label="Repetidas" value={stats.repeated || 0} icon="🔄" accent="#16A34A" />
        <StatCard label="Faltantes" value={stats.missing || 0} icon="❌" accent="#DC2626" />
        <StatCard label="Intercambios" value={18} icon="🤝" accent="#2D6BFF" />
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-black text-[#0F2D52] mb-4">Acciones</h2>
        <Link to="/intercambios"><Button variant="primary" className="w-full">Gestionar intercambios</Button></Link>
      </div>
    </div>
  );
}