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
$title = $data['title'] ?? '';
$admin = $data['admin'] ?? '';
$password = $data['password'] ?? '';
$access = $data['access'] ?? '';

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    header('Content-Type: application/json');
    $pdo = getDBConnection();
    if ($access === 'student') {

        $stmt = $pdo->prepare("INSERT INTO students (last_name, first_name, grade_level, access, password) VALUES (:last_name, :first_name, :grade_level, :access, :password)");
        $stmt->execute(['last_name' => $lastname, 'first_name' => $firstname, 'grade_level' => $gradelevel, 'access' => $access, 'password' => $hashedPassword]);
    } elseif ($access === 'teacher') {
        $stmt = $pdo->prepare("INSERT INTO teachers (last_name, title, admin, access, password) VALUES (:last_name, :title, :admin, :access, :password)");
        $stmt->execute(['last_name' => $lastname, 'title' => $title, 'admin' => $admin, 'access' => $access, 'password' => $hashedPassword]);
    }

    echo json_encode(['message' => 'User created successfully', 'password' => $password, 'hashed password' => $hashedPassword]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to create user: ' . $e->getMessage()]);
}
