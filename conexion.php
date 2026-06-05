<?php
$conn = new mysqli(
    "localhost",
    "root",
    "",
    "Cambiazzo"
);

if ($conn->connect_error) {
    die("Error de conexión");
}
?>