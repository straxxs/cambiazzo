import React, { useEffect } from "react";
import { useAlbum } from "../context/AlbumContext";
import { SPECIAL_SECTIONS, NATIONAL_TEAMS, generateStickers } from "../data/album";
import { StickerCard } from "../components/ui/index";

const TODAS_LAS_SECCIONES = [
  ...SPECIAL_SECTIONS,
  ...NATIONAL_TEAMS.map((t) => ({ ...t, nombre: t.name, emoji: t.flag })),
];

export default function Album() {
  const { stickers, cycleSticker, cargando, recargarAlbum } = useAlbum();

  // Refresca el álbum cada vez que entrás a esta página
  useEffect(() => {
    recargarAlbum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Cargando álbum...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-[#0F2D52] mb-8">Mi Álbum</h1>

      {TODAS_LAS_SECCIONES.map((seccion) => (
        <div key={seccion.prefix} className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            {seccion.emoji || seccion.flag} {seccion.name || seccion.nombre}
          </h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {generateStickers(seccion.prefix, 20).map((sticker) => (
              <StickerCard
                key={sticker.id}
                code={sticker.code}
                state={stickers[sticker.code] ?? 0}
                onClick={() => cycleSticker(sticker.code)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}