<?php
// Start the session
session_start();

// Set session variables
$_SESSION['username'] = 'JohnDoe';
$_SESSION['role'] = 'admin';

// Access session variables
echo "Username: " . $_SESSION['username'] . "<br>";
echo "Role: " . $_SESSION['role'];

// Destroy session example
// session_unset();
// session_destroy();
?>
