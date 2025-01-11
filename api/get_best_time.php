<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';

header('Content-Type: application/json');

try {
    $pdo = getDBConnection();
    if (isset($_GET['id'])) {

        $stmt = $pdo->prepare('SELECT MIN(total_elapsed_time) AS best_time FROM activity_stats WHERE user_id = :user_id');
        $stmt->execute(['user_id' => $_GET['id']]);
        $bestTime = $stmt->fetch(PDO::FETCH_ASSOC)['best_time'];
        if ($bestTime !== null) {
            echo json_encode(['best_time' => $bestTime]);
        } else {
            echo json_encode(['message' => 'User not found']);
        }
    } else {
        echo json_encode(['error' => 'User ID not provided']);
        exit;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
