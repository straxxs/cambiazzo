<?php
$conn = new mysqli(
    "localhost",
    "root",
    "",
    "Cambiazzo"
);

if ($conn->connect_error) {
    // Seteamos cabeceras de CORS y JSON para que React entienda qué pasó si se cae la BD
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type: application/json");
    
    echo json_encode(["success" => false, "mensaje" => "Error interno: No se pudo conectar a la base de datos"]);
    exit;
}
?>