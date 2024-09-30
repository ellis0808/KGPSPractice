<?php

require './db_connect.php';



try {
    $pdo = getDBConnection();

    header('Content-Type: application/json');

    $category = $_GET['id1'] ?? null;
    $grouping = $_GET['id2'] ?? null;
    if ($category && $grouping) {
        $stmt = $pdo->prepare('SELECT content, link FROM `audio_directory` where category =:category AND `grouping` = :grouping');
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
