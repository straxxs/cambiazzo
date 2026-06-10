# Cambiazzo 🏆

**Plataforma de intercambio de figuritas — Álbum Panini Mundial FIFA 2026**

## Instalación

```bash
npm install
npm run dev
```

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx        # Barra de navegación fija
│   │   └── Layout.jsx        # Wrapper de página con navbar
│   └── ui/
│       └── index.jsx         # ProgressBar, StatCard, Badge, Button,
│                             # StickerCard, CompatibilityBadge
├── context/
│   ├── AuthContext.jsx       # Estado global de autenticación
│   └── AlbumContext.jsx      # Estado global del álbum (stickers)
├── data/
│   └── album.js              # Definición de 994 figuritas en 48 secciones
├── pages/
│   ├── Dashboard.jsx         # Inicio — hero + stats + mejor intercambio
│   ├── Album.jsx             # Mi Álbum — categorías + grid de figuritas
│   ├── Faltantes.jsx         # Listado de figuritas no obtenidas
│   ├── Buscar.jsx            # Búsqueda de figuritas entre usuarios
│   ├── Intercambios.jsx      # Ranking de intercambios compatibles
│   ├── Perfil.jsx            # Perfil de usuario con estadísticas
│   ├── Login.jsx             # Inicio de sesión
│   └── Registro.jsx          # Registro de nuevo usuario
└── services/
    └── api.js                # Wrappers para todos los endpoints PHP
```

## Conexión con backend PHP

Los endpoints PHP deben vivir en el servidor bajo la ruta raíz (ej: `http://localhost/`). Vite redirige automáticamente `/api/*` al servidor PHP en desarrollo.

| Frontend (services/api.js)   | PHP endpoint             |
|------------------------------|--------------------------|
| `login()`                    | `login.php`              |
| `registro()`                 | `registro.php`           |
| `agregarFigurita()`          | `agregar_figuritas.php`  |
| `progresoAlbum()`            | `progreso_album.php`     |
| `listarIntercambios()`       | `listar_intercambios.php`|
| `crearIntercambio()`         | `crear_intercambio.php`  |
| `ofertaIntercambio()`        | `oferta_intercambio.php` |
| `aceptarIntercambio()`       | `aceptar_intercambio.php`|
| `cancelarIntercambio()`      | `cancelar_intercambo.php`|
| `ejecutarIntercambio()`      | `ejecutar_intercambio.php`|

## Estados de figuritas

Cada figurita cicla entre 3 estados con click:
- **0** — No obtenida (fondo blanco, borde gris)
- **1** — Obtenida (fondo azul suave, check ✓)
- **2** — Repetida (fondo verde suave, ×2)

El estado se persiste en `localStorage` y está listo para sincronizarse con la API PHP.

## Paleta de colores

| Token         | Hex       | Uso                          |
|---------------|-----------|------------------------------|
| Navy          | `#0F2D52` | Títulos, logo, fondos dark   |
| Blue          | `#2D6BFF` | Acción principal, links      |
| Red FIFA      | `#E53935` | Alertas, faltantes           |
| Mint          | `#38D9A9` | Éxito, repetidas, badges     |
| White         | `#FFFFFF` | Fondo de cards               |
| Gray light    | `#F5F7FA` | Fondo de página              |
