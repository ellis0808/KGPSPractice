<?php

require 'C:\Users\Logan\Desktop\Coding Practice\KGPS Practice\resources\backend\db_connect.php';

header('Content-Type: application/json');

// Allow requests from any origin
header("Access-Control-Allow-Origin: :http://myapp.local");
// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$firstname = $data['firstname'] ?? null;
$lastname = $data['lastname'] ?? null;
$password = $data['password'] ?? null;

if (!$id || !$firstname || !$lastname || !$password) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

try {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare(('SELECT id, lastname, firstname, gradelevel, password, access FROM students WHERE id = :id AND firstname = :firstname AND lastname = :lastname'));
    $stmt->execute(['id' => $id, 'firstname' => $firstname, 'lastname' => $lastname]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['firstname'] = $user['firstname'];
        $_SESSION['lastname'] = $user['lastname'];
        $_SESSION['access'] = $user['access'];

        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'Invalid ID, firstname, lastname or password']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
