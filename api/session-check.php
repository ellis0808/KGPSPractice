<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require './db_connect.php';
// require './headers.php';


header('Content-Type: application/json');


if (isset($_SESSION['loggedIn'])) {
    echo json_encode([
        'loggedIn' => true,
        'user_id' => $_SESSION['user_id'],
        'firstname' => $_SESSION['firstname'],
        'lastname' => $_SESSION['lastname'],
        'access' => $_SESSION['access']
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}
