import { useState } from "react";
import { useAlbum } from "../context/AlbumContext";
import { SPECIAL_SECTIONS, NATIONAL_TEAMS, generateStickers } from "../data/album";
import { StickerCard, ProgressBar, Button } from "../components/ui/index";

const ALL_SECTIONS = [
  ...SPECIAL_SECTIONS.map((s) => ({ ...s, isSpecial: true })),
  ...NATIONAL_TEAMS.slice(0, 48).map((t) => ({
    ...t,
    count: 20,
    isSpecial: false,
    emoji: t.flag,
  })),
];

export default function Album() {
  const { getStickerState, cycleSticker, stickers } = useAlbum();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const currentSection = selected
    ? ALL_SECTIONS.find((s) => s.id === selected)
    : null;

  const stickersForSection = currentSection
    ? generateStickers(currentSection.prefix, currentSection.count)
    : [];

  const sectionProgress = (section) => {
    const stickersInSection = generateStickers(section.prefix, section.count);
    const owned = stickersInSection.filter(
      (s) => (stickers[s.code] ?? 0) >= 1
    ).length;
    return { owned, total: section.count };
  };

  const filteredSections = ALL_SECTIONS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selected && currentSection) {
    const { owned, total } = sectionProgress(currentSection);
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0F2D52] mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al álbum
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl">{currentSection.emoji}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-[#0F2D52]">
              {currentSection.name}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-500">
                {owned} / {total} figuritas
              </span>
              <span className="text-sm font-bold text-[#2D6BFF]">
                {Math.round((owned / total) * 100)}%
              </span>
            </div>
            <div className="mt-2 w-48">
              <ProgressBar value={owned} max={total} height={6} />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-5 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border-2 border-gray-200 bg-white inline-block" />
            No obtenida
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border-2 border-[#2D6BFF] bg-[#EEF3FF] inline-block" />
            Obtenida
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded border-2 border-[#16A34A] bg-[#DCFCE7] inline-block" />
            Repetida
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {stickersForSection.map((sticker) => (
            <StickerCard
              key={sticker.id}
              code={sticker.code}
              state={getStickerState(sticker.code)}
              onClick={() => cycleSticker(sticker.code)}
            />
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Hacé clic para ciclar: sin figurita → obtenida → repetida
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0F2D52] mb-1">Mi Álbum</h1>
        <p className="text-gray-500">
          Seleccioná una selección para gestionar tus figuritas
        </p>
      </div>

      <div className="relative mb-6 max-w-sm">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Buscar selección..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6BFF] focus:ring-2 focus:ring-[#EEF3FF] transition-all"
        />
      </div>

      {filteredSections.some((s) => s.isSpecial) && (
        <div className="mb-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Secciones especiales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSections
              .filter((s) => s.isSpecial)
              .map((section) => {
                const { owned, total } = sectionProgress(section);
                return (
                  <SectionCard
                    key={section.id}
                    section={section}
                    owned={owned}
                    total={total}
                    onClick={() => setSelected(section.id)}
                  />
                );
              })}
          </div>
        </div>
      )}

      {filteredSections.some((s) => !s.isSpecial) && (
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Selecciones nacionales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSections
              .filter((s) => !s.isSpecial)
              .map((section) => {
                const { owned, total } = sectionProgress(section);
                return (
                  <SectionCard
                    key={section.id}
                    section={section}
                    owned={owned}
                    total={total}
                    onClick={() => setSelected(section.id)}
                  />
                );
              })}
          </div>
        </div>
      )}

      {filteredSections.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p>No se encontraron selecciones para "{search}"</p>
        </div>
      )}
    </div>
  );
}

function SectionCard({ section, owned, total, onClick }) {
  const pct = Math.round((owned / total) * 100);
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:border-[#2D6BFF] hover:shadow-md transition-all duration-150 text-left group"
    >
      <div className="text-3xl flex-shrink-0">{section.emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-[#0F2D52] text-sm truncate">
            {section.name}
          </span>
          <span className="text-xs font-bold text-[#2D6BFF] ml-2">
            {pct}%
          </span>
        </div>
        <ProgressBar value={owned} max={total} height={5} />
        <p className="text-xs text-gray-400 mt-1.5">
          {owned}/{total} figuritas
        </p>
      </div>
      <svg
        className="w-4 h-4 text-gray-300 group-hover:text-[#2D6BFF] transition-colors flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}
