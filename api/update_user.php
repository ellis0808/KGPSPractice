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

error_log(print_r($data, true));

$id = $data['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'User ID is required']);
    exit;
}

try {
    $pdo = getDBConnection();


    $sql = "UPDATE students SET ";
    $fields = [];
    $params = [];

    // Only update fields that are given new values
    if (isset($data['lastname']) && $data['lastname'] !== "") {
        $fields[] = "lastname = :lastname";
        $params['lastname'] = $data['lastname'];
    }
    if (isset($data['firstname']) && $data['firstname'] !== "") {
        $fields[] = "firstname = :firstname";
        $params['firstname'] = $data['firstname'];
    }
    if (isset($data['gradelevel']) && $data['gradelevel'] !== "") {
        $fields[] = "gradelevel = :gradelevel";
        $params['gradelevel'] = $data['gradelevel'];
    }
    if (isset($data['access']) && $data['access'] !== "") {
        $fields[] = "access = :access";
        $params['access'] = $data['access'];
    }
    if (isset($data['password']) && $data['password'] !== "") {
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        $fields[] = "password = :password";
        $params['password'] = $hashedPassword;
    }
    // $sql = rtrim($sql, ', ');

    if (!empty($fields)) {
        $sql .= implode(", ", $fields);
        $sql .= " WHERE id = :id";
        $params['id'] = $id;


        // Prepare and execute the statement
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        if ($stmt->rowCount()) {
            echo json_encode(['message' => 'User updated successfully']);
        } else {
            echo json_encode(['message' => 'No changes made or user not found1']);
        }
    } else {
        echo json_encode(['message' => 'No changes made or user not found2']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
