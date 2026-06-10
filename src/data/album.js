export const SPECIAL_SECTIONS = [
  { id: "FWC", name: "FWC", prefix: "FWC", count: 20, type: "special", emoji: "🏆" },
  { id: "COCA", name: "Coca-Cola", prefix: "COCA", count: 14, type: "special", emoji: "🥤" },
];

export const NATIONAL_TEAMS = [
  // Grupo A
  { id: "CZE", name: "Chequia", prefix: "CZE", flag: "CZE", group: "A" },
  { id: "MEX", name: "México", prefix: "MEX", flag: "MEX", group: "A" },
  { id: "RSA", name: "Sudáfrica", prefix: "RSA", flag: "RSA", group: "A" },
  { id: "KOR", name: "Corea del Sur", prefix: "KOR", flag: "KOR", group: "A" },
  // Grupo B
  { id: "BIH", name: "Bosnia y Herzegovina", prefix: "BIH", flag: "BIH", group: "B" },
  { id: "CAN", name: "Canadá", prefix: "CAN", flag: "CAN", group: "B" },
  { id: "QAT", name: "Catar", prefix: "QAT", flag: "QAT", group: "B" },
  { id: "SUI", name: "Suiza", prefix: "SUI", flag: "SUI", group: "B" },
  // Grupo C
  { id: "BRA", name: "Brasil", prefix: "BRA", flag: "BRA", group: "C" },
  { id: "HAI", name: "Haití", prefix: "HAI", flag: "HAI", group: "C" },
  { id: "MAR", name: "Marruecos", prefix: "MAR", flag: "MAR", group: "C" },
  { id: "SCO", name: "Escocia", prefix: "SCO", flag: "SCO", group: "C" },
  // Grupo D
  { id: "AUS", name: "Australia", prefix: "AUS", flag: "AUS", group: "D" },
  { id: "PAR", name: "Paraguay", prefix: "PAR", flag: "PAR", group: "D" },
  { id: "TUR", name: "Turquía", prefix: "TUR", flag: "TUR", group: "D" },
  { id: "USA", name: "Estados Unidos", prefix: "USA", flag: "USA", group: "D" },
  // Grupo E
  { id: "CUW", name: "Curazao", prefix: "CUW", flag: "CUW", group: "E" },
  { id: "ECU", name: "Ecuador", prefix: "ECU", flag: "ECU", group: "E" },
  { id: "GER", name: "Alemania", prefix: "GER", flag: "GER", group: "E" },
  { id: "CIV", name: "Costa de Marfil", prefix: "CIV", flag: "CIV", group: "E" },
  // Grupo F
  { id: "JPN", name: "Japón", prefix: "JPN", flag: "JPN", group: "F" },
  { id: "NED", name: "Países Bajos", prefix: "NED", flag: "NED", group: "F" },
  { id: "SWE", name: "Suecia", prefix: "SWE", flag: "SWE", group: "F" },
  { id: "TUN", name: "Túnez", prefix: "TUN", flag: "TUN", group: "F" },
  // Grupo G
  { id: "BEL", name: "Bélgica", prefix: "BEL", flag: "BEL", group: "G" },
  { id: "EGY", name: "Egipto", prefix: "EGY", flag: "EGY", group: "G" },
  { id: "IRN", name: "Irán", prefix: "IRN", flag: "IRN", group: "G" },
  { id: "NZL", name: "Nueva Zelanda", prefix: "NZL", flag: "NZL", group: "G" },
  // Grupo H
  { id: "CPV", name: "Cabo Verde", prefix: "CPV", flag: "CPV", group: "H" },
  { id: "KSA", name: "Arabia Saudita", prefix: "KSA", flag: "KSA", group: "H" },
  { id: "ESP", name: "España", prefix: "ESP", flag: "ESP", group: "H" },
  { id: "URU", name: "Uruguay", prefix: "URU", flag: "URU", group: "H" },
  // Grupo I
  { id: "FRA", name: "Francia", prefix: "FRA", flag: "FRA", group: "I" },
  { id: "IRQ", name: "Irak", prefix: "IRQ", flag: "IRQ", group: "I" },
  { id: "NOR", name: "Noruega", prefix: "NOR", flag: "NOR", group: "I" },
  { id: "SEN", name: "Senegal", prefix: "SEN", flag: "SEN", group: "I" },
  // Grupo J
  { id: "ALG", name: "Argelia", prefix: "ALG", flag: "ALG", group: "J" },
  { id: "ARG", name: "Argentina", prefix: "ARG", flag: "ARG", group: "J" },
  { id: "AUT", name: "Austria", prefix: "AUT", flag: "AUT", group: "J" },
  { id: "JOR", name: "Jordania", prefix: "JOR", flag: "JOR", group: "J" },
  // Grupo K
  { id: "COL", name: "Colombia", prefix: "COL", flag: "COL", group: "K" },
  { id: "COD", name: "RD del Congo", prefix: "COD", flag: "COD", group: "K" },
  { id: "POR", name: "Portugal", prefix: "POR", flag: "POR", group: "K" },
  { id: "UZB", name: "Uzbekistán", prefix: "UZB", flag: "UZB", group: "K" },
  // Grupo L
  { id: "CRO", name: "Croacia", prefix: "CRO", flag: "CRO", group: "L" },
  { id: "ENG", name: "Inglaterra", prefix: "ENG", flag: "ENG", group: "L" },
  { id: "GHA", name: "Ghana", prefix: "GHA", flag: "GHA", group: "L" },
  { id: "PAN", name: "Panamá", prefix: "PAN", flag: "PAN", group: "L" },
];

export const ALBUM_TOTAL = 994;

export function generateStickers(prefix, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}${i + 1}`,
    code: `${prefix}${i + 1}`,
    number: i + 1,
  }));
}
