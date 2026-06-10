import { useState, useMemo } from "react";
import { useAlbum } from "../context/AlbumContext";
import { SPECIAL_SECTIONS, NATIONAL_TEAMS, generateStickers } from "../data/album";
import { Badge } from "../components/ui/index";

const ALL_SECTIONS = [
  ...SPECIAL_SECTIONS.map((s) => ({ ...s, isSpecial: true, emoji: s.emoji })),
  ...NATIONAL_TEAMS.slice(0, 48).map((t) => ({
    ...t,
    count: 20,
    isSpecial: false,
    emoji: t.flag,
  })),
];

export default function Faltantes() {
  const { getStickerState } = useAlbum();
  const [filterSection, setFilterSection] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const missing = useMemo(() => {
    const result = [];
    ALL_SECTIONS.forEach((section) => {
      const stickers = generateStickers(section.prefix, section.count);
      stickers.forEach((s) => {
        if (getStickerState(s.code) === 0) {
          result.push({ ...s, section });
        }
      });
    });
    return result;
  }, [getStickerState]);

  const filtered = useMemo(() => {
    return missing.filter((s) => {
      const matchSection =
        filterSection === "all" || s.section.id === filterSection;
      const matchSearch =
        !searchQuery ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.section.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSection && matchSearch;
    });
  }, [missing, filterSection, searchQuery]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((s) => {
      const key = s.section.id;
      if (!map[key]) map[key] = { section: s.section, stickers: [] };
      map[key].stickers.push(s);
    });
    return Object.values(map);
  }, [filtered]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0F2D52] mb-1">Faltantes</h1>
        <p className="text-gray-500">
          Te{" "}
          <span className="font-bold text-[#DC2626]">
            {missing.length} figuritas
          </span>{" "}
          para completar el álbum.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 max-w-sm">
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
            placeholder="Buscar por código o selección..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6BFF] focus:ring-2 focus:ring-[#EEF3FF] transition-all"
          />
        </div>

        <select
          value={filterSection}
          onChange={(e) => setFilterSection(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-[#2D6BFF] bg-white"
        >
          <option value="all">Todas las selecciones</option>
          {ALL_SECTIONS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.emoji} {s.name}
            </option>
          ))}
        </select>
      </div>

      {grouped.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-xl font-black text-[#0F2D52] mb-2">
            ¡No te falta ninguna!
          </h2>
          <p className="text-gray-500">El álbum está completo en esta categoría.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {grouped.map(({ section, stickers }) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{section.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0F2D52]">{section.name}</h3>
                </div>
                <Badge variant="red">{stickers.length} faltantes</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {stickers.map((s) => (
                  <span
                    key={s.code}
                    className="px-2.5 py-1 bg-[#FEE2E2] text-[#DC2626] rounded-lg text-xs font-bold"
                  >
                    {s.code}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
