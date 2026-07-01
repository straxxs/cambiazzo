<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "conexion.php";

// Si id no existe o no es numérico, detenemos el proceso
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // Usamos OR DIE para ver errores específicos en caso de que la consulta falle
    $stmt = $conn->prepare("SELECT ID, nombre FROM usuario WHERE ID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $usuario = $resultado->fetch_assoc();

    if ($usuario) {
        echo json_encode($usuario);
    } else {
        echo json_encode(["error" => "No existe el usuario"]);
    }
} else {
    echo json_encode(["error" => "ID inválido: " . $id]);
}
?>