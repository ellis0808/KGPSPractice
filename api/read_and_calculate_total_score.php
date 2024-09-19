<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';

header('Content-Type: application/json');

try {
    $pdo = getDBConnection();
    if (isset($_GET['id'])) {

        $stmt = $pdo->prepare('SELECT SUM(activity_score) FROM activity_stats WHERE user_id = :user_id');
        $stmt->execute(['id' => $_GET['id']]);
        $userTotalScore = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($userTotalScore) {
            echo json_encode($userTotalScore);
        } else {
            echo json_encode(['message' => 'User not found']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
