<?php

require './db_connect.php';



try {
    $pdo = getDBConnection();

    header('Content-Type: application/json');

    $category = $_GET['category'] ?? null;
    $grouping = $_GET['grouping'] ?? null;
    if ($category && $grouping) {
        $stmt = $pdo->prepare('SELECT link FROM `audio_category` where category =:category AND `grouping` = :`grouping`');
        $stmt->execute(['category' => $category, 'grouping' => $grouping]);
        $audio = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($audio) {
            echo json_encode($audio);
        } else {
            echo json_encode(['message' => 'No audio match the search criteria']);
        }
    } else {
        echo json_encode(['Message' => 'Missing parameters']);
    }
} catch (PDOException $e) {
    echo
    json_encode(['error' => $e->getMessage()]);
}
