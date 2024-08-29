<?php

require 'C:\Users\Logan\Desktop\Coding Practice\KGPS Practice\resources\backend\db_connect.php';

header('Content-Type: application/json');

// Allow requests from any origin
header("Access-Control-Allow-Origin: http://myapp.local");
// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}


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
