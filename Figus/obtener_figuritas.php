<?php

header("Content-Type: application/json");

include "conexion.php";

$id = isset($_GET('id')) ? interval($_GET('id')) : 0;

$sql = "SELECT f.ID, f.numero, f.pagina
        FROM figurita f
        inner join usuario_figurita uf ON f.ID = uf.id_figurita
        WHERE uf.id_usuario = ?"

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$resultado = $stmt->get_result();

$figuritas = [];

while ($row = $resultado->fetch_assoc()) {
    $figuritas[] = $row
}

echo json_encode($figuritas);
?>