<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { http_response_code(200); exit(0); }

session_start();
session_unset();
session_destroy();
header("Content-Type: application/json");
echo json_encode(["success" => true, "mensaje" => "Sesión cerrada"]);
?>