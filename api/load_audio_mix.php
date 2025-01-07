<?php

require './db_connect.php';



try {
    $pdo = getDBConnection();

    header('Content-Type: application/json');

    $category = $_GET['id1'] ?? null;
    $grouping1 = $_GET['id2'] ?? null;
    $grouping2 = $_GET['id3'] ?? null;
    $grouping3 = $_GET['id4'] ?? null;
    $grouping4 = $_GET['id5'] ?? null;
    $grouping5 = $_GET['id6'] ?? null;
    if ($category && $grouping1 && $grouping2) {
        if ($grouping5) {
            $stmt = $pdo->prepare('SELECT content, link
         FROM `audio`
         WHERE category = :category
         AND (
            `grouping` in (:grouping1, :grouping2, :grouping3, :grouping4, :grouping5)
                )
            ');
            $stmt->execute([
                'category' => $category,
                'grouping1' => $grouping1,
                'grouping2' => $grouping2,
                'grouping3' => $grouping3,
                'grouping4' => $grouping4,
                'grouping5' => $grouping5,
            ]);
        } elseif (!$grouping5 && $grouping4) {
            $stmt = $pdo->prepare('SELECT content, link
         FROM `audio`
         WHERE category = :category
         AND (
            `grouping` in (:grouping1, :grouping2, :grouping3, :grouping4)
                )
            ');
            $stmt->execute([
                'category' => $category,
                'grouping1' => $grouping1,
                'grouping2' => $grouping2,
                'grouping3' => $grouping3,
                'grouping4' => $grouping4,
            ]);
        } elseif (!$grouping4 && $grouping3) {
            $stmt = $pdo->prepare('SELECT content, link
         FROM `audio`
         WHERE category = :category
         AND (
            `grouping` in (:grouping1, :grouping2, :grouping3)
                )
            ');
            $stmt->execute([
                'category' => $category,
                'grouping1' => $grouping1,
                'grouping2' => $grouping2,
                'grouping3' => $grouping3,
            ]);
        } elseif (!$grouping3 && $grouping2) {
            $stmt = $pdo->prepare('SELECT content, link
         FROM `audio`
         WHERE category = :category
         AND (
            `grouping` in (:grouping1, :grouping2)
                )
            ');
            $stmt->execute([
                'category' => $category,
                'grouping1' => $grouping1,
                'grouping2' => $grouping2
            ]);
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
    echo json_encode(['error' => $e->getMessage()]);
}
