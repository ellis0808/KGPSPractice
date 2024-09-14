<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';


$data = json_decode(file_get_contents('php://input'), true);
$id = $data['student_id'] ?? null;
$firstname = $data['firstname'] ?? null;
$lastname = $data['lastname'] ?? null;
$password = $data['password'] ?? null;

if (!$id || !$firstname || !$lastname || !$password) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

try {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare(('SELECT student_id, lastname, firstname, gradelevel, password, access FROM students WHERE student_id = :id AND firstname = :firstname AND lastname = :lastname'));
    $stmt->execute(['student_id' => $id, 'firstname' => $firstname, 'lastname' => $lastname]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['loggedIn'] = true;
        $_SESSION['userId'] = $user['student_id'];
        $_SESSION['firstName'] = $user['firstname'];
        $_SESSION['lastName'] = $user['lastname'];
        $_SESSION['access'] = $user['access'];
        $_SESSION['gradeLevel'] = $user['gradelevel'];


        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'Invalid ID, firstname, lastname or password']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
