<?php
include("conexion.php");

header('Content-Type: application/json');

$sql = "SELECT * FROM intercambio ORDER BY ID DESC";
$res = $conn->query($sql);

$data = [];

if ($res) {
    while ($row = $res->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo json_encode(["error" => $conexion->error]);
    exit;
}

echo json_encode($data);
?>