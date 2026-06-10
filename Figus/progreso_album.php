<?php

session_start();
header("Content-Type: application/json");

include "conexion.php";

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Debes iniciar sesión"
    ]);
    exit;
}

$id_usuario = $_SESSION["usuario_id"];

$total_album = 980;

$stmt = $conn->prepare(
    "SELECT COUNT(DISTINCT ID_Figurita) AS cantidad
     FROM usuariofigurita
     WHERE ID_Usuario = ?"
);

$stmt->bind_param("i", $id_usuario);
$stmt->execute();

$resultado = $stmt->get_result();

$fila = $resultado->fetch_assoc();

$cantidad = (int)$fila["cantidad"];
$progreso = ($cantidad / $total_album) * 100;

$faltan = $total_album - $cantidad; 

echo json_encode([
    "success" => true,
    "usuario_id" => $id_usuario,
    "figuritas_faltantes" => $faltan,
    "figuritas_obtenidas" => $cantidad,
    "total_album" => $total_album,
    "progreso" => round($progreso, 2)
]);

$stmt->close();
$conn->close();

?>