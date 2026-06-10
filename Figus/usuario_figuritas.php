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


$sql_tiene = "
SELECT f.numero, f.pagina, uf.cantidad
FROM figurita f
JOIN usuariofigurita uf 
ON f.ID = uf.ID_Figurita
WHERE uf.ID_Usuario = ? AND uf.cantidad > 0
";

$stmt = $conn->prepare($sql_tiene);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$tiene = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

$sql_faltan = "
SELECT f.numero, f.pagina
FROM figurita f
LEFT JOIN usuariofigurita uf 
ON f.ID = uf.ID_Figurita AND uf.ID_Usuario = ?
WHERE uf.ID_Figurita IS NULL OR uf.cantidad = 0
";

$stmt = $conn->prepare($sql_faltan);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$faltan = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode([
        "success" => true,
        "tiene" => $tiene,
        "faltan" => $faltan
]);
?>