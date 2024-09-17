<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';
// require './headers.php';



if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}


// Get the input data from the request

$data = json_decode(file_get_contents('php://input'), true);

$lastname = $data['last_name'] ?? '';
$firstname = $data['first_name'] ?? '';
$gradelevel = $data['grade_level'] ?? '';
$password = $data['password'] ?? '';
$access = $data['access'] ?? '';

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

try {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("INSERT INTO students (last_name, first_name, grade_level, access, password) VALUES (:last_name, :first_name, :grade_level, :access, :password)");
    $stmt->execute(['last_name' => $lastname, 'first_name' => $firstname, 'grade_level' => $gradelevel, 'access' => $access, 'password' => $hashedPassword]);

    echo json_encode(['message' => 'User created successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
