<?php
$page_title = "Job Seeker Profile";
$current_page = "profile";
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
        <p class="side-title">Job Seeker</p>
        <nav class="side-menu" aria-label="Sidebar">
          <a class="active" href="#profile">Profile</a>
          <a href="#cv">CV Upload</a>
          <a href="#skills">Skills</a>
          <a href="dashboard.php">Back to Dashboard</a>
        </nav>
      </aside>

      <section class="content">
        <section id="profile" class="card">
          <h2>My Profile</h2>
          <p class="sub">Update your information so SkillBridge can match you more accurately.</p>

          <form class="form" action="#" method="post">
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="field">
                <label for="jsName">Full Name</label>
                <input id="jsName" name="name" type="text" value="<?php echo htmlspecialchars($_SESSION['user_name']); ?>" required />
              </div>
              <div class="field">
                <label for="jsPhone">Phone</label>
                <input id="jsPhone" name="phone" type="text" placeholder="+233..." />
              </div>
              <div class="field">
                <label for="jsLocation">Location</label>
                <input id="jsLocation" name="location" type="text" placeholder="e.g., Accra" />
              </div>
              <div class="field">
                <label for="jsEducation">Education Level</label>
                <select id="jsEducation" name="education">
                  <option value="">Select…</option>
                  <option>SHS</option>
                  <option>Diploma</option>
                  <option>Bachelor</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div class="field">
              <label for="jsBio">Short Summary</label>
              <textarea id="jsBio" name="bio" placeholder="Briefly describe your experience and interests..."></textarea>
            </div>

            <button class="btn primary" type="submit">Save Profile</button>
          </form>
        </section>

        <section id="cv" class="card">
          <h2>Upload CV</h2>
          <p class="sub">Upload your CV to extract skills automatically (PDF recommended).</p>

          <form class="form" action="#" method="post" enctype="multipart/form-data">
            <div class="field">
              <label for="cvFile">Choose CV File</label>
              <input id="cvFile" name="cv" type="file" accept=".pdf,.doc,.docx,.txt" />
            </div>

            <button class="btn primary" type="submit">Upload & Extract Skills</button>
          </form>
        </section>
      </section>
    </div>
  </main>

<?php include 'includes/footer.php'; ?>
