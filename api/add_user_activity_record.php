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
$totalElapsedTime = $data['total_elapsed_time'] ?? '';
$timeToCorrectAnswerDurationInSeconds = $data['time_to_correct_answer_duration_in_seconds'] ?? '';
$answerAttempts = $data['answer_attempts'] ?? '';
$activityScore = $data['activity_score'] ?? '';
$timeStamp = date('Y-m-d H:i:s');

try {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare('INSERT INTO activity_stats (activity_id, user_id, user_type, correct_answer_count, incorrect_answer_count, total_elapsed_time, time_to_correct_answer_duration_in_seconds, answer_attempts, activity_score, date_time) VALUES (:activity_id, :user_id, :user_type, :correct_answer_count, :incorrect_answer_count, :total_elapsed_time, :time_to_correct_answer_duration_in_seconds, :answer_attempts, :activity_score, :date_time)');
    $stmt->execute(['activity_id' => $activityId, 'user_id' => $userId, 'user_type' => $userType, 'correct_answer_count' => $correctAnswerCount, 'incorrect_answer_count' => $incorrectAnswerCount, 'total_elapsed_time' => $totalElapsedTime, 'time_to_correct_answer_duration_in_seconds' => $timeToCorrectAnswerDurationInSeconds, 'answer_attempts' => $answerAttempts, 'activity_score' => $activityScore, 'date_time' => $timeStamp]);

    echo     json_encode(['message' => 'record added successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
