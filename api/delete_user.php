<?php

session_start();

require './db_connect.php';
// require './headers.php';


// Get the input data from the request
$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

try {
    $pdo = getDBConnection();

    // Prepare the SQL query to delete the user
    $sql = "DELETE FROM students WHERE id = :id";
    $stmt = $pdo->prepare($sql);

    // Bind parameters and execute the query
    $stmt->execute(['id' => $id]);

    if ($stmt->rowCount()) {
        echo json_encode(['message' => 'User deleted successfully']);
    } else {
        echo json_encode(['message' => 'User not found']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
