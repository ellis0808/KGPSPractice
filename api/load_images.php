<?php

ob_start();
require './db_connect.php';



try {
    $pdo = getDBConnection();

    header('Content-Type: application/json');

    $unit = $_GET['id1'] ?? null;
    $grouping1 = $_GET['id2'] ?? null;
    $grouping2 = $_GET['id3'] ?? null;

    if ($catgegory && $grouping1) {
        if ($grouping2) {
            $stmt = $pdo->prepare('SELECT image_id, type, category, filename, link, content, alt_text
            FROM images_directory
            WHERE unit = :unit
            AND (`grouping` BETWEEN :grouping1 AND :grouping2)');
            $stmt->execute([
                'unit' => $unit,
                'grouping1' => $grouping1,
                'grouping2' => $grouping2
            ]);
        } else {
            $stmt = $pdo->prepare('SELECT image_id, type, category, filename, link, content, alt_text
            FROM images_directory
            WHERE unit = :unit
            AND `grouping` = :grouping1');
            $stmt->execute([
                'unit' => $unit,
                'grouping1' => $grouping1
            ]);
        }
    }
    // else {
    // Get all images with the indicated filename
    // if (isset($_GET['id'])) {
    //     $stmt = $pdo->prepare('SELECT image_id, type, category, filename, filetype, link, content, alt_text FROM images WHERE filename LIKE :item');
    //     $stmt->execute(['item' => $_GET['id'] . '%']);
    //     $image = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //     if ($image) {
    //         echo json_encode($image);
    //     } else {
    //         echo json_encode(['message' => 'No images match the search criteria']);
    //     }
    // } else {

    //     // Get all available images
    //     $stmt = $pdo->query(('SELECT image_id, type, category, filename, filetype, link, content, alt_text FROM images'));
    // }
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($images) {

        echo json_encode($images);
    } else {
        echo json_encode(['message' => 'No images match the search criteira']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

ob_end_flush();
