<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { http_response_code(200); exit(0); }

session_start();
header('Content-Type: application/json');
include("conexion.php");

if (!isset($_SESSION['id'])) {
    echo json_encode(["success" => false, "mensaje" => "No autorizado", "data" => []]);
    exit;
}
$id = $_SESSION['id'];

$sql = "SELECT i.ID, i.ID_UsuarioA, i.ID_UsuarioB, i.Estado, i.Fecha,
               ua.nombre AS nombreA, ub.nombre AS nombreB,
               fo.Pagina AS ofrecePagina, fo.Numero AS ofreceNumero,
               fp.Pagina AS pidePagina,   fp.Numero AS pideNumero,
               i.ID_Figurita_Ofrece, i.ID_Figurita_Pide
        FROM intercambio i
        JOIN usuario ua ON ua.ID = i.ID_UsuarioA
        JOIN usuario ub ON ub.ID = i.ID_UsuarioB
        LEFT JOIN figurita fo ON fo.ID = i.ID_Figurita_Ofrece
        LEFT JOIN figurita fp ON fp.ID = i.ID_Figurita_Pide
        WHERE i.ID_UsuarioA = ? OR i.ID_UsuarioB = ?
        ORDER BY i.ID DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id, $id);
$stmt->execute();
$res = $stmt->get_result();

$data = [];
while ($row = $res->fetch_assoc()) {
    $data[] = [
        "id"          => (int)$row["ID"],
        "estado"      => $row["Estado"],
        "fecha"       => $row["Fecha"],
        "usuarioA"    => (int)$row["ID_UsuarioA"],
        "usuarioB"    => (int)$row["ID_UsuarioB"],
        "nombreA"     => $row["nombreA"],
        "nombreB"     => $row["nombreB"],
        "ofrece"      => $row["ofrecePagina"] . $row["ofreceNumero"],
        "pide"        => $row["pidePagina"] . $row["pideNumero"],
        "figOfrece"   => (int)$row["ID_Figurita_Ofrece"],
        "figPide"     => (int)$row["ID_Figurita_Pide"],
        "soyEmisor"   => ((int)$row["ID_UsuarioA"] === (int)$id),
    ];
}

echo json_encode(["success" => true, "miId" => $id, "data" => $data]);
$conn->close();
?>