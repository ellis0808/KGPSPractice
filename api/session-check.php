<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// require './db_connect.php';
// require './headers.php';


header('Content-Type: application/json');


if (isset($_SESSION['loggedIn'])) {
    if ($_SESSION['access'] === 'student') {
        echo json_encode([
            'loggedIn' => true,
            'userId' => $_SESSION['userId'],
            'firstName' => $_SESSION['firstName'],
            'lastName' => $_SESSION['lastName'],
            'access' => $_SESSION['access'],
            'gradeLevel' => $_SESSION['gradeLevel']
        ]);
    } elseif ($_SESSION['access'] === 'teacher') {
        echo json_encode([
            'loggedIn' => true,
            'userId' => $_SESSION['userId'],
            'title' => $_SESSION['title'],
            'lastName' => $_SESSION['lastName'],
            'access' => $_SESSION['access'],
            'admin' => $_SESSION['admin']
        ]);
    }
} else {
    echo json_encode(['loggedIn' => false]);
}
