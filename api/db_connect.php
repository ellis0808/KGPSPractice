<?php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}




function getDBConnection()
{
    $config = require 'config.php';
    $host = $config['DB_HOST'];
    $db = $config['DB_NAME'];
    $user = $config['DB_USER'];
    $pass = $config['DB_PASSWORD'];
    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    $options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false,];

    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        throw new PDOException($e->getMessage(), (int)$e->getCode());
    }
}
