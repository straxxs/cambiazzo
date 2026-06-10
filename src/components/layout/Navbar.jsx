import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/album", label: "Mi Álbum" },
  { to: "/faltantes", label: "Faltantes" },
  { to: "/buscar", label: "Buscar" },
  { to: "/intercambios", label: "Intercambios" },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#0F2D52] flex items-center justify-center">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="font-black text-xl text-[#0F2D52] tracking-tight">
              Cambia<span className="text-[#2D6BFF]">zzo</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    active
                      ? "bg-[#EEF3FF] text-[#2D6BFF]"
                      : "text-gray-500 hover:text-[#0F2D52] hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/perfil"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0F2D52] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user.nombre?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.nombre}
                  </span>
                </Link>
                <button
                  onClick={signOut}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-[#0F2D52] transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="text-sm font-semibold bg-[#2D6BFF] text-white px-4 py-2 rounded-lg hover:bg-[#1a5ae8] transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? "bg-[#EEF3FF] text-[#2D6BFF]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  👤 {user.nombre}
                </Link>
                <button
                  onClick={() => { signOut(); setMenuOpen(false); }}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-left text-gray-500 hover:bg-gray-50"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 text-sm font-medium text-gray-600">Iniciar sesión</Link>
                <Link to="/registro" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 bg-[#2D6BFF] text-white rounded-lg text-sm font-semibold text-center">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
