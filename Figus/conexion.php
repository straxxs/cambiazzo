<?php
// ⚠️ CORS PRIMERO, antes de CUALQUIER cosa (ni un espacio antes de <?php)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

$conn = new mysqli("localhost", "root", "", "cambiazzo");

if ($conn->connect_error) {
    header("Content-Type: application/json");
    echo json_encode([
        "success" => false,
        "mensaje" => "Error de conexión BD: " . $conn->connect_error
    ]);
    exit;
}
?>