import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { figuritasDeUsuario, crearIntercambio } from "../services/api";
import { Button } from "../components/ui/index";

export default function OtroPerfil() {
  const { id } = useParams();
  const { user } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [susFigus, setSusFigus] = useState([]);   // lo que ÉL tiene (para pedir)
  const [misFigus, setMisFigus] = useState([]);   // lo que YO tengo (para ofrecer)
  const [figPide, setFigPide] = useState(null);
  const [figOfrece, setFigOfrece] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`http://localhost/Figus/obtener_usuario.php?id=${id}`)
      .then((r) => r.json()).then(setUsuario);

    figuritasDeUsuario(id).then((d) => d.success && setSusFigus(d.figuritas));
    if (user) figuritasDeUsuario(user.id).then((d) => d.success && setMisFigus(d.figuritas));
  }, [id, user]);

  const proponer = async () => {
    if (!figOfrece || !figPide) { setMsg("Elegí qué ofrecés y qué pedís"); return; }
    const r = await crearIntercambio(id, figOfrece, figPide);
    setMsg(r.mensaje);
  };

  if (!usuario) return <div className="p-10 text-center">Cargando perfil...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border p-6 mb-6">
        <h1 className="text-2xl font-black text-[#0F2D52]">{usuario.nombre}</h1>
        <p className="text-gray-500">ID: {usuario.ID}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Lo que YO ofrezco */}
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="font-bold text-[#0F2D52] mb-3">Ofrecés (tuyas)</h3>
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
            {misFigus.map((f) => (
              <button key={f.id} onClick={() => setFigOfrece(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${
                  figOfrece === f.id ? "border-[#2D6BFF] bg-[#EEF3FF] text-[#2D6BFF]" : "border-gray-200 text-gray-500"
                }`}>
                {f.code}{f.repetida && " 🔄"}
              </button>
            ))}
          </div>
        </div>

        {/* Lo que le PIDO */}
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="font-bold text-[#0F2D52] mb-3">Pedís (de {usuario.nombre})</h3>
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
            {susFigus.map((f) => (
              <button key={f.id} onClick={() => setFigPide(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${
                  figPide === f.id ? "border-[#38D9A9] bg-[#E6FBF5] text-[#1faa80]" : "border-gray-200 text-gray-500"
                }`}>
                {f.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {msg && <p className="mt-4 text-sm font-medium text-[#2D6BFF]">{msg}</p>}

      <Button variant="primary" className="w-full mt-6" onClick={proponer}>
        Proponer intercambio
      </Button>
    </div>
  );
}