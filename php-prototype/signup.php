<?php
$page_title = "Sign Up";
$current_page = "signup";
include 'includes/header.php';

// Redirect if already logged in
if (isset($_SESSION['user_id'])) {
    header("Location: dashboard.php");
    exit();
}
?>

  <main class="main" style="padding-top: 50px;">
    <div class="container" style="max-width: 600px;">
      
      <!-- Register Card -->
      <section id="register" class="card">
        <h2>Create Account</h2>
        <p class="sub">Choose your role and start using SkillBridge.</p>

        <?php if (isset($_GET['error'])): ?>
          <div class="alert danger" style="margin-bottom: 15px;">
            <?php echo htmlspecialchars($_GET['error']); ?>
          </div>
        <?php endif; ?>

        <form class="form" action="auth/register.php" method="post">
          <div class="field">
            <label for="fullname">Full Name</label>
            <input id="fullname" name="fullname" type="text" placeholder="Your full name" required />
          </div>

          <div class="field">
            <label for="regEmail">Email</label>
            <input id="regEmail" name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div class="field">
            <label for="role">Role</label>
            <select id="role" name="role" required>
              <option value="">Select role…</option>
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          <div class="field">
            <label for="regPassword">Password</label>
            <input id="regPassword" name="password" type="password" placeholder="Create a password" required />
          </div>

          <button class="btn primary" type="submit">Create Account</button>
          <p class="helper">By creating an account, you agree to the platform rules and data protection terms.</p>
          <p class="helper" style="text-align: center; margin-top: 10px;">
            Already have an account? <a href="index.php" style="color: var(--brand); font-weight: bold;">Login here</a>
          </p>
        </form>
      </section>

    </div>
  </main>

<?php include 'includes/footer.php'; ?>
