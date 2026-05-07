<?php
require_once __DIR__ . '/../config/db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        header("Location: ../index.php?error=Please fill in all fields.");
        exit();
    }

    $stmt = $pdo->prepare("SELECT id, fullname, password, role FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Success
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['fullname'];
        $_SESSION['user_role'] = $user['role'];

        header("Location: ../dashboard.php");
        exit();
    } else {
        header("Location: ../index.php?error=Invalid email or password.");
        exit();
    }
} else {
    header("Location: ../index.php");
    exit();
}
?>
