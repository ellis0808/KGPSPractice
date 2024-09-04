<?php
session_start();

// Check if user is logged in

if (!isset($_SESSION['id'])) {
    header("location: login.php");
    exit;
}

// Determine which route to take based on user access
if ($_SESSION['access'] === 'Student') {
    header("Location: index.html");
    exit;
} elseif ($_SESSION['access'] === 'Teacher') {
    header("Location: user_management.html");
    exit;
} else {
    echo 'Unauthorized access';
    exit;
}
