<?php
include("conexion.php");

$A = $_POST['usuarioA'];
$B = $_POST['usuarioB'];
$figA = $_POST['figA'];
$figB = $_POST['figB'];

$stmt = $conn->prepare("INSERT INTO intercambio (...) VALUES (?, ?, ?, ?, 'pendiente', NOW())");
$stmt->bind_param("iiii", $A, $B, $figA, $figB);
$stmt->execute();

if ($conn->query($sql)) {
    echo "Intercambio creado";
} else {
    echo "Error: " . $conn->error;
}
?>