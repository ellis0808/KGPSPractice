<?php

session_start();

if (!isset($_SESSION['user_id'])) {
    // Redirect to login page
    header('Location: /resources/login/login.html');
    exit();
}
