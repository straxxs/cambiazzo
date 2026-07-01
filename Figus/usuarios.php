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

include "conexion.php";

$result = $conn->query(
    "SELECT * FROM usuario"
);

$usuarios = [];

while($fila = $result->fetch_assoc()){
    $usuarios[] = $fila;
}

header("Content-Type: application/json");
echo json_encode($usuarios);