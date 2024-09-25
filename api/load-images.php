<?php

ob_start();
require './db_connect.php';


try {
    $pdo = getDBConnection();

    header('Content-Type: application/json');


    $stmt = $pdo->query(('SELECT image_id, type, category, filename, filetype, link FROM images'));
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['images' => $images]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

ob_end_flush();
