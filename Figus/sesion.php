<?php
// 1. Forzamos las cabeceras CORS para React manualmente antes de cualquier otra cosa
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// 2. Si el navegador solo hace el chequeo Preflight (OPTIONS), respondemos 200 y cortamos acá
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// 3. Ahora sí iniciamos sesión y definimos el formato JSON
session_start();
header("Content-Type: application/json");

include "conexion.php";

// Leer los datos que mandó React como JSON
$json = file_get_contents('php://input');
$datos_json = json_decode($json, true);

$nombre = $datos_json["usuario"] ?? $_POST["usuario"] ?? "";
$password = $datos_json["password"] ?? $_POST["password"] ?? "";

if ($nombre === "" || $password === "") {
    echo json_encode(["success" => false, "mensaje" => "Faltan datos de usuario o contraseña."]);
    exit;
}

// Consulta segura a la base de datos
$stmt = $conn->prepare("SELECT ID, nombre, contraseña FROM usuario WHERE nombre = ?");
$stmt->bind_param("s", $nombre);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    echo json_encode(["success" => false, "mensaje" => "Usuario no encontrado."]);
    exit;
}

$usuario = $resultado->fetch_assoc();

// Verificación de contraseña hash
if (!password_verify($password, $usuario["contraseña"])) {
    echo json_encode(["success" => false, "mensaje" => "Contraseña incorrecta."]);
    exit;
}

// Guardamos datos en la sesión de PHP
$_SESSION["id"] = $usuario["ID"];
$_SESSION["usuario"] = $usuario["nombre"];

// Respuesta exitosa para React
echo json_encode([
    "success" => true,
    "mensaje" => "Login exitoso",
    "usuario" => [
        "id" => $usuario["ID"],
        "nombre" => $usuario["nombre"]
    ]
]);
?>