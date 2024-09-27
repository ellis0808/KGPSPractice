<?php

ob_start();
require './db_connect.php';



try {
    $pdo = getDBConnection();

    header('Content-Type: application/json');
    // Get all images with the indicated filename
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare('SELECT image_id, type, category, filename, filetype, link FROM images WHERE filename LIKE :item');
        $stmt->execute(['item' => '%' . $_GET['id']]);
        $image = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($image) {
            echo json_encode($image);
        } else {
            echo json_encode(['message' => 'No images match the search criteria']);
        }
    } else {

        // Get all available images
        $stmt = $pdo->query(('SELECT image_id, type, category, filename, filetype, link FROM images'));
        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['images' => $images]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

ob_end_flush();
