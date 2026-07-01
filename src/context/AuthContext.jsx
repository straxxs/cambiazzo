import React, { createContext, useContext, useState } from "react"; // 👈 Agregamos 'React' acá

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("cambiazzo_user") || "null")
  );

  const signIn = (userData) => {
    setUser(userData);
    localStorage.setItem("cambiazzo_user", JSON.stringify(userData));
  };

  const signOut = async () => {
  try {
    await fetch("http://localhost/Figus/logout.php", {
      method: "POST",
      credentials: "include",
    });
  } catch (e) {
    console.error("Error al cerrar sesión:", e);
  }
  setUser(null);
  localStorage.removeItem("cambiazzo_user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
