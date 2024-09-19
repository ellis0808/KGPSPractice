<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';

header('Content-Type: application/json');

try {
    $pdo = getDBConnection();
    if (isset($_GET['id'])) {

        $stmt = $pdo->prepare('SELECT SUM(activity_score) AS total_score FROM activity_stats WHERE user_id = :user_id');
        $stmt->execute(['user_id' => $_GET['id']]);
        $userTotalScore = $stmt->fetch(PDO::FETCH_ASSOC)['total_score'];
        if ($userTotalScore) {
            echo json_encode($userTotalScore);
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
