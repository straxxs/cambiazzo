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

$id_usuario = $_SESSION['id'];
$id_intercambio = $_POST['id'] ?? null;
if (!$id_intercambio) {
    echo json_encode(["success" => false, "mensaje" => "Falta el id"]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM intercambio WHERE ID = ?");
$stmt->bind_param("i", $id_intercambio);
$stmt->execute();
$t = $stmt->get_result()->fetch_assoc();
if (!$t) { echo json_encode(["success" => false, "mensaje" => "No encontrado"]); exit; }

if ($t['ID_UsuarioB'] != $id_usuario) {
    echo json_encode(["success" => false, "mensaje" => "No podés aceptar esta oferta"]);
    exit;
}
if ($t['Estado'] !== 'Pendiente') {
    echo json_encode(["success" => false, "mensaje" => "Ya fue procesado"]);
    exit;
}

$A = (int)$t['ID_UsuarioA'];
$B = (int)$t['ID_UsuarioB'];

// Traer las figuritas del detalle
$d = $conn->prepare("SELECT ID_Figurita, Tipo FROM intercambio_detalle WHERE ID_Intercambio = ?");
$d->bind_param("i", $id_intercambio);
$d->execute();
$dr = $d->get_result();

$ofrece = []; // las da A
$pide = [];   // las da B
while ($row = $dr->fetch_assoc()) {
    if ($row["Tipo"] === "Ofrece") $ofrece[] = (int)$row["ID_Figurita"];
    else $pide[] = (int)$row["ID_Figurita"];
}

function tieneRepetida($conn, $u, $f) {
    $s = $conn->prepare("SELECT cantidad FROM usuariofigurita WHERE ID_Usuario = ? AND ID_Figurita = ?");
    $s->bind_param("ii", $u, $f);
    $s->execute();
    $r = $s->get_result()->fetch_assoc();
    return $r && (int)$r['cantidad'] >= 2;
}
function restar($conn, $u, $f) {
    $s = $conn->prepare("UPDATE usuariofigurita SET cantidad = cantidad - 1 WHERE ID_Usuario = ? AND ID_Figurita = ?");
    $s->bind_param("ii", $u, $f);
    return $s->execute();
}
function sumar($conn, $u, $f) {
    $s = $conn->prepare("SELECT cantidad FROM usuariofigurita WHERE ID_Usuario = ? AND ID_Figurita = ?");
    $s->bind_param("ii", $u, $f);
    $s->execute();
    if ($s->get_result()->fetch_assoc()) {
        $x = $conn->prepare("UPDATE usuariofigurita SET cantidad = cantidad + 1 WHERE ID_Usuario = ? AND ID_Figurita = ?");
    } else {
        $x = $conn->prepare("INSERT INTO usuariofigurita (ID_Usuario, ID_Figurita, cantidad) VALUES (?, ?, 1)");
    }
    $x->bind_param("ii", $u, $f);
    return $x->execute();
}

$conn->begin_transaction();
try {
    // Validar que ambos tengan repetidas todas las que entregan
    foreach ($ofrece as $f) if (!tieneRepetida($conn, $A, $f)) throw new Exception("El emisor ya no tiene una repetida");
    foreach ($pide as $f)   if (!tieneRepetida($conn, $B, $f)) throw new Exception("Ya no tenés una repetida requerida");

    // Transferir: A da 'ofrece' a B; B da 'pide' a A
    foreach ($ofrece as $f) { restar($conn, $A, $f); sumar($conn, $B, $f); }
    foreach ($pide as $f)   { restar($conn, $B, $f); sumar($conn, $A, $f); }

    $up = $conn->prepare("UPDATE intercambio SET Estado = 'Aceptado' WHERE ID = ?");
    $up->bind_param("i", $id_intercambio);
    $up->execute();

    $conn->commit();
    echo json_encode(["success" => true, "mensaje" => "Intercambio realizado 🎉"]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "mensaje" => $e->getMessage()]);
}
$conn->close();
?>