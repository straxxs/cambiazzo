const BASE_URL = "/api"; // Apunta a los PHP en el servidor

async function post(endpoint, data) {
  const formData = new FormData();
  Object.entries(data).forEach(([k, v]) => formData.append(k, v));
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  return res.json();
}

async function get(endpoint) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    credentials: "include",
  });
  return res.json();
}

// Auth
export const login = (nombre, contraseña) =>
  post("login.php", { nombre, contraseña });

export const registro = (nombre, edad, password) =>
  post("registro.php", { nombre, edad, password });

// Álbum
export const agregarFigurita = (ID_Figurita) =>
  post("agregar_figuritas.php", { ID_Figurita });

export const progresoAlbum = () => get("progreso_album.php");

// Intercambios
export const listarIntercambios = () => get("listar_intercambios.php");

export const crearIntercambio = (usuarioA, usuarioB, figA, figB) =>
  post("crear_intercambio.php", { usuarioA, usuarioB, figA, figB });

export const ofertaIntercambio = (data) =>
  post("oferta_intercambio.php", data);

export const aceptarIntercambio = (id, usuario) =>
  post("aceptar_intercambio.php", { id, usuario });

export const cancelarIntercambio = (id, usuario) =>
  post("cancelar_intercambo.php", { id, usuario });

export const ejecutarIntercambio = (id_intercambio) =>
  post("ejecutar_intercambio.php", { id_intercambio });
