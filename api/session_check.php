<?php

header('Content-Type: application/json');

// $env = getenv('APP_ENV') ?: 'production';
// switch ($env) {
//     case 'dev':
//         ini_set('session.save_path', '/KGPSEnglishPractice-dev/sessions');
//         break;
//     case 'preview':
//         ini_set('session.save_path', '/KGPSEnglishPractice-preview/sessions');
//         break;
//     case 'production':
//         ini_set('session.save_path', '/KGPSEnglishPractice/sessions');
//         break;
//     default:
//         error_log('Unknown environment: $env');
//         exit('Environment configuration error.');
// }
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

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
