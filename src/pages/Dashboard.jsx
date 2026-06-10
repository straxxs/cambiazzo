import { Link } from "react-router-dom";
import { useAlbum } from "../context/AlbumContext";
import { useAuth } from "../context/AuthContext";
import { ProgressBar, StatCard, Button, CompatibilityBadge } from "../components/ui/index";

const MOCK_BEST_TRADE = {
  user: "Rodrigo M.",
  avatar: "R",
  theyHaveINeed: 14,
  iHaveTheyNeed: 11,
  compatibility: 84,
};

const MOCK_ACTIVITY = [
  { type: "trade", text: "Intercambiaste ARG7 con Lucas P.", time: "Hace 2 horas" },
  { type: "add", text: "Agregaste BRA3 a tu álbum", time: "Hace 5 horas" },
  { type: "trade", text: "Nueva oferta de María G.", time: "Ayer" },
];

export default function Dashboard() {
  const { stats } = useAlbum();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #0F2D52 0px, #0F2D52 1px, transparent 0px, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#16A34A] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                Mundial FIFA 2026 — Álbum oficial Panini
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F2D52] leading-[1.1] tracking-tight mb-6">
                Completá tu álbum
                <br />
                <span className="text-[#2D6BFF]">más rápido.</span>
              </h1>

              <p className="text-lg text-gray-500 max-w-xl mb-8 leading-relaxed">
                Registrá tus figuritas, encontrá faltantes y descubrí los
                mejores intercambios automáticamente.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link to={user ? "/album" : "/registro"}>
                  <Button size="lg" variant="primary">
                    {user ? "Ir a mi álbum" : "Comenzar gratis"}
                  </Button>
                </Link>
                <Link to="/album">
                  <Button size="lg" variant="secondary">
                    Explorar álbum
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto">
              <div className="grid grid-cols-3 gap-4 lg:flex lg:flex-col lg:gap-4 lg:w-56">
                {[
                  { n: "994", l: "figuritas totales", icon: "🃏" },
                  { n: "2.4K+", l: "usuarios registrados", icon: "👥" },
                  { n: "18K+", l: "intercambios realizados", icon: "🔄" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="bg-[#F5F7FA] rounded-2xl p-4 text-center lg:text-left"
                  >
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-2xl font-black text-[#0F2D52]">
                      {s.n}
                    </div>
                    <div className="text-xs text-gray-500">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="border-t border-gray-100 mb-12" />

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-[#0F2D52]">
                {user ? `Tu progreso, ${user.nombre}` : "Tu progreso"}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Álbum Mundial FIFA 2026
              </p>
            </div>
            <Link to="/album">
              <Button variant="ghost" size="sm">
                Ver álbum →
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="flex items-end justify-between mb-3">
              <div>
                <span className="text-5xl font-black text-[#0F2D52]">
                  {stats.percent}
                  <span className="text-2xl text-gray-300">%</span>
                </span>
                <p className="text-sm text-gray-400 mt-1">completado</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">
                  {stats.owned} / {stats.total} figuritas
                </span>
              </div>
            </div>
            <ProgressBar
              value={stats.owned}
              max={stats.total}
              color="#2D6BFF"
              height={12}
            />
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D6BFF]" />
                <span className="text-xs text-gray-500">
                  {stats.owned} obtenidas
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                <span className="text-xs text-gray-500">
                  {stats.repeated} repetidas
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                <span className="text-xs text-gray-500">
                  {stats.missing} faltantes
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Obtenidas"
              value={stats.owned}
              sub={`de ${stats.total}`}
              icon="✅"
            />
            <StatCard
              label="Repetidas"
              value={stats.repeated}
              sub="para intercambiar"
              icon="🔄"
              accent="#16A34A"
            />
            <StatCard
              label="Faltantes"
              value={stats.missing}
              sub="para completar"
              icon="❌"
              accent="#DC2626"
            />
            <StatCard
              label="Completado"
              value={`${stats.percent}%`}
              sub="del álbum total"
              icon="🏆"
              accent="#2D6BFF"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-[#0F2D52]">
                Mejor intercambio disponible
              </h2>
              <Link to="/intercambios">
                <Button variant="ghost" size="sm">
                  Ver todos →
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0F2D52] flex items-center justify-center text-white font-black text-lg">
                    {MOCK_BEST_TRADE.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[#0F2D52]">
                      {MOCK_BEST_TRADE.user}
                    </p>
                    <CompatibilityBadge score={MOCK_BEST_TRADE.compatibility} />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-[#16A34A]">
                    {MOCK_BEST_TRADE.compatibility}
                    <span className="text-sm text-gray-300">%</span>
                  </div>
                  <p className="text-xs text-gray-400">compatibilidad</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-[#EEF3FF] rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-[#2D6BFF]">
                    {MOCK_BEST_TRADE.theyHaveINeed}
                  </div>
                  <p className="text-xs text-[#2D6BFF] font-medium mt-1">
                    figuritas que te sirven
                  </p>
                </div>
                <div className="bg-[#DCFCE7] rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-[#16A34A]">
                    {MOCK_BEST_TRADE.iHaveTheyNeed}
                  </div>
                  <p className="text-xs text-[#16A34A] font-medium mt-1">
                    figuritas que le servís
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                <span>
                  Intercambio posible:{" "}
                  <strong className="text-[#0F2D52]">
                    {Math.min(
                      MOCK_BEST_TRADE.theyHaveINeed,
                      MOCK_BEST_TRADE.iHaveTheyNeed
                    )}
                    x
                    {Math.min(
                      MOCK_BEST_TRADE.theyHaveINeed,
                      MOCK_BEST_TRADE.iHaveTheyNeed
                    )}
                  </strong>
                </span>
              </div>

              <Link to="/intercambios">
                <Button variant="primary" className="w-full">
                  Ver intercambio completo
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-black text-[#0F2D52] mb-4">
              Actividad reciente
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-1">
              {MOCK_ACTIVITY.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-xl hover:bg-[#F5F7FA] transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                      item.type === "trade"
                        ? "bg-[#EEF3FF]"
                        : "bg-[#DCFCE7]"
                    }`}
                  >
                    {item.type === "trade" ? "🔄" : "➕"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0F2D52] font-medium leading-snug">
                      {item.text}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
              <div className="p-3 text-center">
                <Link to="/intercambios">
                  <Button variant="ghost" size="sm">
                    Ver todo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
