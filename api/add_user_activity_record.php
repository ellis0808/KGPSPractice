<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$activityId = $data['activity_id'] ?? '';
$userId = $data['user_id'] ?? '';
$userType = $data['user_type'] ?? '';
$correctAnswerCount = $data['correct_answer_count'] ?? '';
$incorrectAnswerCount = $data['incorrect_answer_count'] ?? '';
$timeToCorrectAnswerDurationInSeconds = $data['time_to_correct_answer_duration_in_seconds'] ?? '';
$answerAttempts = $data['answer_attempts'] ?? '';
$activityScore = $data['activity_score'] ?? '';

try {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare('INSERT INTO activity_stats (activity_id, user_id, user_type, correct_answer_count, incorrect_answer_count, time_to_correct_answer_duration_in_seconds, answer_attempts, activity_score) VALUES (:activity_id, :user_id, :user_type, :correct_answer_count, :incorrect_answer_count, :time_to_correct_answer_duration_in_seconds, :answer_attempts, :activity_score)');
    $stmt->execute(['activity_id' => $activityId, 'user_id' => $userId, 'user_type' => $userType, 'correct_answer_count' => $correctAnswerCount, 'incorrect_answer_count' => $incorrectAnswerCount, 'time_to_correct_answer_duration_in_seconds' => $timeToCorrectAnswerDurationInSeconds, 'answer_attempts' => $answerAttempts, 'activity_score' => $activityScore]);

    echo     json_encode(['message' => 'record added successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
