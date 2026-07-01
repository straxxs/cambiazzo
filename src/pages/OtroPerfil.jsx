import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PerfilUsuario() {
  const { id } = useParams(); // ID de la persona que buscaste
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Necesitas un endpoint que busque un usuario por ID
    fetch(`http://localhost:8080/Figus/obtener_usuario.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setUsuario(data))
      .catch((err) => console.error("Error al cargar perfil ajeno:", err));
  }, [id]);

  if (!usuario) return <div className="p-10 text-center">Cargando perfil...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border p-6">
        <h1 className="text-2xl font-black text-[#0F2D52]">{usuario.nombre}</h1>
        <p className="text-gray-500">ID de Usuario: {usuario.ID}</p>
      </div>
    </div>
  );
}