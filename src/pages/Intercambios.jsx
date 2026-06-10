import { useState } from "react";
import { Button, Badge, CompatibilityBadge, ProgressBar } from "../components/ui/index";

const MOCK_TRADES = [
  {
    id: 1,
    user: "Rodrigo M.",
    avatar: "R",
    compatibility: 84,
    theyHaveINeed: ["ARG3", "ARG7", "BRA2", "FRA1", "ARG15", "ESP2", "ITA4", "URU1"],
    iHaveTheyNeed: ["BRA5", "MEX2", "FRA8", "GER1", "ARG18", "COL3", "POR7"],
    status: "pending",
    online: true,
  },
  {
    id: 2,
    user: "Ana V.",
    avatar: "A",
    compatibility: 67,
    theyHaveINeed: ["ESP4", "POR1", "FRA10", "ARG9"],
    iHaveTheyNeed: ["ITA2", "BRA3", "ARG12", "ESP7"],
    status: "pending",
    online: true,
  },
  {
    id: 3,
    user: "Tomás F.",
    avatar: "T",
    compatibility: 52,
    theyHaveINeed: ["MEX3", "COL1", "BRA7"],
    iHaveTheyNeed: ["ARG5", "FRA3", "GER2", "ESP1"],
    status: "pending",
    online: false,
  },
  {
    id: 4,
    user: "Laura P.",
    avatar: "L",
    compatibility: 41,
    theyHaveINeed: ["JPN2", "KOR1"],
    iHaveTheyNeed: ["ARG4", "BRA9", "FRA2"],
    status: "accepted",
    online: false,
  },
];

export default function Intercambios() {
  const [activeTab, setActiveTab] = useState("ranking");
  const [expanded, setExpanded] = useState(null);

  const pending = MOCK_TRADES.filter((t) => t.status === "pending");
  const accepted = MOCK_TRADES.filter((t) => t.status === "accepted");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#0F2D52] mb-1">
          Intercambios
        </h1>
        <p className="text-gray-500">
          Los mejores intercambios posibles, calculados automáticamente
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Posibles", value: MOCK_TRADES.length, icon: "🔄", color: "#2D6BFF" },
          { label: "Pendientes", value: pending.length, icon: "⏳", color: "#DC2626" },
          { label: "Realizados", value: 18, icon: "✅", color: "#16A34A" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center"
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div
              className="text-2xl font-black"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {[
          { id: "ranking", label: "Ranking" },
          { id: "pendientes", label: `Pendientes (${pending.length})` },
          { id: "historial", label: "Historial" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
              activeTab === tab.id
                ? "bg-white text-[#0F2D52] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "ranking" && (
        <div className="flex flex-col gap-4">
          {MOCK_TRADES.sort((a, b) => b.compatibility - a.compatibility).map(
            (trade, i) => (
              <TradeCard
                key={trade.id}
                trade={trade}
                rank={i + 1}
                expanded={expanded === trade.id}
                onToggle={() =>
                  setExpanded(expanded === trade.id ? null : trade.id)
                }
              />
            )
          )}
        </div>
      )}

      {activeTab === "pendientes" && (
        <div className="flex flex-col gap-4">
          {pending.length === 0 ? (
            <EmptyState icon="⏳" title="Sin intercambios pendientes" />
          ) : (
            pending.map((trade, i) => (
              <TradeCard
                key={trade.id}
                trade={trade}
                rank={i + 1}
                expanded={expanded === trade.id}
                onToggle={() =>
                  setExpanded(expanded === trade.id ? null : trade.id)
                }
                showActions
              />
            ))
          )}
        </div>
      )}

      {activeTab === "historial" && (
        <div className="flex flex-col gap-4">
          {accepted.length === 0 ? (
            <EmptyState icon="📋" title="Sin intercambios realizados aún" />
          ) : (
            accepted.map((trade) => (
              <TradeCard
                key={trade.id}
                trade={trade}
                rank={null}
                expanded={expanded === trade.id}
                onToggle={() =>
                  setExpanded(expanded === trade.id ? null : trade.id)
                }
                done
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

function TradeCard({ trade, rank, expanded, onToggle, showActions, done }) {
  const matchCount = Math.min(
    trade.theyHaveINeed.length,
    trade.iHaveTheyNeed.length
  );

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm transition-all duration-200 overflow-hidden ${
        expanded ? "border-[#16A34A]" : "border-gray-100"
      }`}
    >
      <div
        className="p-5 flex items-center gap-4 cursor-pointer"
        onClick={onToggle}
      >
        {rank && (
          <div className="w-8 h-8 rounded-full bg-[#F5F7FA] flex items-center justify-center text-sm font-black text-gray-400 flex-shrink-0">
            #{rank}
          </div>
        )}

        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-full bg-[#0F2D52] flex items-center justify-center text-white font-black">
              {trade.avatar}
            </div>
            {trade.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#16A34A] border-2 border-white" />
            )}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-[#0F2D52] truncate">{trade.user}</div>
            <CompatibilityBadge score={trade.compatibility} />
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden sm:flex flex-col items-center">
            <span className="text-lg font-black text-[#0F2D52]">
              {matchCount}x{matchCount}
            </span>
            <span className="text-xs text-gray-400">intercambio</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-[#16A34A]">
              {trade.compatibility}
              <span className="text-sm text-gray-300">%</span>
            </span>
            <div className="w-16">
              <ProgressBar value={trade.compatibility} max={100} height={4} color="#16A34A" />
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-50 pt-4">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-[#EEF3FF] rounded-xl p-4">
              <p className="text-xs font-bold text-[#2D6BFF] uppercase tracking-wide mb-3">
                Figuritas que te sirven ({trade.theyHaveINeed.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {trade.theyHaveINeed.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-white text-[#2D6BFF] rounded-lg text-xs font-bold border border-[#c5d8ff]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#DCFCE7] rounded-xl p-4">
              <p className="text-xs font-bold text-[#16A34A] uppercase tracking-wide mb-3">
                Figuritas que le servís ({trade.iHaveTheyNeed.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {trade.iHaveTheyNeed.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-white text-[#16A34A] rounded-lg text-xs font-bold border border-[#a7f3d0]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {!done && (
            <div className="flex gap-2">
              <Button variant="primary" size="sm">
                Proponer intercambio
              </Button>
              <Button variant="secondary" size="sm">
                Ver perfil
              </Button>
            </div>
          )}

          {showActions && (
            <div className="flex gap-2 mt-2">
              <Button variant="success" size="sm">
                ✓ Aceptar
              </Button>
              <Button variant="danger" size="sm">
                Cancelar
              </Button>
            </div>
          )}

          {done && (
            <Badge variant="green">✓ Intercambio realizado</Badge>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyState({ icon, title }) {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-gray-500 font-medium">{title}</p>
    </div>
  );
}
