<?php
session_start();

require './db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit;
}



session_unset();
session_destroy();

echo json_encode(['loggedIn' => false]);
