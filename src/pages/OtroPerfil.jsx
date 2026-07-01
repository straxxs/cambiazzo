import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import { useAuth } from "../context/AuthContext";
import { crearIntercambio, obtenerMatcheo } from "../services/api";
import { Button } from "../components/ui/index";


export default function OtroPerfil() {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 nuevo
  const { user } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [leDoy, setLeDoy] = useState([]);
  const [meDa, setMeDa] = useState([]);
  const [ofreceSel, setOfreceSel] = useState([]);
  const [pideSel, setPideSel] = useState([]);
  const [msg, setMsg] = useState("");
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false); // 👈 nuevo

  useEffect(() => {
    fetch(`http://localhost/Figus/obtener_usuario.php?id=${id}`)
      .then((r) => r.json())
      .then(setUsuario);

    obtenerMatcheo()
      .then((d) => {
        if (d.success) {
          const match = d.matches.find((m) => String(m.id) === String(id));
          if (match) {
            setLeDoy(match.yoLeDoy);
            setMeDa(match.elMeDa);
          } else {
            setLeDoy([]);
            setMeDa([]);
          }
        }
      })
      .finally(() => setCargando(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  const toggle = (arr, setArr, fid) => {
    setArr(arr.includes(fid) ? arr.filter((x) => x !== fid) : [...arr, fid]);
  };

  const proponer = async () => {
  if (ofreceSel.length === 0 || pideSel.length === 0) {
    setMsg("Elegí al menos una figurita de cada lado");
    return;
  }

  setEnviando(true);
  const r = await crearIntercambio(id, ofreceSel, pideSel);

  if (r.success) {
    setOfreceSel([]);
    setPideSel([]);
    setMsg("✅ ¡Intercambio propuesto! Redirigiendo...");

    // 👇 ESTO es lo que faltaba: espera 2s y redirige
    setTimeout(() => {
      navigate("/intercambios");
    }, 2000);
  } else {
    setMsg(r.mensaje);
    setEnviando(false);
  }
};

  if (!usuario) return <div className="p-10 text-center">Cargando perfil...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border p-6 mb-6">
        <h1 className="text-2xl font-black text-[#0F2D52]">{usuario.nombre}</h1>
        <p className="text-gray-500">ID: {usuario.ID}</p>
      </div>

      {cargando ? (
        <p className="text-center text-gray-400 py-10">
          Calculando intercambios posibles...
        </p>
      ) : leDoy.length === 0 && meDa.length === 0 ? (
        <div className="bg-white rounded-2xl border p-8 text-center">
          <div className="text-4xl mb-3">🤝</div>
          <p className="text-gray-500">
            No hay intercambios posibles con {usuario.nombre} por ahora.
          </p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Ofrecés */}
            <div className="bg-white rounded-2xl border p-5">
              <h3 className="font-bold text-[#0F2D52] mb-1">Ofrecés</h3>
              <p className="text-xs text-gray-400 mb-3">
                Tus repetidas que {usuario.nombre} necesita
              </p>
              {leDoy.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No tenés repetidas que le sirvan.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                  {leDoy.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => toggle(ofreceSel, setOfreceSel, f.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${
                        ofreceSel.includes(f.id)
                          ? "border-[#2D6BFF] bg-[#EEF3FF] text-[#2D6BFF]"
                          : "border-gray-200 text-gray-500"
                      }`}
                    >
                      {f.code} 🔄
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pedís */}
            <div className="bg-white rounded-2xl border p-5">
              <h3 className="font-bold text-[#0F2D52] mb-1">Pedís</h3>
              <p className="text-xs text-gray-400 mb-3">
                Repetidas de {usuario.nombre} que te faltan
              </p>
              {meDa.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No tiene repetidas que te sirvan.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                  {meDa.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => toggle(pideSel, setPideSel, f.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${
                        pideSel.includes(f.id)
                          ? "border-[#38D9A9] bg-[#E6FBF5] text-[#1faa80]"
                          : "border-gray-200 text-gray-500"
                      }`}
                    >
                      {f.code}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Resumen de selección */}
          <div className="bg-gray-50 rounded-xl p-4 mt-6 text-sm text-gray-600 text-center">
            Ofrecés <b className="text-[#2D6BFF]">{ofreceSel.length}</b> ·
            Pedís <b className="text-[#38D9A9]">{pideSel.length}</b>
          </div>

          {msg && (
            <p className="mt-4 text-sm font-medium text-[#2D6BFF] text-center">
              {msg}
            </p>
          )}

          <Button
            variant="primary"
            className="w-full mt-4"
            onClick={proponer}
            disabled={ofreceSel.length === 0 || pideSel.length === 0}
          >
            Proponer intercambio
          </Button>
        </>
      )}
    </div>
  );
}