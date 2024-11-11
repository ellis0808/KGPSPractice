<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';


$data = json_decode(file_get_contents('php://input'), true);
$selectedUser = $data['selectedUser'] ?? [];
$id = $selectedUser['id'] ?? null;
$access = $selectedUser['access'] ?? null;
$password = $selectedUser['password'] ?? null;


if (!$id) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}
if (!$password) {
    echo json_encode(['error' => 'Password is required']);
    exit;
}


try {
    $pdo = getDBConnection();
    // Student login
    if ($access === 'student') {
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
            echo json_encode($user);
        }
    } elseif ($access === 'teacher') {
        // Teacher login

        $stmt = $pdo->prepare('SELECT *
        FROM teachers
        WHERE teacher_id = :teacher_id');
        $stmt->execute(['teacher_id' => $id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['loggedIn'] = true;
            $_SESSION['userId'] = $user['teacher_id'];
            $_SESSION['lastName'] = $user['last_name'];
            $_SESSION['title'] = $user['title'];
            $_SESSION['access'] = $user['access'];
            $_SESSION['admin'] = $user['admin'];

            echo json_encode($user);
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid ID or password']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
