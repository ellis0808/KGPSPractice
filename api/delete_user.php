<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
};

require './db_connect.php';


// Get the input data from the request
$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? null;
$type = $data['type'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}
try {
    $pdo = getDBConnection();

    if ($type === 'student') {
        // Prepare the SQL query to delete the user
        $sql = "DELETE FROM students WHERE student_id = :student_id";
        $stmt = $pdo->prepare($sql);

        // Bind parameters and execute the query
        $stmt->execute(['student_id' => $id]);
        if ($stmt->rowCount()) {
            echo json_encode(['message' => 'User deleted successfully']);
        } else {
            echo json_encode(['message' => 'User not found']);
        }
    } elseif ($type === 'teacher') {
        $sql = "DELETE FROM teachers WHERE teacher_id = :teacher_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['teacher_id' => $id]);
        if ($stmt->rowCount()) {
            echo json_encode(['message' => 'User deleted successfully']);
        } else {
            echo json_encode(['message' => 'User not found']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
