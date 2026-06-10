import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/index";

export default function Registro() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", edad: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.nombre || !form.edad || !form.password) {
      setError("Completá todos los campos");
      return;
    }
    setLoading(true);
    try {
      // Mock register for demo
      signIn({ id: Date.now(), nombre: form.nombre });
      navigate("/");
    } catch {
      setError("Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 justify-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#0F2D52] flex items-center justify-center">
              <span className="text-white font-black text-lg">C</span>
            </div>
            <span className="font-black text-2xl text-[#0F2D52]">
              Cambia<span className="text-[#2D6BFF]">zzo</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-[#0F2D52]">Crear cuenta</h1>
          <p className="text-gray-500 text-sm mt-1">
            Empezá a gestionar tu álbum
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Ej: Lucas2026"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6BFF] focus:ring-2 focus:ring-[#EEF3FF] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Edad
              </label>
              <input
                type="number"
                value={form.edad}
                onChange={(e) => setForm({ ...form, edad: e.target.value })}
                placeholder="Tu edad"
                min="5"
                max="99"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6BFF] focus:ring-2 focus:ring-[#EEF3FF] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Elegí una contraseña"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6BFF] focus:ring-2 focus:ring-[#EEF3FF] transition-all"
              />
            </div>

            {error && (
              <div className="bg-[#FFF0F0] text-[#E53935] text-sm rounded-xl px-4 py-3 font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-1"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            className="text-[#2D6BFF] font-semibold hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
