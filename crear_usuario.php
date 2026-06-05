<?php

include "conexion.php";

$nombre = $_POST[""];
$edad = $_POST[""];
$contraseña = $_POST[""];

$sql = "INSERT INTO Usuario(nombre, edad, contraseña)
        values (?,?,?)"

$conn->query($sql);

echo json_encode([
    "mensaje" => "Usuario creado"
]);
