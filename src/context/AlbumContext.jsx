import React, { createContext, useContext, useState, useEffect } from "react";

const AlbumContext = createContext();

export function AlbumProvider({ children }) {
  const [stickers, setStickers] = useState({});
  const [cargando, setCargando] = useState(true); // 👈 adentro del componente

  const API_URL = "http://localhost:8080/Figus/usuario_figuritas.php";

  useEffect(() => {
    fetch(API_URL, { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStickers(data.stickers);
        }
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setCargando(false));
  }, []);

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
    <AlbumContext.Provider value={{ stickers, getStickerState, cycleSticker, cargando }}>
      {children}
    </AlbumContext.Provider>
  );
}

export const useAlbum = () => useContext(AlbumContext);