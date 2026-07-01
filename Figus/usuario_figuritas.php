<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }

header("Content-Type: application/json");
session_start();
include "conexion.php";

if (!isset($_SESSION["id"])) {
    echo json_encode(["success" => false, "mensaje" => "No autorizado"]);
    exit;
}

$id_usuario = $_SESSION["id"];

// GET: React pide el estado de las figuritas
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT f.numero, f.pagina, uf.cantidad 
            FROM figurita f 
            LEFT JOIN usuariofigurita uf ON f.ID = uf.ID_Figurita AND uf.ID_Usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $res = $stmt->get_result();

    $stickers = [];
    while ($row = $res->fetch_assoc()) {
        $codigo = $row['pagina'] . $row['numero'];
        $stickers[$codigo] = (int)($row['cantidad'] ?? 0);
    }
    echo json_encode(["success" => true, "stickers" => $stickers]);
    exit;
}

// POST: React actualiza una figurita
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);
    $code = $datos["code"] ?? "";
    $estado = (int)($datos["estado"] ?? 0);

    preg_match('/([A-Za-z]+)([0-9]+)/', $code, $matches);
    $pagina = $matches[1];
    $numero = (int)$matches[2];

    $stmt = $conn->prepare("SELECT ID FROM figurita WHERE Pagina = ? AND Numero = ?");
    $stmt->bind_param("si", $pagina, $numero);
    $stmt->execute();
    $id_figu = $stmt->get_result()->fetch_assoc()["ID"];

    $stmt = $conn->prepare("REPLACE INTO usuariofigurita (ID_Usuario, ID_Figurita, cantidad) VALUES (?, ?, ?)");
    $stmt->bind_param("iii", $id_usuario, $id_figu, $estado);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
    exit;
}
?>