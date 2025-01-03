<?php
require 'orchidpony8.sakura.ne.jp/db_connect.php';

try {
    $pdo = getDBConnection();
    echo "Connection successful!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
