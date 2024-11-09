<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';


// $ip = $_SERVER['REMOTE_ADDR'];
// $failed_attempts = get_failed_attempts($ip);

// if ($failed_attempts && $failed_attempts['attempts'] >= 5 && (time() - strtotime($failed_attempts['attempt_time']) < 900)) {
//     die('Too many failed login attempts. Please try again later.');
// }

$data = json_decode(file_get_contents('php://input'), true);
$id = (int)$data['id'] ?? null;
$firstname = $data['firstName'] ?? null;
$title = $data['title'] ?? null;
$lastname = $data['lastName'] ?? null;
$access = $data['access'] ?? null;
$password = $data['password'] ?? null;
echo json_encode($id, $title, $lastname, $access, $password);

if (!$id) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}
if (!$password) {
    echo json_encode(['error' => 'Password is required']);
    exit;
}


// Student login
// if ($access === 'student') {

//     try {
//         $pdo = getDBConnection();

//         $stmt = $pdo->prepare('SELECT student_id, last_name, first_name, grade_level, password, access
//         FROM students
//         WHERE student_id = :student_id AND first_name = :first_name AND last_name = :last_name');
//         $stmt->execute(['student_id' => $id, 'first_name' => $firstname, 'last_name' => $lastname]);
//         $user = $stmt->fetch(PDO::FETCH_ASSOC);

//         if ($user && password_verify($password, $user['password'])) {
//             $_SESSION['loggedIn'] = true;
//             $_SESSION['userId'] = $user['student_id'];
//             $_SESSION['firstName'] = $user['first_name'];
//             $_SESSION['lastName'] = $user['last_name'];
//             $_SESSION['access'] = $user['access'];
//             $_SESSION['gradeLevel'] = $user['grade_level'];

//             // clear_failed_attempts($pdo, $ip);

//             echo json_encode($user);
//         } else {
//             // log_failed_attempt($ip);

//             echo json_encode(['error' => 'Invalid ID, firstname, lastname or password']);
//         }
//     } catch (PDOException $e) {
//         echo json_encode(['error' => $e->getMessage()]);
//     }
// } elseif ($access === 'teacher') {
// if ($access === 'teacher') {
//     // Teacher login
//     try {

//         $pdo = getDBConnection();
//         $stmt = $pdo->prepare('SELECT teacher_id, last_name, title, access, admin, password
//         FROM teachers
//         WHERE teacher_id = :teacher_id AND last_name = :last_name AND title = :title');
//         $stmt->execute(['teacher_id' => $id, 'last_name' => $lastname, 'title' => $firstname]);
//         $user = $stmt->fetch(PDO::FETCH_ASSOC);


//         if ($user && password_verify($password, $user['password'])) {
//             // if ($user) {
//             //     echo json_encode(['message' => "Password matches!"]);
//             // } else {
//             //     echo json_encode(['error' => "Password does not match."]);
//             // }

//             // if ($user && password_verify(
//             //     $inputPassword,
//             //     $storedHash
//             // )) {
//             $_SESSION['loggedIn'] = true;
//             $_SESSION['userId'] = $user['teacher_id'];
//             $_SESSION['lastName'] = $user['last_name'];
//             $_SESSION['title'] = $user['title'];
//             $_SESSION['access'] = $user['access'];
//             $_SESSION['admin'] = $user['admin'];

//             echo json_encode($user);
//         } else {
//             echo json_encode(['error' => 'Invalid ID, name, or password']);
//         }
//     } catch (PDOException $e) {
//         echo json_encode(['error' => $e->getMessage()]);
//     }
// }


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
