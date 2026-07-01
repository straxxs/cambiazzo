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

include("conexion.php");

$A = $_POST['usuarioA'];
$B = $_POST['usuarioB'];
$figA = $_POST['figA'];
$figB = $_POST['figB'];

$stmt = $conn->prepare("INSERT INTO intercambio (...) VALUES (?, ?, ?, ?, 'pendiente', NOW())");
$stmt->bind_param("iiii", $A, $B, $figA, $figB);
$stmt->execute();

if ($conn->query($sql)) {
    echo "Intercambio creado";
} else {
    echo "Error: " . $conn->error;
}
?>