<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);


try {
    $pdo = getDBConnection();

    $params = [];
    $sql = "UPDATE activity_stats SET";
    if (isset($data['activity_id']) && $data['activity_id'] !== '') {
        $params['activity_id'] = $data['activity_id'];
    }
    if (isset($data['user_id']) && $data['user_id'] !== '') {
        $params['user_id'] = $data['user_id'];
    }
    if (isset($data['user_type']) && $data['user_type'] !== '') {
        $params['user_type'] = $data['user_type'];
    }
    if (isset($data['correct_answer_count']) && $data['correct_answer_count'] !== '') {
        $params['correct_answer_count'] = $data['correct_answer_count'];
    }
    if (isset($data['incorrect_answer_count']) && $data['incorrect_answer_count'] !== '') {
        $params['incorrect_answer_count'] = $data['incorrect_answer_count'];
    }
    if (isset($data['time_to_correct_answer_duration_in_seconds']) && $data['time_to_correct_answer_duration_in_seconds'] !== '') {
        $params['time_to_correct_answer_duration_in_seconds'] = $data['time_to_correct_answer_duration_in_seconds'];
    }
    if (isset($data['answer_attempts']) && $data['answer_attempts'] !== '') {
        $params['answer_attempts'] = $data['answer_attempts'];
    }
    if (isset($data['activity_score']) && $data['activity_score'] !== '') {
        $params['activity_score'] = $data['activity_score'];
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
