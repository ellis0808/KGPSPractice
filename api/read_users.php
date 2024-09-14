<?php


ob_start();


require './db_connect.php';
// require './headers.php';


try {
    $pdo = getDBConnection();

    header('Content-Type: application/json');

    // Check if a specific user ID was requested
    if (isset($_GET['student_id'])) {
        $stmt = $pdo->prepare("SELECT student_id, lastname, firstname, gradelevel, access, password FROM students WHERE student_id = :student_id");
        $stmt->execute(['student_id' => $_GET['student_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode($user);
        } else {
            echo json_encode(['message' => 'User not found']);
        }
    } else {
        // Retrieve all teachers if no specific ID is requested
        $stmt = $pdo->query(("SELECT student_id, lastname, firstname, gradelevel, access, password FROM students UNION SELECT teacher_id, lastname, title, access, admin, password FROM teachers"));
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['users' => $users]);
    }
    // if (isset($_GET['id'])) {
    //     $stmt = $pdo->prepare("SELECT * FROM teachers WHERE id = :id");
    //     $stmt->execute(['id' => $_GET['id']]);
    //     $user = $stmt->fetch(PDO::FETCH_ASSOC);

    //     if ($user) {
    //         echo json_encode($user);
    //     } else {
    //         echo json_encode(['message' => 'User not found']);
    //     }
    // } else {
    //     // Retrieve all students if no specific ID is requested
    //     $stmt = $pdo->query(("SELECT * FROM teachers"));
    //     $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //     echo json_encode(['teachers' => $teachers]);
    // }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

ob_end_flush();
