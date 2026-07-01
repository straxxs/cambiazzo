import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/index";

export default function Registro() {
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

    // Creamos FormData porque el PHP usa $_POST
    const formData = new FormData();
    formData.append("usuario", form.nombre);
    formData.append("edad", form.edad);
    formData.append("contraseña", form.password);

    try {
      const response = await fetch("http://localhost/Figus/registro.php", {
        method: "POST",
        body: formData, // Enviar como FormData
        credentials: "include", // Necesario para CORS
      });

      const result = await response.json();

      if (result.success) {
        alert(result.mensaje);
        navigate("/login");
      } else {
        setError(result.mensaje);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* ... (tu encabezado se mantiene igual) ... */}
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre de usuario</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Edad</label>
              <input
                type="number"
                value={form.edad}
                onChange={(e) => setForm({ ...form, edad: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contraseña</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
              />
            </div>

            {error && <div className="bg-[#FFF0F0] text-[#E53935] text-sm rounded-xl px-4 py-3">{error}</div>}

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}