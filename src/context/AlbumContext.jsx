import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const AlbumContext = createContext();

export function AlbumProvider({ children }) {
  const { user } = useAuth();
  const [stickers, setStickers] = useState({});
  const [cargando, setCargando] = useState(true);

  const API_URL = "http://localhost/Figus/usuario_figuritas.php";

  // 👇 Extraemos la carga en una función reutilizable
  const recargarAlbum = useCallback(() => {
    if (!user) {
      setStickers({});
      setCargando(false);
      return;
    }

    setCargando(true);
    return fetch(API_URL, { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setStickers(data.success ? data.stickers : {});
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setCargando(false));
  }, [user]);

  // Se ejecuta al cambiar de usuario
  useEffect(() => {
    recargarAlbum();
  }, [recargarAlbum]);

  const getStickerState = (code) => stickers[code] ?? 0;

  const cycleSticker = async (code) => {
    const nuevoEstado = ((stickers[code] ?? 0) + 1) % 3;
    setStickers((prev) => ({ ...prev, [code]: nuevoEstado }));
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code, estado: nuevoEstado }),
      });
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  return (
    <AlbumContext.Provider
      value={{ stickers, getStickerState, cycleSticker, cargando, recargarAlbum }} // 👈 exportamos recargarAlbum
    >
      {children}
    </AlbumContext.Provider>
  );
}

export const useAlbum = () => useContext(AlbumContext);