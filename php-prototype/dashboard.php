<?php
$page_title = "Dashboard";
$current_page = "dashboard";
include 'includes/header.php';

// Auth Check
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php?error=Please login to access the dashboard.");
    exit();
}

$user_name = $_SESSION['user_name'];
?>

  <main class="main">
    <div class="container layout">

      <!-- Sidebar -->
      <aside class="sidebar">
        <p class="side-title">Quick Menu</p>
        <nav class="side-menu" aria-label="Sidebar">
          <a class="active" href="dashboard.php">Overview <span class="badge">Home</span></a>
          <a href="jobseeker-profile.php">My Profile <span class="badge">CV</span></a>
          <a href="#jobs">Job Matches <span class="badge success">New</span></a>
          <a href="#learning">Upskilling <span class="badge">Learn</span></a>
          <a href="#settings">Settings <span class="badge">⚙</span></a>
        </nav>
      </aside>

      <!-- Content -->
      <section class="content">

        <!-- Welcome Stats -->
        <section class="card">
          <h2>Welcome back, <?php echo htmlspecialchars($user_name); ?>!</h2>
          <p class="sub">Summary of your matching activity and learning recommendations.</p>

          <div class="stats">
            <div class="stat">
              <div class="label">CV Status</div>
              <div class="value">Uploaded</div>
              <div class="muted">Last updated: Feb 18, 2026</div>
            </div>
            <div class="stat">
              <div class="label">Skills Detected</div>
              <div class="value">18</div>
              <div class="muted">Normalized skills list</div>
            </div>
            <div class="stat">
              <div class="label">Job Matches</div>
              <div class="value">6</div>
              <div class="muted">Top recommended roles</div>
            </div>
            <div class="stat">
              <div class="label">Skill Gaps</div>
              <div class="value">4</div>
              <div class="muted">High-impact gaps</div>
            </div>
          </div>
        </section>

        <!-- Skills -->
        <section class="card">
          <h2>My Extracted Skills</h2>
          <p class="sub">These were extracted from your CV/profile. You can edit and confirm.</p>
          <div class="chips">
            <span class="chip">MS Excel</span>
            <span class="chip">Customer Service</span>
            <span class="chip">Data Entry</span>
            <span class="chip">Communication</span>
            <span class="chip">Teamwork</span>
            <span class="chip">Google Workspace</span>
            <span class="chip">Problem Solving</span>
          </div>
          <hr />
          <div class="flex" style="justify-content:flex-end;">
            <a class="btn primary" href="jobseeker-profile.php">Edit Skills/Profile</a>
          </div>
        </section>

        <!-- Job Matches Table -->
        <section id="jobs" class="card">
          <h2>Top Job Recommendations</h2>
          <p class="sub">Ranked by skill-fit score based on your profile.</p>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Fit Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Administrative Assistant</td>
                  <td>Accra Services Ltd</td>
                  <td>Accra</td>
                  <td><span class="score high">82%</span></td>
                  <td><a class="btn" href="#learning">View Gaps</a></td>
                </tr>
                <tr>
                  <td>Customer Support Officer</td>
                  <td>HelpDesk GH</td>
                  <td>Kumasi</td>
                  <td><span class="score mid">67%</span></td>
                  <td><a class="btn" href="#learning">View Gaps</a></td>
                </tr>
                <tr>
                  <td>Data Entry Clerk</td>
                  <td>RetailPro</td>
                  <td>Tema</td>
                  <td><span class="score mid">61%</span></td>
                  <td><a class="btn" href="#learning">View Gaps</a></td>
                </tr>
                <tr>
                  <td>IT Support Intern</td>
                  <td>TechNova</td>
                  <td>Accra</td>
                  <td><span class="score low">44%</span></td>
                  <td><a class="btn" href="#learning">View Gaps</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </section>
    </div>
  </main>

<?php include 'includes/footer.php'; ?>
