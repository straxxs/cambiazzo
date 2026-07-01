// src/data/album.js
export const SPECIAL_SECTIONS = [
  { id: "FWC", prefix: "FWC", name: "FIFA World Cup", count: 20, emoji: "🏆", start: 0 },
];

export const NATIONAL_TEAMS = [
  { id: "ALG", prefix: "ALG", name: "Argelia", flag: "🇩🇿" },
  { id: "ARG", prefix: "ARG", name: "Argentina", flag: "🇦🇷" },
  { id: "AUS", prefix: "AUS", name: "Australia", flag: "🇦🇺" },
  { id: "AUT", prefix: "AUT", name: "Austria", flag: "🇦🇹" },
  { id: "BEL", prefix: "BEL", name: "Bélgica", flag: "🇧🇪" },
  { id: "BIH", prefix: "BIH", name: "Bosnia y Herzegovina", flag: "🇧🇦" },
  { id: "BRA", prefix: "BRA", name: "Brasil", flag: "🇧🇷" },
  { id: "CAN", prefix: "CAN", name: "Canadá", flag: "🇨🇦" },
  { id: "CIV", prefix: "CIV", name: "Costa de Marfil", flag: "🇨🇮" },
  { id: "COD", prefix: "COD", name: "Congo DR", flag: "🇨🇩" },
  { id: "COL", prefix: "COL", name: "Colombia", flag: "🇨🇴" },
  { id: "CPV", prefix: "CPV", name: "Cabo Verde", flag: "🇨🇻" },
  { id: "CRO", prefix: "CRO", name: "Croacia", flag: "🇭🇷" },
  { id: "CUR", prefix: "CUR", name: "Curazao", flag: "🇨🇼" },
  { id: "CZE", prefix: "CZE", name: "República Checa", flag: "🇨🇿" },
  { id: "ECU", prefix: "ECU", name: "Ecuador", flag: "🇪🇨" },
  { id: "EGY", prefix: "EGY", name: "Egipto", flag: "🇪🇬" },
  { id: "ENG", prefix: "ENG", name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "ESP", prefix: "ESP", name: "España", flag: "🇪🇸" },
  { id: "FRA", prefix: "FRA", name: "Francia", flag: "🇫🇷" },
  { id: "GER", prefix: "GER", name: "Alemania", flag: "🇩🇪" },
  { id: "GHA", prefix: "GHA", name: "Ghana", flag: "🇬🇭" },
  { id: "HAI", prefix: "HAI", name: "Haití", flag: "🇭🇹" },
  { id: "IRN", prefix: "IRN", name: "Irán", flag: "🇮🇷" },
  { id: "IRQ", prefix: "IRQ", name: "Irak", flag: "🇮🇶" },
  { id: "JOR", prefix: "JOR", name: "Jordania", flag: "🇯🇴" },
  { id: "JPN", prefix: "JPN", name: "Japón", flag: "🇯🇵" },
  { id: "KOR", prefix: "KOR", name: "Corea del Sur", flag: "🇰🇷" },
  { id: "KSA", prefix: "KSA", name: "Arabia Saudita", flag: "🇸🇦" },
  { id: "MAR", prefix: "MAR", name: "Marruecos", flag: "🇲🇦" },
  { id: "MEX", prefix: "MEX", name: "México", flag: "🇲🇽" },
  { id: "NED", prefix: "NED", name: "Países Bajos", flag: "🇳🇱" },
  { id: "NOR", prefix: "NOR", name: "Noruega", flag: "🇳🇴" },
  { id: "NZL", prefix: "NZL", name: "Nueva Zelanda", flag: "🇳🇿" },
  { id: "PAN", prefix: "PAN", name: "Panamá", flag: "🇵🇦" },
  { id: "PAR", prefix: "PAR", name: "Paraguay", flag: "🇵🇾" },
  { id: "POR", prefix: "POR", name: "Portugal", flag: "🇵🇹" },
  { id: "QAT", prefix: "QAT", name: "Qatar", flag: "🇶🇦" },
  { id: "RSA", prefix: "RSA", name: "Sudáfrica", flag: "🇿🇦" },
  { id: "SCO", prefix: "SCO", name: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { id: "SEN", prefix: "SEN", name: "Senegal", flag: "🇸🇳" },
  { id: "SUI", prefix: "SUI", name: "Suiza", flag: "🇨🇭" },
  { id: "SWE", prefix: "SWE", name: "Suecia", flag: "🇸🇪" },
  { id: "TUN", prefix: "TUN", name: "Túnez", flag: "🇹🇳" },
  { id: "TUR", prefix: "TUR", name: "Turquía", flag: "🇹🇷" },
  { id: "URU", prefix: "URU", name: "Uruguay", flag: "🇺🇾" },
  { id: "USA", prefix: "USA", name: "Estados Unidos", flag: "🇺🇸" },
  { id: "UZB", prefix: "UZB", name: "Uzbekistán", flag: "🇺🇿" },
];

export function generateStickers(prefix, count, start = 1) {
  return Array.from({ length: count }, (_, i) => {
    const numero = i + start;
    return {
      id: `${prefix}${numero}`,
      code: `${prefix}${numero}`,
    };
  });
}