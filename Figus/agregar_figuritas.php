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
session_start();
include "conexion.php";

if (!isset($_SESSION["id"])) {
    echo json_encode([
        "success" => false,
        "mensaje" => "No autorizado"
    ]);
    exit;
}

$id_usuario = $_SESSION["id"];
$id_figurita = $_POST["id_figurita"] ?? 0;


if ($id_figurita == 0) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Falta id de figurita"
    ]);
    exit;
}


$sql = "SELECT cantidad FROM usuariofigurita 
        WHERE ID_Usuario = ? AND ID_Figurita = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id_usuario, $id_figurita);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $sql = "UPDATE usuariofigurita 
            SET cantidad = cantidad + 1 
            WHERE ID_Usuario = ? AND ID_Figurita = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $id_usuario, $id_figurita);
} else {
    $sql = "INSERT INTO usuariofigurita(ID_Usuario, ID_Figurita, cantidad)
            VALUES (?, ?, 1)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $id_usuario, $id_figurita);
}

$stmt->execute();

echo json_encode([
    "success" => true,
    "mensaje" => "Figurita agregada"
]);
?>