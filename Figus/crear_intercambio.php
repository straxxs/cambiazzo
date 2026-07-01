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

$usuarioA = $_SESSION['id'];                       // el que ofrece (yo)
$usuarioB = $_POST['usuarioB'] ?? null;            // el que recibe
$figOfrece = $_POST['figOfrece'] ?? null;          // ID_Figurita que doy
$figPide   = $_POST['figPide'] ?? null;            // ID_Figurita que quiero

if (!$usuarioB || !$figOfrece || !$figPide) {
    echo json_encode(["success" => false, "mensaje" => "Faltan datos"]);
    exit;
}

if ($usuarioA == $usuarioB) {
    echo json_encode(["success" => false, "mensaje" => "No podés intercambiar con vos mismo"]);
    exit;
}

// Validar: yo tengo la que ofrezco (repetida, cantidad >= 2 idealmente)
$sql = "SELECT cantidad FROM usuariofigurita WHERE ID_Usuario = ? AND ID_Figurita = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $usuarioA, $figOfrece);
$stmt->execute();
$r = $stmt->get_result()->fetch_assoc();
if (!$r || (int)$r['cantidad'] < 1) {
    echo json_encode(["success" => false, "mensaje" => "No tenés esa figurita para ofrecer"]);
    exit;
}

$sql = "INSERT INTO intercambio (ID_UsuarioA, ID_UsuarioB, ID_Figurita_Ofrece, ID_Figurita_Pide, Estado)
        VALUES (?, ?, ?, ?, 'Pendiente')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiii", $usuarioA, $usuarioB, $figOfrece, $figPide);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "mensaje" => "Intercambio creado", "id" => $stmt->insert_id]);
} else {
    echo json_encode(["success" => false, "mensaje" => "Error: " . $conn->error]);
}

$stmt->close();
$conn->close();
?>