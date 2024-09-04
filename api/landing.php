<?php

header('Content-Type: application/json');

// Allow requests from any origin
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

session_start();
