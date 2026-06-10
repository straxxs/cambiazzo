import { useAuth } from "../context/AuthContext";
import { useAlbum } from "../context/AlbumContext";
import { ProgressBar, StatCard, Button } from "../components/ui/index";
import { Link } from "react-router-dom";

export default function Perfil() {
  const { user, signOut } = useAuth();
  const { stats } = useAlbum();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-xl font-black text-[#0F2D52] mb-2">
          Iniciá sesión para ver tu perfil
        </h2>
        <p className="text-gray-500 mb-6">
          Guardá tu progreso y encontrá intercambios
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/login">
            <Button variant="secondary">Iniciar sesión</Button>
          </Link>
          <Link to="/registro">
            <Button variant="primary">Registrarse</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-20 h-20 rounded-2xl bg-[#0F2D52] flex items-center justify-center text-white text-3xl font-black flex-shrink-0">
          {user.nombre?.[0]?.toUpperCase()}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-black text-[#0F2D52] mb-1">
            {user.nombre}
          </h1>
          <p className="text-gray-400 text-sm mb-3">Coleccionista · Mundial 2026</p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="px-3 py-1 bg-[#EEF3FF] text-[#2D6BFF] rounded-full text-xs font-semibold">
              🏅 {stats.percent}% completado
            </span>
            <span className="px-3 py-1 bg-[#DCFCE7] text-[#16A34A] rounded-full text-xs font-semibold">
              🔄 {stats.repeated} repetidas
            </span>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={signOut}>
          Cerrar sesión
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-black text-[#0F2D52] mb-4">
          Progreso del álbum
        </h2>
        <div className="flex items-end justify-between mb-2">
          <span className="text-4xl font-black text-[#0F2D52]">
            {stats.percent}
            <span className="text-xl text-gray-300">%</span>
          </span>
          <span className="text-sm text-gray-500">
            {stats.owned} / {stats.total}
          </span>
        </div>
        <ProgressBar value={stats.owned} max={stats.total} height={10} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="Obtenidas" value={stats.owned} icon="✅" />
        <StatCard label="Repetidas" value={stats.repeated} icon="🔄" accent="#16A34A" />
        <StatCard label="Faltantes" value={stats.missing} icon="❌" accent="#DC2626" />
        <StatCard label="Intercambios" value={18} icon="🤝" accent="#2D6BFF" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-black text-[#0F2D52] mb-4">Acciones</h2>
        <div className="flex flex-col gap-2">
          <Link to="/album">
            <Button variant="secondary" className="w-full justify-start">
              📋 Ver mi álbum completo
            </Button>
          </Link>
          <Link to="/faltantes">
            <Button variant="secondary" className="w-full justify-start">
              ❌ Ver figuritas faltantes
            </Button>
          </Link>
          <Link to="/intercambios">
            <Button variant="secondary" className="w-full justify-start">
              🔄 Gestionar intercambios
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
