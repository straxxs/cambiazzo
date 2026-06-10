import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/index";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", contraseña: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Mock login for demo - replace with API call
      if (form.nombre && form.contraseña) {
        signIn({ id: 1, nombre: form.nombre });
        navigate("/");
      } else {
        setError("Completá todos los campos");
      }
    } catch {
      setError("Error al iniciar sesión");
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
          <h1 className="text-2xl font-black text-[#0F2D52]">Bienvenido de vuelta</h1>
          <p className="text-gray-500 text-sm mt-1">Ingresá a tu cuenta</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Usuario
              </label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Tu nombre de usuario"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6BFF] focus:ring-2 focus:ring-[#EEF3FF] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={form.contraseña}
                onChange={(e) => setForm({ ...form, contraseña: e.target.value })}
                placeholder="Tu contraseña"
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
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿No tenés cuenta?{" "}
          <Link to="/registro" className="text-[#2D6BFF] font-semibold hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
