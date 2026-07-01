import React, { useState, useEffect } from "react";
import { Button, Badge } from "../components/ui/index";
import { Link } from "react-router-dom";

export default function Buscar() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/Figus/usuarios.php", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, []);

  const results = users.filter((u) => 
    u.nombre?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-[#0F2D52] mb-6">Buscar usuarios</h1>
      
      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="w-full p-4 rounded-2xl border border-gray-200 mb-6"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      <div className="flex flex-col gap-4">
        {results.map((user) => (
          <div key={user.ID} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <p className="font-bold text-[#0F2D52]">{user.nombre}</p>
            <Link to={`/perfil-usuario/${user.ID}`}>
              <Button variant="primary" size="sm">Ver perfil</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}