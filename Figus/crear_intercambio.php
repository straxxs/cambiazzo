<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { http_response_code(200); exit(0); }

session_start();
header("Content-Type: application/json");
include("conexion.php");

if (!isset($_SESSION['id'])) {
    echo json_encode(["success" => false, "mensaje" => "Tenés que iniciar sesión"]);
    exit;
}

$A = $_SESSION['id'];
// Los datos llegan como JSON con arrays
$json = json_decode(file_get_contents('php://input'), true);
$B        = $json['usuarioB'] ?? null;
$ofrece   = $json['ofrece']   ?? [];   // array de IDs que doy
$pide     = $json['pide']     ?? [];   // array de IDs que pido

if (!$B || count($ofrece) === 0 || count($pide) === 0) {
    echo json_encode(["success" => false, "mensaje" => "Elegí al menos una figurita de cada lado"]);
    exit;
}
if ($A == $B) {
    echo json_encode(["success" => false, "mensaje" => "No podés intercambiar con vos mismo"]);
    exit;
}

// Validar que TODAS las que ofrezco las tengo repetidas (>= 2)
foreach ($ofrece as $fid) {
    $s = $conn->prepare("SELECT cantidad FROM usuariofigurita WHERE ID_Usuario = ? AND ID_Figurita = ?");
    $s->bind_param("ii", $A, $fid);
    $s->execute();
    $row = $s->get_result()->fetch_assoc();
    if (!$row || (int)$row['cantidad'] < 2) {
        echo json_encode(["success" => false, "mensaje" => "Solo podés ofrecer figuritas repetidas (×2)"]);
        exit;
    }
}

$conn->begin_transaction();
try {
    // 1. Crear el intercambio (cabecera)
    $stmt = $conn->prepare("INSERT INTO intercambio (ID_UsuarioA, ID_UsuarioB, Estado) VALUES (?, ?, 'Pendiente')");
    $stmt->bind_param("ii", $A, $B);
    $stmt->execute();
    $idIntercambio = $stmt->insert_id;

    // 2. Insertar detalles
    $det = $conn->prepare("INSERT INTO intercambio_detalle (ID_Intercambio, ID_Figurita, Tipo) VALUES (?, ?, ?)");
    foreach ($ofrece as $fid) {
        $tipo = 'Ofrece';
        $det->bind_param("iis", $idIntercambio, $fid, $tipo);
        $det->execute();
    }
    foreach ($pide as $fid) {
        $tipo = 'Pide';
        $det->bind_param("iis", $idIntercambio, $fid, $tipo);
        $det->execute();
    }

    $conn->commit();
    echo json_encode(["success" => true, "mensaje" => "Intercambio creado", "id" => $idIntercambio]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "mensaje" => "Error: " . $e->getMessage()]);
}
$conn->close();
?>