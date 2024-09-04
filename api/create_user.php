<?php

session_start();

require './db_connect.php';
require './headers.php';



if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}


// Get the input data from the request

$data = json_decode(file_get_contents('php://input'), true);

$lastname = $data['lastname'] ?? '';
$firstname = $data['firstname'] ?? '';
$gradelevel = $data['gradelevel'] ?? '';
$password = $data['password'] ?? '';
$access = $data['access'] ?? '';

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

try {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("INSERT INTO students (lastname, firstname, gradelevel, access, password) VALUES (:lastname, :firstname, :gradelevel, :access, :password)");
    $stmt->execute(['lastname' => $lastname, 'firstname' => $firstname, 'gradelevel' => $gradelevel, 'access' => $access, 'password' => $hashedPassword]);

    echo json_encode(['message' => 'User created successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
