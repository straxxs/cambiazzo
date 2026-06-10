<?php
session_start();
header("Content-Type: application/json");

include "conexion.php";

$nombre = $_POST["usuario_nombre"] ?? "";
$password = $_POST["password"] ?? "";

if ($nombre === "" || $password === "") {
    echo json_encode(["success" => false, "mensaje" => "Faltan datos"]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT ID, nombre, contraseña FROM usuario WHERE nombre = ?"
);

$stmt->bind_param("s", $nombre);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    echo json_encode(["success" => false, "mensaje" => "Usuario no encontrado"]);
    exit;
}

$usuario = $resultado->fetch_assoc();

if (!password_verify($password, $usuario["contraseña"])) {
    echo json_encode(["success" => false, "mensaje" => "Contraseña incorrecta"]);
    exit;
}

$_SESSION["usuario_id"] = $usuario["id"];
$_SESSION["usuario_nombre"] = $usuario["nombre"];

echo json_encode([
    "success" => true,
    "mensaje" => "Login exitoso"
]);
?>