import { useState } from "react";
import { Button, Badge } from "../components/ui/index";

const MOCK_USERS = [
  {
    id: 1,
    name: "Lucas P.",
    avatar: "L",
    stickers: ["ARG3", "ARG7", "BRA2", "FRA1", "ARG15"],
    online: true,
  },
  {
    id: 2,
    name: "María G.",
    avatar: "M",
    stickers: ["ARG7", "ESP4", "ARG3", "ITA2", "ARG11"],
    online: false,
  },
  {
    id: 3,
    name: "Carlos R.",
    avatar: "C",
    stickers: ["BRA1", "ARG7", "MEX3", "FRA5", "ARG20"],
    online: true,
  },
  {
    id: 4,
    name: "Sofía T.",
    avatar: "S",
    stickers: ["ARG1", "ARG2", "ARG7", "URU3", "COL4"],
    online: false,
  },
];

export default function Buscar() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const results = searched && query.trim()
    ? MOCK_USERS.filter((u) =>
        u.stickers.some((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        )
      ).map((u) => ({
        ...u,
        matchingStickers: u.stickers.filter((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        ),
      }))
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0F2D52] mb-1">Buscar</h1>
        <p className="text-gray-500">
          Encontrá quién tiene la figurita que necesitás
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-10">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
              placeholder="Ej: ARG7, BRA, Francia..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearched(false);
              }}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:border-[#2D6BFF] focus:ring-2 focus:ring-[#EEF3FF] transition-all"
            />
          </div>
          <Button type="submit" size="lg" variant="primary">
            Buscar
          </Button>
        </div>

        {!searched && (
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs text-gray-400">Búsquedas frecuentes:</span>
            {["ARG7", "BRA1", "FRA10", "ESP5", "URU3"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQuery(s);
                  setSearched(true);
                }}
                className="px-2.5 py-1 bg-gray-100 hover:bg-[#DCFCE7] hover:text-[#16A34A] rounded-lg text-xs font-medium text-gray-600 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </form>

      {searched && (
        <>
          {results.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <div className="text-4xl mb-3">😔</div>
              <h3 className="text-lg font-bold text-[#0F2D52] mb-1">
                Sin resultados
              </h3>
              <p className="text-gray-500 text-sm">
                Ningún usuario tiene repetida "{query}" disponible.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {results.length} usuario{results.length !== 1 ? "s" : ""} tiene
                {results.length !== 1 ? "n" : ""}{" "}
                <strong className="text-[#0F2D52]">"{query}"</strong> disponible
              </p>
              <div className="flex flex-col gap-3">
                {results.map((user) => (
                  <UserResultCard key={user.id} user={user} query={query} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {!searched && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-sm">
            Ingresá el código de una figurita, selección o nombre para buscar
          </p>
        </div>
      )}
    </div>
  );
}

function UserResultCard({ user, query }) {
  const [contacted, setContacted] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-[#0F2D52] flex items-center justify-center text-white font-black text-lg">
          {user.avatar}
        </div>
        {user.online && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#16A34A] border-2 border-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-[#0F2D52]">{user.name}</span>
          {user.online ? (
            <Badge variant="green">En línea</Badge>
          ) : (
            <Badge variant="default">Desconectado</Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {user.matchingStickers.map((s) => (
            <span
              key={s}
              className="px-2.5 py-0.5 bg-[#DCFCE7] text-[#16A34A] rounded-lg text-xs font-bold"
            >
              {s} <span className="text-gray-400 font-normal">repetida</span>
            </span>
          ))}
        </div>
      </div>

      <Button
        variant={contacted ? "success" : "primary"}
        size="sm"
        onClick={() => setContacted(true)}
        className="flex-shrink-0"
      >
        {contacted ? "✓ Contactado" : "Contactar"}
      </Button>
    </div>
  );
}
