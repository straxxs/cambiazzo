import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AlbumProvider } from "./context/AlbumContext";
import Layout from "./components/layout/Layout";
import Album from "./pages/Album";
import Faltantes from "./pages/Faltantes";
import Buscar from "./pages/Buscar";
import Intercambios from "./pages/Intercambios";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import OtroPerfil from "./pages/OtroPerfil";

function RutaProtegida() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route element={<RutaProtegida />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Album />} />
          <Route path="/faltantes" element={<Faltantes />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/intercambios" element={<Intercambios />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil-usuario/:id" element={<OtroPerfil />} />
        </Route>
      </Route>

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