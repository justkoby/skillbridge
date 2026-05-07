<?php
require_once __DIR__ . '/../config/db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fullname = trim($_POST['fullname']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Simple validation
    if (empty($fullname) || empty($email) || empty($password) || empty($role)) {
        header("Location: ../signup.php?error=All fields are required.");
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: ../signup.php?error=Invalid email format.");
        exit();
    }

    // Check if user exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        header("Location: ../signup.php?error=Email already registered.");
        exit();
    }

    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert user
    try {
        $stmt = $pdo->prepare("INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)");
        $stmt->execute([$fullname, $email, $hashed_password, $role]);

        header("Location: ../index.php?success=Account created successfully! Please login.");
        exit();
    } catch (PDOException $e) {
        header("Location: ../signup.php?error=Database error: " . $e->getMessage());
        exit();
    }
} else {
    header("Location: ../signup.php");
    exit();
}
?>
