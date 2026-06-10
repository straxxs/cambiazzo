// ProgressBar
export function ProgressBar({ value, max = 100, color = "#2D6BFF", height = 8 }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div
      className="w-full rounded-full bg-gray-100 overflow-hidden"
      style={{ height }}
    >
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

// StatCard
export function StatCard({ label, value, sub, accent = "#2D6BFF", icon }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <span className="text-lg">{icon}</span>
        )}
      </div>
      <span className="text-3xl font-black text-[#0F2D52]" style={{ color: accent === "default" ? "#0F2D52" : undefined }}>
        {value}
      </span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  );
}

// Badge
export function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-gray-100 text-gray-600",
    blue: "bg-[#EEF3FF] text-[#2D6BFF]",
    green: "bg-[#E6FBF5] text-[#1faa80]",
    red: "bg-[#FFF0F0] text-[#E53935]",
    yellow: "bg-yellow-50 text-yellow-600",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

// Button
export function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 disabled:opacity-50";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  const variants = {
    primary: "bg-[#2D6BFF] text-white hover:bg-[#1a5ae8] shadow-sm hover:shadow-md",
    secondary: "bg-white text-[#0F2D52] border border-gray-200 hover:bg-gray-50",
    danger: "bg-[#E53935] text-white hover:bg-[#c62828]",
    ghost: "text-[#2D6BFF] hover:bg-[#EEF3FF]",
    success: "bg-[#38D9A9] text-white hover:bg-[#2bbf92]",
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// StickerCard
export function StickerCard({ code, state, onClick }) {
  // state: 0=not owned, 1=owned, 2=repeated
  const styles = [
    "bg-white border-2 border-gray-200 text-gray-400 hover:border-[#2D6BFF] hover:text-[#2D6BFF]",
    "bg-[#EEF3FF] border-2 border-[#2D6BFF] text-[#2D6BFF]",
    "bg-[#E6FBF5] border-2 border-[#38D9A9] text-[#1faa80]",
  ];

  return (
    <button
      onClick={onClick}
      className={`relative w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-150 cursor-pointer select-none ${styles[state]}`}
    >
      <span className="text-xs font-bold leading-none">{code}</span>
      {state === 1 && (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
      {state === 2 && (
        <span className="text-[10px] font-black leading-none">×2</span>
      )}
    </button>
  );
}

// TradeCompatibilityBadge
export function CompatibilityBadge({ score }) {
  if (score >= 80) return <Badge variant="green">⚡ Excelente intercambio</Badge>;
  if (score >= 50) return <Badge variant="blue">👍 Muy buen intercambio</Badge>;
  return <Badge variant="yellow">🔄 Intercambio parcial</Badge>;
}
