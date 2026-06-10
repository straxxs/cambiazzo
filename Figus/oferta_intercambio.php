<?php

header("Content-Type: application/json");

include "conexion.php";

$id_usuario_ofrece = $_POST["id_usuario_ofrece"] ?? "";
$id_usuario_recibe = $_POST["id_usuario_recibe"] ?? "";
$id_figurita_ofrece = $_POST["id_figurita_ofrece"] ?? "";
$id_figurita_pide = $_POST["id_figurita_pide"] ?? "";

if (
    $id_usuario_ofrece === "" ||
    $id_usuario_recibe === "" ||
    $id_figurita_ofrece === "" ||
    $id_figurita_pide === ""
) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Faltan datos"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "INSERT INTO intercambio
    (
        ID_UsuarioA,
        ID_UsuarioB,
        ID_Figurita_Ofrece,
        ID_Figurita_Pide
    )
    VALUES (?, ?, ?, ?)"
);

$stmt->bind_param(
    "iiii",
    $id_usuario_ofrece,
    $id_usuario_recibe,
    $id_figurita_ofrece,
    $id_figurita_pide
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "mensaje" => "Oferta enviada correctamente",
        "id_oferta" => $stmt->insert_id
    ]);

} else {

    echo json_encode([
        "success" => false,
        "mensaje" => "Error al crear la oferta"
    ]);

}

$stmt->close();
$conn->close();

?>