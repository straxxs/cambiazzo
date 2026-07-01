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
header("Content-Type: application/json");
include("conexion.php");

if (!isset($_SESSION['id'])) {
    echo json_encode(["success" => false, "mensaje" => "Tenés que iniciar sesión"]);
    exit;
}

$id_intercambio = $_POST['id'] ?? null;
$id_usuario = $_POST['id_usuario'] ?? null;

if (!$id_intercambio || !$id_usuario) {
    echo json_encode(["success" => false, "mensaje" => "Faltan datos (id o usuario)"]);
    exit;
}

$sql = "SELECT * FROM intercambio WHERE ID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_intercambio);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows == 0) {
    echo json_encode(["success" => false, "mensaje" => "Intercambio no encontrado"]);
    exit;
}

$intercambio = $resultado->fetch_assoc();

if ($intercambio['ID_UsuarioA'] != $id_usuario && $intercambio['ID_UsuarioB'] != $id_usuario) {
    echo json_encode(["success" => false, "mensaje" => "No tenés permiso para cancelar este intercambio"]);
    exit;
}

$sql_cancel = "DELETE FROM intercambio WHERE ID = ?";
$stmt_cancel = $conn->prepare($sql_cancel);
$stmt_cancel->bind_param("i", $id_intercambio);

if ($stmt_cancel->execute()) {
    echo json_encode(["success" => true, "mensaje" => "Intercambio cancelado y eliminado correctamente"]);
} else {
    echo json_encode(["success" => false, "mensaje" => "Error al cancelar: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>