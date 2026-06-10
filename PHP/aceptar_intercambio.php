<?php
session_start();
header("Content-Type: application/json");
include("conexion.php"); 

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["success" => false, "mensaje" => "Tenés que iniciar sesión"]);
    exit;
}

$id_intercambio = $_POST['ID'] ?? null;
$id_usuario = $_POST['usuario'] ?? null;

if (!$id_intercambio || !$id_usuario) {
    echo json_encode(["success" => false, "mensaje" => "Faltan datos de intercambio o usuario"]);
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

// 4. Verificamos que el usuario que acepta sea el receptor (UsuarioB)
if ($intercambio['ID_UsuarioB'] != $id_usuario) {
    echo json_encode(["success" => false, "mensaje" => "No podés aceptar un intercambio que no te propusieron a vos"]);
    exit;
}


$sql_delete = "DELETE FROM intercambio WHERE ID = ?";
$stmt_delete = $conn->prepare($sql_delete);
$stmt_delete->bind_param("i", $id_intercambio);

if ($stmt_delete->execute()) {
    echo json_encode(["success" => true, "mensaje" => "Intercambio aceptado con éxito (registro procesado)"]);
} else {
    echo json_encode(["success" => false, "mensaje" => "Error al procesar el intercambio: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>
