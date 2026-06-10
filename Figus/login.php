<?php

header("Content-Type: application/json");

include "conexion.php";

$nombre = $_POST["usuario_nombre"] ?? "";
$password = $_POST["password"] ?? "";

if ($nombre === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "mensaje" => "Faltan datos"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT ID, nombre, contraseña FROM usuario WHERE nombre = ?"
);

$stmt->bind_param("s", $nombre);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Usuario no encontrado"
    ]);
    exit;
}

$usuario = $resultado->fetch_assoc();

if(!password_verify($password, $usuario["password"])){
    echo json_encode([
        "success" => false,
        "mensaje" => "contraseña incorrecta"
    ]);
    exit;
}

echo json_encode([
    "success" => true,
    "mensaje" => "login exitoso",
    "usuario" => [
        "id" => $usuario["usuario_id"],
        "nombre" => $usuario["usuario_nombre"]
    ]
]);
?>