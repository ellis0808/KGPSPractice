<?php
session_start();

require './db_connect.php';
// require './headers.php';


header('Content-Type: application/json');


if (isset($_SESSION['loggedIn'])) {
    echo json_encode([
        'user_id' => $_SESSION['user_id'],
        'firstname' => $_SESSION['firstname'],
        'lastname' => $_SESSION['lastname'],
        'access' => $_SESSION['access']
    ]);

    echo 'Session ID: ' . session_id();
    echo 'Session data: ' . print_r($_SESSION, true);
    echo json_encode(['message' => 'not logged in']);
} else {
    echo json_encode(['loggedIn' => false]);
}
