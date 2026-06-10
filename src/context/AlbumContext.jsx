import { createContext, useContext, useState, useCallback } from "react";

const AlbumContext = createContext(null);

// Estado por figurita: 0=no obtenida, 1=obtenida, 2=repetida
export function AlbumProvider({ children }) {
  const [stickers, setStickers] = useState(
    () => JSON.parse(localStorage.getItem("cambiazzo_stickers") || "{}")
  );

  const cycleSticker = useCallback((code) => {
    setStickers((prev) => {
      const current = prev[code] ?? 0;
      const next = (current + 1) % 3;
      const updated = { ...prev, [code]: next };
      localStorage.setItem("cambiazzo_stickers", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getStickerState = useCallback(
    (code) => stickers[code] ?? 0,
    [stickers]
  );

  const stats = (() => {
    const vals = Object.values(stickers);
    const owned = vals.filter((v) => v >= 1).length;
    const repeated = vals.filter((v) => v === 2).length;
    const total = 994;
    return {
      owned,
      repeated,
      missing: total - owned,
      total,
      percent: Math.round((owned / total) * 100),
    };
  })();

  return (
    <AlbumContext.Provider
      value={{ stickers, cycleSticker, getStickerState, stats }}
    >
      {children}
    </AlbumContext.Provider>
  );
}

export const useAlbum = () => useContext(AlbumContext);
