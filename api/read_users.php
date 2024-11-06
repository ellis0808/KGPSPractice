<?php


ob_start();


require './db_connect.php';
// require './headers.php';


try {
    $pdo = getDBConnection();

    header('Content-Type: application/json');
    $id = $_GET['id'] ?? null;
    $type = $_GET['type'] ?? null;

    if ($id && $type) {
        echo json_encode($id, $type);
        if ($type === 'student') {
            $stmt = $pdo->prepare("SELECT student_id, last_name, first_name, grade_level, access FROM students WHERE student_id = :student_id");
            $stmt->execute(['student_id' => $_GET['id']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                echo json_encode($user);
            } else {
                echo json_encode(['message' => 'User not found']);
            }
        } elseif ($type === 'teacher') {
            $stmt = $pdo->prepare("SELECT teacher_id, last_name, title, access, admin FROM teachers WHERE teacher_id = :teacher_id");
            $stmt->execute(['teacher_id' => $_GET['id']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                echo json_encode($user);
            } else {
                echo json_encode(['message' => 'User not found']);
            }
        }
    } else {
        // Retrieve all teachers if no specific ID is requested
        $stmt = $pdo->query(("SELECT student_id, last_name, first_name, grade_level, access FROM students"));
        $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $pdo->query(("SELECT teacher_id, last_name, title, admin, access FROM teachers"));
        $teachers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        //combines students and teachers into one object and keeps the key naming distinct
        $users = [
            'students' => $students,
            'teachers' => $teachers
        ];

        echo json_encode($users);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

ob_end_flush();
