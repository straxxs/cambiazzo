import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AlbumProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/album" element={<Album />} />
                    <Route path="/faltantes" element={<Faltantes />} />
                    <Route path="/buscar" element={<Buscar />} />
                    <Route path="/intercambios" element={<Intercambios />} />
                    <Route path="/perfil" element={<Perfil />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </AlbumProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
