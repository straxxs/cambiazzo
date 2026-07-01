import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/index";
import { login } from "../services/api";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiamos errores previos

    try {
      // Mandamos las variables sueltas como las espera tu api.js
      const data = await login(usuario, contraseña); 
      
      if (data.success) {
        signIn(data.usuario); // Guardamos el usuario en el AuthContext
        navigate("/");        // Nos vamos al Dashboard principal
      } else {
        // Si el PHP nos dice "Contraseña incorrecta" o "Usuario no encontrado", lo mostramos
        setError(data.mensaje); 
      }
    } catch (err) {
      console.error("Error capturado en el Login:", err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div className="mb-6">
          <span className="font-black text-2xl text-[#0F2D52]">Cambia<span className="text-[#2D6BFF]">zzo</span></span>
          <h1 className="text-3xl font-black text-[#0F2D52] mt-4">Bienvenido de vuelta</h1>
          <p className="text-gray-400 text-sm mt-1">Ingresá a tu cuenta</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Tu nombre de usuario"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6BFF]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Tu contraseña"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6BFF]"
              required
            />
          </div>

          <Button type="submit" className="w-full py-3 bg-[#0F2D52] text-white font-bold rounded-xl mt-2 text-sm hover:bg-[#163f73] transition-all">
            Iniciar sesión
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tenés cuenta? <Link to="/registro" className="text-[#2D6BFF] font-bold hover:underline">Registrate</Link>
        </p>

      </div>
    </div>
  );
}