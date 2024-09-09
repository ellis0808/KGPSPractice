<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';
require './headers.php';

// if (isset($_SESSION['user_id'])) {
//     header('Location: ../index.html');
//     exit();
// }


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
        $_SESSION['loggedIn'] = true;
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['firstname'] = $user['firstname'];
        $_SESSION['lastname'] = $user['lastname'];
        $_SESSION['access'] = $user['access'];

        // Debug: Log the session data
        error_log("Session Data: " . print_r($_SESSION, true));

        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'Invalid ID, firstname, lastname or password']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
