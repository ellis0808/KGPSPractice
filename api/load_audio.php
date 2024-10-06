<?php

require './db_connect.php';



try {
    $pdo = getDBConnection();

    header('Content-Type: application/json');

    $category = $_GET['id1'] ?? null;
    $grouping1 = $_GET['id2'] ?? null;
    $grouping2 = $_GET['id3'] ?? null;
    if ($category && $grouping1) {
        if ($grouping2) {
            $stmt = $pdo->prepare('SELECT content, link
         FROM `audio_directory`
         WHERE category = :category
         AND  (`grouping` >= :grouping1 AND `grouping` <= :grouping2)');
            $stmt->execute(['category' => $category, 'grouping1' => $grouping1, 'grouping2' => $grouping2]);
        } else {
            $stmt = $pdo->prepare('SELECT content, link
            FROM `audio_directory`
            WHERE category = :category
            AND  `grouping` = :grouping1');
            $stmt->execute(['category' => $category, 'grouping1' => $grouping1]);
        }
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
