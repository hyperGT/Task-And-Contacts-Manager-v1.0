<?php

$server = "localhost";
$username = "root";
$pass = "";
$db_name = "tasksContactsMngr";

$conn = new mysqli($server, $username, $pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}