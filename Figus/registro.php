<?php

header("Content-Type: application/json");

include "conexion.php";

$nombre = $_POST["usuario_nombre"] ?? "";
$edad = $_POST["edad"] ?? "";
$password = $_POST["password"] ?? "";

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