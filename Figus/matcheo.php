<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { http_response_code(200); exit(0); }

session_start();
header("Content-Type: application/json");
include "conexion.php";

if (!isset($_SESSION["id"])) {
    echo json_encode(["success" => false, "mensaje" => "No autorizado"]);
    exit;
}

$yo = (int)$_SESSION["id"];

// ── 1. MIS figuritas ──────────────────────────────
// Repetidas (cantidad >= 2) = las que puedo ofrecer
// Faltantes (cantidad = 0 o no las tengo) = las que necesito
$sql = "SELECT ID_Figurita, cantidad FROM usuariofigurita WHERE ID_Usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $yo);
$stmt->execute();
$res = $stmt->get_result();

$misRepetidas = [];   // figus que tengo de sobra (para dar)
$misTengo = [];       // todas las que tengo (cantidad >= 1)
while ($row = $res->fetch_assoc()) {
    $fid = (int)$row["ID_Figurita"];
    $cant = (int)$row["cantidad"];
    if ($cant >= 1) $misTengo[$fid] = true;
    if ($cant >= 2) $misRepetidas[$fid] = true;
}

// ── 2. Recorrer TODOS los demás usuarios ──────────
$usuarios = $conn->query("SELECT ID, nombre FROM usuario WHERE ID != $yo");
$resultado = [];

// Datos de figuritas para mostrar códigos legibles
$figData = [];
$fq = $conn->query("SELECT ID, Numero, Pagina FROM figurita");
while ($f = $fq->fetch_assoc()) {
    $figData[(int)$f["ID"]] = $f["Pagina"] . $f["Numero"];
}

while ($u = $usuarios->fetch_assoc()) {
    $otroId = (int)$u["ID"];

    // Figuritas del otro usuario
    $s = $conn->prepare("SELECT ID_Figurita, cantidad FROM usuariofigurita WHERE ID_Usuario = ?");
    $s->bind_param("i", $otroId);
    $s->execute();
    $r = $s->get_result();

    $otroRepetidas = [];
    $otroTengo = [];
    while ($row = $r->fetch_assoc()) {
        $fid = (int)$row["ID_Figurita"];
        $cant = (int)$row["cantidad"];
        if ($cant >= 1) $otroTengo[$fid] = true;
        if ($cant >= 2) $otroRepetidas[$fid] = true;
    }

    // ── Lo que YO le doy: mis repetidas que él NO tiene ──
    $yoLeDoy = [];
    foreach ($misRepetidas as $fid => $_) {
        if (!isset($otroTengo[$fid])) {
            $yoLeDoy[] = ["id" => $fid, "code" => $figData[$fid] ?? "?"];
        }
    }

    // ── Lo que ÉL me da: sus repetidas que yo NO tengo ──
    $elMeDa = [];
    foreach ($otroRepetidas as $fid => $_) {
        if (!isset($misTengo[$fid])) {
            $elMeDa[] = ["id" => $fid, "code" => $figData[$fid] ?? "?"];
        }
    }

    // ── Score de compatibilidad ──
    // Match ideal = min(cuántas le doy, cuántas me da) → intercambios posibles
    $posibles = min(count($yoLeDoy), count($elMeDa));
    $totalBeneficio = count($yoLeDoy) + count($elMeDa);

    // Solo incluimos usuarios con los que hay ALGO para hacer
    if ($totalBeneficio > 0) {
        $resultado[] = [
            "id"        => $otroId,
            "nombre"    => $u["nombre"],
            "yoLeDoy"   => $yoLeDoy,
            "elMeDa"    => $elMeDa,
            "posibles"  => $posibles,        // intercambios mutuos posibles
            "score"     => $totalBeneficio,  // beneficio total
        ];
    }
}

// Ordenar: primero los matches con más intercambios mutuos posibles
usort($resultado, function($a, $b) {
    if ($b["posibles"] === $a["posibles"]) {
        return $b["score"] - $a["score"];
    }
    return $b["posibles"] - $a["posibles"];
});

echo json_encode(["success" => true, "matches" => $resultado]);
$conn->close();
?>