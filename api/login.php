<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';


$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$firstname = $data['first_name'] ?? null;
$lastname = $data['last_name'] ?? null;
$password = $data['password'] ?? null;

if (!$id || !$firstname || !$lastname || !$password) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

try {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare(('SELECT id, last_name, first_name, grade_level, password, access FROM students WHERE id = :id AND first_name = :first_name AND last_name = :last_name'));
    $stmt->execute(['id' => $id, 'first_name' => $firstname, 'last_name' => $lastname]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['loggedIn'] = true;
        $_SESSION['userId'] = $user['id'];
        $_SESSION['firstName'] = $user['first_name'];
        $_SESSION['lastName'] = $user['last_name'];
        $_SESSION['access'] = $user['access'];
        $_SESSION['gradeLevel'] = $user['grade_level'];


        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'Invalid ID, firstname, lastname or password']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
