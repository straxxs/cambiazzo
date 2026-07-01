<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Si el navegador solo está chequeando los permisos (Preflight), respondemos 200 y cortamos acá
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

header("Content-Type: application/json");

include "conexion.php";

$nombre = $_POST["usuario"] ?? "";
$edad = $_POST["edad"] ?? "";
$password = $_POST["contraseña"] ?? "";

if ($nombre === "" || $edad === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "mensaje" => "Faltan datos"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT ID FROM usuario WHERE nombre = ?"
);
$stmt->bind_param("s", $nombre);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "mensaje" => "El nombre de usuario ya está registrado"
    ]);
    exit;
}

$passwordHash = password_hash(
    $password,
    PASSWORD_DEFAULT
);

$stmt = $conn->prepare(
    "INSERT INTO usuario(nombre, edad, contraseña)
    VALUES (?, ?, ?)"
);

$stmt->bind_param(
    "sis",
    $nombre,
    $edad,
    $passwordHash
);

$stmt->execute();

echo json_encode([
    "success" => true,
    "mensaje" => "Usuario registrado"
]);