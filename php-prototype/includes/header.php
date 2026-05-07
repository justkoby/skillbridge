<?php
session_start();
$is_logged_in = isset($_SESSION['user_id']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SkillBridge | <?php echo $page_title ?? 'AI-Driven Upskilling'; ?></title>
  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>

  <!-- Top Nav -->
  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="index.php">
        <span class="logo" aria-hidden="true"></span>
        <span>SkillBridge</span>
      </a>

      <nav class="nav-links" aria-label="Primary">
        <?php if (!$is_logged_in): ?>
          <a href="index.php" class="<?php echo ($current_page == 'login') ? 'active' : ''; ?>">Login</a>
          <a href="signup.php" class="<?php echo ($current_page == 'signup') ? 'active' : ''; ?>">Sign Up</a>
        <?php else: ?>
          <a href="dashboard.php" class="<?php echo ($current_page == 'dashboard') ? 'active' : ''; ?>">Dashboard</a>
          <a href="jobseeker-profile.php" class="<?php echo ($current_page == 'profile') ? 'active' : ''; ?>">Job Seeker</a>
          <a href="employer-posting.php" class="<?php echo ($current_page == 'employer') ? 'active' : ''; ?>">Employer</a>
        <?php endif; ?>
      </nav>

      <div class="nav-actions">
        <?php if ($is_logged_in): ?>
          <a class="btn ghost" href="auth/logout.php">Logout</a>
        <?php endif; ?>
        <button class="burger" type="button" aria-label="Open menu">☰</button>
      </div>
    </div>
  </header>
