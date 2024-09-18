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
        'userId' => $_SESSION['userId'],
        'firstName' => $_SESSION['firstName'],
        'lastName' => $_SESSION['lastName'],
        'access' => $_SESSION['access'],
        'gradeLevel' => $_SESSION['gradeLevel']
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}
