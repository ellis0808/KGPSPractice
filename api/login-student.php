<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';

error_reporting(0);
// $ip = $_SERVER['REMOTE_ADDR'];
// $failed_attempts = get_failed_attempts($ip);

// if ($failed_attempts && $failed_attempts['attempts'] >= 5 && (time() - strtotime($failed_attempts['attempt_time']) < 900)) {
//     die('Too many failed login attempts. Please try again later.');
// }

$data = json_decode(file_get_contents('php://input'), true);
$selectedUser = $data['selectedUser'] ?? [];
$id = $selectedUser['id'] ?? null;
$access = $selectedUser['access'] ?? null;
$password = $selectedUser['password'] ?? null;

$response = [$id, $access, $password];

// echo json_encode($response);
// exit;
if (!$id) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}
if (!$password) {
    echo json_encode(['error' => 'Password is required']);
    exit;
}


// Student login
try {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare('SELECT *
        FROM students
        WHERE student_id = :student_id');
    $stmt->execute(['student_id' => $id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['loggedIn'] = true;
        $_SESSION['userId'] = $user['student_id'];
        $_SESSION['firstName'] = $user['first_name'];
        $_SESSION['lastName'] = $user['last_name'];
        $_SESSION['access'] = $user['access'];
        $_SESSION['gradeLevel'] = $user['grade_level'];

        // clear_failed_attempts($pdo, $ip);

        echo json_encode($user);
    } else {
        // log_failed_attempt($ip);

        echo json_encode(['error' => 'Invalid ID, firstname, lastname or password']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}



// function get_failed_attempts($ip)
// {
//     global $pdo;
//     $stmt = $pdo->prepare("SELECT attempts, attempt_time FROM login_attempts WHERE ip_address = :ip");
//     $stmt->execute(['ip' => $ip]);
//     return $stmt->fetch(PDO::FETCH_ASSOC);
// }

// function log_failed_attempt($ip)
// {
//     global $pdo;
//     $stmt = $pdo->prepare("INSERT INTO login_attempts (ip_address, attempts)
//     VALUES (:ip, 1)
//     ON DUPLICATE KEY UPDATE attempts = attempts + 1, attempt_time = CURRENT_TIMESTAMP");
//     $stmt->execute(['ip' => $ip]);
// }

// function clear_failed_attempts($ip)
// {
//     global $pdo;
//     $stmt = $pdo->prepare("DELETE FROM login_attempts WHERE ip_address = :ip");
//     $stmt->execute(['ip' => $ip]);
// }