<?php
include "conexion.php";

$id_ofrece = $_POST["ID_UsuarioA"];
$id_recibe = $_POST["ID_UsuarioB"];

$sql = "INSERT INTO Intercambio(ID_UsuarioA, ID_UsuarioB)
        VALUES (?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id_ofrece, $id_recibe);
$stmt->execute();

$id_intercambio = $stmt->insert_id;

echo json_encode([
    "mensaje" => "Intercambio creado",
    "id_intercambio" => $id_intercambio
]);
?>