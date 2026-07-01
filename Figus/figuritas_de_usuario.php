<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { http_response_code(200); exit(0); }

header("Content-Type: application/json");
include "conexion.php";

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id <= 0) {
    echo json_encode(["success" => false, "mensaje" => "ID inválido"]);
    exit;
}

$sql = "SELECT f.ID, f.Numero, f.Pagina, uf.cantidad
        FROM usuariofigurita uf
        JOIN figurita f ON f.ID = uf.ID_Figurita
        WHERE uf.ID_Usuario = ? AND uf.cantidad >= 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

$figus = [];
while ($row = $res->fetch_assoc()) {
    $figus[] = [
        "id"       => (int)$row["ID"],
        "code"     => $row["Pagina"] . $row["Numero"],
        "cantidad" => (int)$row["cantidad"],
        "repetida" => ((int)$row["cantidad"] >= 2),
    ];
}
echo json_encode(["success" => true, "figuritas" => $figus]);
$conn->close();
?>  