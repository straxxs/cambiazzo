import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AlbumProvider } from "./context/AlbumContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Album from "./pages/Album";
import Faltantes from "./pages/Faltantes";
import Buscar from "./pages/Buscar";
import Intercambios from "./pages/Intercambios";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import OtroPerfil from "./pages/OtroPerfil";

// Envoltorio de seguridad: Si no estás logueado, te rebota al Login automáticamente
function RutaProtegida() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renderiza la pantalla hija que corresponda dentro del Layout
}

function AppContent() {
  return (
    <Routes>
      {/* 🔓 RUTAS PÚBLICAS: Cualquiera puede entrar */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* 🔒 RUTAS PRIVADAS: Solo accesibles si iniciaste sesión */}
      <Route element={<RutaProtegida />}>
        {/* Envolvemos todas las páginas privadas dentro de tu componente Layout para que mantengan la barra de navegación lateral/superior */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/album" element={<Album />} />
          <Route path="/faltantes" element={<Faltantes />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/intercambios" element={<Intercambios />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil-usuario/:id" element={<OtroPerfil />} />
        </Route>
      </Route>

      {/* Redirección automática si escriben cualquier otra ruta que no exista */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AlbumProvider>
          <AppContent />
        </AlbumProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}