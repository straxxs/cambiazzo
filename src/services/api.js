const API_URL = "http://localhost:8080/Figus"; // Ajustá esta ruta según la carpeta de tu XAMPP

/**
 * 1. INICIAR SESIÓN
 * Envía las credenciales y crea la sesión en el servidor PHP.
 */
export async function login(usuario, contraseña) {
  // Enviamos los datos en formato JSON puro directamente
  const res = await fetch(`${API_URL}/sesion.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 👈 Le avisamos a PHP que viaja un JSON
    },
    body: JSON.stringify({
      usuario: usuario,
      password: contraseña, // 👈 'password' sin Ñ, tal cual lo busca tu PHP
    }),
    credentials: "include", // Vital para que Apache maneje las cookies de sesión
  });

  return await res.json();
}

/**
 * 2. REGISTRO DE USUARIO
 * Crea una cuenta nueva enviando usuario, contraseña y edad.
 */
export async function registrarUsuario(usuario, contraseña, edad) {
  const datos = new FormData();
  datos.append("usuario", usuario);
  datos.append("contraseña", contraseña);
  datos.append("edad", edad);

  const res = await fetch(`${API_URL}/registro.php`, {
    method: "POST",
    body: datos,
  });
  return await res.json();
}

/**
 * 3. OBTENER LISTA DE USUARIOS
 * Trae todos los usuarios de la base de datos para las vistas de comunidad o intercambios.
 */
export async function obtenerUsuarios() {
  const res = await fetch(`${API_URL}/usuarios.php`, {
    credentials: "include",
  });
  return await res.json();
}

/**
 * 4. PROGRESO GLOBAL DEL ÁLBUM
 * Devuelve el porcentaje de completado, cuántas tiene y cuántas le faltan al usuario logueado.
 */
export async function obtenerProgresoAlbum() {
  const res = await fetch(`${API_URL}/progreso_album.php`, {
    credentials: "include",
  });
  return await res.json();
}

/**
 * 5. FIGURITAS EN DETALLE DEL USUARIO
 * Devuelve dos listas separadas: las figuritas que el usuario 'tiene' y las que le 'faltan'.
 */
export async function obtenerFiguritasUsuario() {
  const res = await fetch(`${API_URL}/usuario_figuritas.php`, {
    credentials: "include",
  });
  return await res.json();
}

/**
 * 6. ACTUALIZAR ESTADO DE UNA FIGURITA
 * Registra o cambia la cantidad de una figurita al hacer click (0 = no tiene, 1 = una, 2 = repetida).
 */
export async function actualizarFigurita(idFigurita, cantidad) {
  const datos = new FormData();
  datos.append("id_figurita", idFigurita);
  datos.append("cantidad", cantidad);

  const res = await fetch(`${API_URL}/agregar_figuritas.php`, {
    method: "POST",
    body: datos,
    credentials: "include",
  });
  return await res.json();
}

/**
 * 7. CREAR PROPUESTA DE INTERCAMBIO
 * Inicia una oferta entre el usuario activo (A) y otro usuario (B), especificando qué ofrece y qué pide.
 */
export async function crearIntercambio(usuarioA, usuarioB, figA, figB) {
  const datos = new FormData();
  datos.append("usuarioA", usuarioA);
  datos.append("usuarioB", usuarioB);
  datos.append("figA", figA);
  datos.append("figB", figB);

  const res = await fetch(`${API_URL}/crear_intercambio.php`, {
    method: "POST",
    body: datos,
    credentials: "include",
  });
  return await res.json();
}

/**
 * 8. LISTAR INTERCAMBIOS HISTÓRICOS Y ACTIVOS
 * Trae todas las solicitudes de cambios registradas en el sistema.
 */
export async function listarIntercambios() {
  const res = await fetch(`${API_URL}/listar_intercambios.php`, {
    credentials: "include",
  });
  return await res.json();
}

/**
 * 9. ACEPTAR INTERCAMBIO
 * Cambia el estado de una propuesta a aceptado y efectúa los pases de figuritas en el backend.
 */
export async function aceptarIntercambio(idIntercambio) {
  const datos = new FormData();
  datos.append("id_intercambio", idIntercambio);

  const res = await fetch(`${API_URL}/aceptar_intercambio.php`, {
    method: "POST",
    body: datos,
    credentials: "include",
  });
  return await res.json();
}

/**
 * 10. CANCELAR O RECHAZAR INTERCAMBIO
 * Elimina o cancela una propuesta pendiente de intercambio.
 */
export async function cancelarIntercambio(idIntercambio) {
  const datos = new FormData();
  datos.append("id_intercambio", idIntercambio);

  const res = await fetch(`${API_URL}/cancelar_intercambio.php`, {
    method: "POST",
    body: datos,
    credentials: "include",
  });
  return await res.json();
}