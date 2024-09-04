<?php
session_start();

require 'db_connect.php';

// Debug: Log the session data to ensure it's being accessed correctly
error_log("Session Check: " . print_r($_SESSION, true));


header('Content-Type: application/json');

// Allow requests from any origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

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
