<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';


// Get the input data from the request
$data = json_decode(file_get_contents('php://input'), true);

error_log(print_r($data, true));

$id = $data['student_id'] ?? null;

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
    if (isset($data['last_name']) && $data['last_name'] !== "") {
        $fields[] = "last_name = :last_name";
        $params['last_name'] = $data['last_name'];
    }
    if (isset($data['first_name']) && $data['first_name'] !== "") {
        $fields[] = "first_name = :first_name";
        $params['first_name'] = $data['first_name'];
    }
    if (isset($data['grade_level']) && $data['grade_level'] !== "") {
        $fields[] = "grade_level = :grade_level";
        $params['grade_level'] = $data['grade_level'];
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
        $sql .= " WHERE student_id = :student_id";
        $params['student_id'] = $id;


        // Prepare and execute the statement
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        if ($stmt->rowCount()) {
            echo json_encode(['message' => 'User updated successfully']);
        } else {
            echo json_encode(['message' => 'No changes made or user not found']);
        }
    } else {
        echo json_encode(['message' => 'No changes made or user not found2']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
