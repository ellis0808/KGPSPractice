<?php

require './headers.php';

// Redirect to login if the user is not logged in
// if (!isset($_SESSION['user_id']) && basename($_SERVER['PHP_SELF']) != 'login.php') {
//     header('Location: ../resources/login/login.html');
//     exit();
// }






function getDBConnection()
{
    $host = 'mysql57.orchidpony8.sakura.ne.jp';
    $db = 'orchidpony8_kgps_eng_pr';
    $user = 'orchidpony8';
    $pass = 'he1-maha_ptic74';
    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    $options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false,];

    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        throw new PDOException($e->getMessage(), (int)$e->getCode());
    }
}
