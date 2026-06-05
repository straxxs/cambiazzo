<?php
include "conexion.php";

$id_usuario = $_POST["ID_Usuario"];
$id_figurita = $_POST["ID_Figurita"];
$cantidad = $_POST["cantidad"];

$sql = "SELECT * FROM usuariofigurita 
        WHERE ID_Usuario = ? AND ID_Figurita = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id_usuario, $id_figurita);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $sql = "UPDATE Usuario_Figurita 
            SET cantidad = cantidad + ? 
            WHERE id_usuario = ? AND id_figurita = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $cantidad, $id_usuario, $id_figurita);
} else {
    $sql = "INSERT INTO Usuario_Figurita(ID_Usuario, ID_Figurita, cantidad)
            VALUES (?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $id_usuario, $id_figurita, $cantidad);
}

$stmt->execute();

echo json_encode(["mensaje" => "Figurita agregada"]);
?>