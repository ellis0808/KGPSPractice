<?php

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");



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
