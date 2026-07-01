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
$id_intercambio = $_POST['id'] ?? $_POST['id_intercambio'] ?? null;

if (!$id_intercambio) {
    echo json_encode(["success" => false, "mensaje" => "Falta el id del intercambio"]);
    exit;
}

// Traer el intercambio
$stmt = $conn->prepare("SELECT * FROM intercambio WHERE ID = ?");
$stmt->bind_param("i", $id_intercambio);
$stmt->execute();
$res = $stmt->get_result();
if ($res->num_rows == 0) {
    echo json_encode(["success" => false, "mensaje" => "Intercambio no encontrado"]);
    exit;
}
$t = $res->fetch_assoc();

// Solo el receptor (B) puede aceptar
if ($t['ID_UsuarioB'] != $id_usuario) {
    echo json_encode(["success" => false, "mensaje" => "No podés aceptar un intercambio que no te propusieron"]);
    exit;
}
if ($t['Estado'] !== 'Pendiente') {
    echo json_encode(["success" => false, "mensaje" => "Este intercambio ya fue procesado"]);
    exit;
}

$A = (int)$t['ID_UsuarioA'];   // ofrece figOfrece, recibe figPide
$B = (int)$t['ID_UsuarioB'];   // recibe figOfrece, entrega figPide
$figOfrece = (int)$t['ID_Figurita_Ofrece'];
$figPide   = (int)$t['ID_Figurita_Pide'];

// Función helper para restar una unidad (y borrar si llega a 0)
function restar($conn, $usuario, $figu) {
    $s = $conn->prepare("SELECT cantidad FROM usuariofigurita WHERE ID_Usuario = ? AND ID_Figurita = ?");
    $s->bind_param("ii", $usuario, $figu);
    $s->execute();
    $row = $s->get_result()->fetch_assoc();
    if (!$row || (int)$row['cantidad'] < 1) return false;

    if ((int)$row['cantidad'] <= 1) {
        $u = $conn->prepare("UPDATE usuariofigurita SET cantidad = 0 WHERE ID_Usuario = ? AND ID_Figurita = ?");
    } else {
        $u = $conn->prepare("UPDATE usuariofigurita SET cantidad = cantidad - 1 WHERE ID_Usuario = ? AND ID_Figurita = ?");
    }
    $u->bind_param("ii", $usuario, $figu);
    return $u->execute();
}

// Función helper para sumar una unidad (o insertar)
function sumar($conn, $usuario, $figu) {
    $s = $conn->prepare("SELECT cantidad FROM usuariofigurita WHERE ID_Usuario = ? AND ID_Figurita = ?");
    $s->bind_param("ii", $usuario, $figu);
    $s->execute();
    $row = $s->get_result()->fetch_assoc();
    if ($row) {
        $u = $conn->prepare("UPDATE usuariofigurita SET cantidad = cantidad + 1 WHERE ID_Usuario = ? AND ID_Figurita = ?");
    } else {
        $u = $conn->prepare("INSERT INTO usuariofigurita (ID_Usuario, ID_Figurita, cantidad) VALUES (?, ?, 1)");
    }
    $u->bind_param("ii", $usuario, $figu);
    return $u->execute();
}

// Validar que ambos tengan lo que corresponde
$conn->begin_transaction();
try {
    // A da figOfrece a B
    if (!restar($conn, $A, $figOfrece)) throw new Exception("El emisor ya no tiene la figurita que ofrece");
    if (!restar($conn, $B, $figPide))   throw new Exception("Vos ya no tenés la figurita que te piden");

    sumar($conn, $B, $figOfrece);
    sumar($conn, $A, $figPide);

    // Marcar como aceptado
    $up = $conn->prepare("UPDATE intercambio SET Estado = 'Aceptado' WHERE ID = ?");
    $up->bind_param("i", $id_intercambio);
    $up->execute();

    $conn->commit();
    echo json_encode(["success" => true, "mensaje" => "Intercambio realizado con éxito 🎉"]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "mensaje" => $e->getMessage()]);
}

$conn->close();
?>