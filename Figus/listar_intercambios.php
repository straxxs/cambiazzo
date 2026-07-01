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
               ua.nombre AS nombreA, ub.nombre AS nombreB
        FROM intercambio i
        JOIN usuario ua ON ua.ID = i.ID_UsuarioA
        JOIN usuario ub ON ub.ID = i.ID_UsuarioB
        WHERE i.ID_UsuarioA = ? OR i.ID_UsuarioB = ?
        ORDER BY i.ID DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id, $id);
$stmt->execute();
$res = $stmt->get_result();

$data = [];
while ($row = $res->fetch_assoc()) {
    $idInt = (int)$row["ID"];

    // Traer las figuritas del detalle
    $d = $conn->prepare("SELECT d.Tipo, f.Pagina, f.Numero
                         FROM intercambio_detalle d
                         JOIN figurita f ON f.ID = d.ID_Figurita
                         WHERE d.ID_Intercambio = ?");
    $d->bind_param("i", $idInt);
    $d->execute();
    $dr = $d->get_result();

    $ofrece = [];
    $pide = [];
    while ($fila = $dr->fetch_assoc()) {
        $code = $fila["Pagina"] . $fila["Numero"];
        if ($fila["Tipo"] === "Ofrece") $ofrece[] = $code;
        else $pide[] = $code;
    }

    $data[] = [
        "id"        => $idInt,
        "estado"    => $row["Estado"],
        "fecha"     => $row["Fecha"],
        "nombreA"   => $row["nombreA"],
        "nombreB"   => $row["nombreB"],
        "ofrece"    => $ofrece,   // array de códigos
        "pide"      => $pide,     // array de códigos
        "soyEmisor" => ((int)$row["ID_UsuarioA"] === (int)$id),
    ];
}

echo json_encode(["success" => true, "miId" => $id, "data" => $data]);
$conn->close();
?>