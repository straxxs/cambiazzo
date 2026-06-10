<?php
session_start();
include "conexion.php";

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode([
        "success" => false,
        "mensaje" => "No autorizado"
    ]);
    exit;
}

$id_usuario = $_SESSION["usuario_id"];
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