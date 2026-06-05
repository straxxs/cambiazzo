<?php

include "conexion.php";

$result = $conn->query(
    "SELECT * FROM Usuario"
);

$usuarios = [];

while($fila = $result->fetch_assoc()){
    $usuarios[] = $fila;
}

header("Content-Type: application/json");
echo json_encode($usuarios);