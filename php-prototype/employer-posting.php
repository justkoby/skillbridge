<?php
$page_title = "Post a Job";
$current_page = "employer";
include 'includes/header.php';

// Auth Check
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php?error=Please login to access this page.");
    exit();
}
?>

  <main class="main">
    <div class="container layout">

      <aside class="sidebar">
        <p class="side-title">Employer</p>
        <nav class="side-menu" aria-label="Sidebar">
          <a class="active" href="#post">Post Job</a>
          <a href="#manage">Manage Jobs</a>
          <a href="#candidates">Candidate Matches</a>
          <a href="dashboard.php">Back to Dashboard</a>
        </nav>
      </aside>

      <section class="content">
        <section id="post" class="card">
          <h2>Create Job Vacancy</h2>
          <p class="sub">Enter job details. SkillBridge will extract required skills and match candidates.</p>

          <form class="form" action="#" method="post">
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="field">
                <label for="company">Company Name</label>
                <input id="company" name="company" type="text" placeholder="e.g., ABC Ghana Ltd" required />
              </div>
              <div class="field">
                <label for="location">Location</label>
                <input id="location" name="location" type="text" placeholder="e.g., Accra" required />
              </div>
              <div class="field">
                <label for="title">Job Title</label>
                <input id="title" name="title" type="text" placeholder="e.g., Customer Support Officer" required />
              </div>
              <div class="field">
                <label for="type">Employment Type</label>
                <select id="type" name="type" required>
                  <option value="">Select…</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>
            </div>

            <div class="field">
              <label for="desc">Job Description</label>
              <textarea id="desc" name="description" placeholder="Describe responsibilities and required skills..."></textarea>
            </div>

            <div class="flex" style="justify-content:flex-end; flex-wrap:wrap;">
              <button class="btn" type="button">Preview</button>
              <button class="btn primary" type="submit">Post Vacancy</button>
            </div>
          </form>
        </section>
      </section>
    </div>
  </main>

<?php include 'includes/footer.php'; ?>
