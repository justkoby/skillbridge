<?php
$page_title = "Login";
$current_page = "login";
include 'includes/header.php';

// Redirect if already logged in
if (isset($_SESSION['user_id'])) {
    header("Location: dashboard.php");
    exit();
}
?>

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <div class="hero-card">
        <h1>AI-Driven Skill–Job Matching & Upskilling for Youth Employability</h1>
        <p>
          Upload your CV, get a transparent skill-fit score, and receive short learning recommendations
          to close the most relevant gaps.
        </p>
        <div class="hero-actions">
          <a class="btn primary" href="#login">Login</a>
          <a class="btn" href="signup.php">Create Account</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Main -->
  <main class="main">
    <div class="container grid" style="grid-template-columns: 1fr 1fr; gap: 18px;">
      
      <!-- Login Card -->
      <section id="login" class="card">
        <h2>Login</h2>
        <p class="sub">Access your dashboard to view matches and recommendations.</p>

        <?php if (isset($_GET['error'])): ?>
          <div class="alert danger" style="margin-bottom: 15px;">
            <?php echo htmlspecialchars($_GET['error']); ?>
          </div>
        <?php endif; ?>

        <?php if (isset($_GET['success'])): ?>
          <div class="alert success" style="margin-bottom: 15px;">
            <?php echo htmlspecialchars($_GET['success']); ?>
          </div>
        <?php endif; ?>

        <form class="form" action="auth/login.php" method="post">
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div class="field">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>

          <button class="btn primary" type="submit">Login</button>
          <p class="helper">Forgot password? Contact admin.</p>
        </form>
      </section>

      <!-- Welcome Back Info Card -->
      <section class="card" style="display: flex; flex-direction: column; justify-content: center; background: rgba(79, 124, 255, 0.05);">
        <h2>Empowering Ghana's Youth</h2>
        <p>SkillBridge uses advanced AI to bridge the gap between education and employment. Join thousands of students and employers today.</p>
        <ul style="margin-top: 15px; display: grid; gap: 10px;">
          <li class="badge success">✓ AI Skill Extraction</li>
          <li class="badge success">✓ Personalized Learning</li>
          <li class="badge success">✓ Direct Employer Access</li>
        </ul>
      </section>

    </div>
  </main>

<?php include 'includes/footer.php'; ?>
