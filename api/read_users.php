<?php

require 'C:\Users\Logan\Desktop\Coding Practice\KGPS Practice\resources\backend\db_connect.php';

header('Content-Type: application/json');

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}


try {
    $pdo = getDBConnection();

    // Check if a specific user ID was requested
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT id, lastname, firstname, gradelevel, access, password FROM students WHERE id = :id");
        $stmt->execute(['id' => $_GET['id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode($user);
        } else {
            echo json_encode(['message' => 'User not found']);
        }
    } else {
        // Retrieve all students if no specific ID is requested
        $stmt = $pdo->query(("SELECT id, lastname, firstname, gradelevel, access, password FROM students"));
        $students = $stmt->fetchAll(pdo::FETCH_ASSOC);

        echo json_encode(['students' => $students]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
