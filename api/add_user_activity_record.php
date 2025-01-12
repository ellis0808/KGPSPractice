<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$dateTime = date('Y-m-d H:i:s');
$userId = $data['user_id'];
$userType = $data['user_type'];
$activityType = $data['activity_type'];
$activityName = $data['activity_name'];
$score = $data['score'];
$totalElapsedTime = $data['time_duration_in_seconds'] ?? null;
$questionCount = $data['question_count'] ?? null;
$correctAnswerCount = $data['correct_answer_count'] ?? null;
$incorrectAnswerCount = $data['incorrect_answer_count'] ?? null;
$answerAttempts = $data['answer_attempts'] ?? null;
$questionsShort = $data['questions_short'] ?? null;
$questionsMedium = $data['questions_medium'] ?? null;
$questionsLong = $data['questions_long'] ?? null;
$correctAnswersShort = $data['correct_answers_short'] ?? null;
$correctAnswersMedium = $data['correct_answers_medium'] ?? null;
$correctAnswersLong = $data['correct_answers_long'] ?? null;
$incorrectAnswersShort = $data['incorrect_answers_short'] ?? null;
$incorrectAnswersMedium = $data['incorrect_answers_medium'] ?? null;
$incorrectAnswersLong = $data['incorrect_answers_long'] ?? null;


try {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare('INSERT INTO activity_stats (date_time, user_id, user_type, activity_type, activity_name, score, time_duration_in_seconds, question_count, correct_answer_count, incorrect_answer_count, questions_short, questions_medium, questions_long, correct_answers_short, correct_answers_medium, correct_answers_long, incorrect_answers_short, incorrect_answers_medium, incorrect_answers_long) VALUES (:date_time, :user_id, :user_type, :activity_type, :activity_name, :score, :time_duration_in_seconds, :question_count, :correct_answer_count, :incorrect_answer_count, :questions_short, :questions_medium, :questions_long, :correct_answers_short, :correct_answers_medium, :correct_answers_long, :incorrect_answers_short, :incorrect_answers_medium, :incorrect_answers_long)');
    $stmt->execute(['date_time' => $dateTime, 'user_id' => $userId, 'user_type' => $userType, 'activity_type' => $activityType, 'activity_name' => $activityName, 'score' => $score, 'time_duration_in_seconds' => $totalElapsedTime, 'question_count' => $questionCount, 'correct_answer_count' => $correctAnswerCount, 'incorrect_answer_count' => $incorrectAnswerCount, 'questions_short' => $questionsShort, 'questions_medium' => $questionsMedium, 'questions_long' => $questionsLong, 'correct_answers_short' => $correctAnswersShort, 'correct_answers_medium' => $correctAnswersMedium, 'correct_answers_long' => $correctAnswersLong, 'incorrect_answers_short' => $incorrectAnswersShort, 'incorrect_answers_medium' => $incorrectAnswersMedium, 'incorrect_answers_long' => $incorrectAnswersLong]);



    echo     json_encode(['message' => 'record added successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Unexpected error: ' . $e->getMessage()]);
}
