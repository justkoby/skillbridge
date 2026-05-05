<!-- =========================================================
     SKILLBRIDGE - Matching HTML Templates (Plain HTML)
     Pages Included:
     1) login.html
     2) dashboard.html
     3) jobseeker-profile.html
     4) employer-posting.html

     How to use:
     - Save each section into its own .html file.
     - Link your CSS: <link rel="stylesheet" href="style.css">
     - (Optional) Add the JS snippet at the bottom for mobile nav.
   ========================================================= -->

<!-- =========================
     1) login.html
========================= -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SkillBridge | Login</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- Top Nav -->
  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="login.html">
        <span class="logo" aria-hidden="true"></span>
        <span>SkillBridge</span>
      </a>

      <nav class="nav-links" aria-label="Primary">
        <a href="login.html" class="active">Login</a>
        <a href="jobseeker-profile.html">Job Seeker</a>
        <a href="employer-posting.html">Employer</a>
      </nav>

      <div class="nav-actions">
        <button class="burger" type="button" aria-label="Open menu">☰</button>
      </div>
    </div>
  </header>

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
          <a class="btn" href="#register">Create Account</a>
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

        <form class="form" action="#" method="post">
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

      <!-- Register Card -->
      <section id="register" class="card">
        <h2>Create Account</h2>
        <p class="sub">Choose your role and start using SkillBridge.</p>

        <form class="form" action="#" method="post">
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
        </form>
      </section>
    </div>
  </main>

  <footer class="footer">
    <div class="container flex" style="justify-content:space-between; flex-wrap:wrap;">
      <span>© 2026 SkillBridge (Prototype)</span>
      <span class="muted">University Undergraduate Project</span>
    </div>
  </footer>

</body>
</html>


<!-- =========================
     2) dashboard.html
========================= -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SkillBridge | Dashboard</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="dashboard.html">
        <span class="logo" aria-hidden="true"></span>
        <span>SkillBridge</span>
      </a>

      <nav class="nav-links" aria-label="Primary">
        <a href="dashboard.html" class="active">Dashboard</a>
        <a href="jobseeker-profile.html">Job Seeker Profile</a>
        <a href="employer-posting.html">Post a Job</a>
      </nav>

      <div class="nav-actions">
        <a class="btn ghost" href="login.html">Logout</a>
        <button class="burger" type="button" aria-label="Open menu">☰</button>
      </div>
    </div>
  </header>

  <main class="main">
    <div class="container layout">

      <!-- Sidebar -->
      <aside class="sidebar">
        <p class="side-title">Quick Menu</p>
        <nav class="side-menu" aria-label="Sidebar">
          <a class="active" href="dashboard.html">Overview <span class="badge">Home</span></a>
          <a href="jobseeker-profile.html">My Profile <span class="badge">CV</span></a>
          <a href="#jobs">Job Matches <span class="badge success">New</span></a>
          <a href="#learning">Upskilling <span class="badge">Learn</span></a>
          <a href="#settings">Settings <span class="badge">⚙</span></a>
        </nav>
      </aside>

      <!-- Content -->
      <section class="content">

        <!-- Stats -->
        <section class="card">
          <h2>Dashboard Overview</h2>
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
            <a class="btn primary" href="jobseeker-profile.html">Edit Skills/Profile</a>
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

        <!-- Learning -->
        <section id="learning" class="card">
          <h2>Upskilling Recommendations</h2>
          <p class="sub">Courses suggested for your missing skills (micro-learning focus).</p>

          <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="alert warning">
              <strong>Missing Skill:</strong> Basic Networking<br />
              <span class="muted">Suggested: Intro to Networking (2–4 hours)</span>
            </div>
            <div class="alert warning">
              <strong>Missing Skill:</strong> CRM Tools<br />
              <span class="muted">Suggested: Customer Support with CRM (3 hours)</span>
            </div>
            <div class="alert warning">
              <strong>Missing Skill:</strong> Advanced Excel<br />
              <span class="muted">Suggested: Excel for Office Work (4 hours)</span>
            </div>
            <div class="alert warning">
              <strong>Missing Skill:</strong> Ticketing Systems<br />
              <span class="muted">Suggested: Helpdesk Ticketing Basics (2 hours)</span>
            </div>
          </div>
        </section>

        <!-- Settings -->
        <section id="settings" class="card">
          <h2>Settings</h2>
          <p class="sub">Manage preferences and privacy options (prototype).</p>
          <div class="flex" style="flex-wrap:wrap;">
            <button class="btn">Download My Data</button>
            <button class="btn danger">Delete Account</button>
          </div>
          <p class="helper">Note: In production, these actions require strong identity verification.</p>
        </section>

      </section>
    </div>
  </main>

  <footer class="footer">
    <div class="container flex" style="justify-content:space-between; flex-wrap:wrap;">
      <span>© 2026 SkillBridge (Prototype)</span>
      <span class="muted">Dashboard</span>
    </div>
  </footer>

</body>
</html>


<!-- =========================
     3) jobseeker-profile.html
========================= -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SkillBridge | Job Seeker Profile</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="dashboard.html">
        <span class="logo" aria-hidden="true"></span>
        <span>SkillBridge</span>
      </a>

      <nav class="nav-links" aria-label="Primary">
        <a href="dashboard.html">Dashboard</a>
        <a href="jobseeker-profile.html" class="active">Job Seeker Profile</a>
        <a href="employer-posting.html">Post a Job</a>
      </nav>

      <div class="nav-actions">
        <a class="btn ghost" href="login.html">Logout</a>
        <button class="burger" type="button" aria-label="Open menu">☰</button>
      </div>
    </div>
  </header>

  <main class="main">
    <div class="container layout">

      <aside class="sidebar">
        <p class="side-title">Job Seeker</p>
        <nav class="side-menu" aria-label="Sidebar">
          <a class="active" href="#profile">Profile</a>
          <a href="#cv">CV Upload</a>
          <a href="#skills">Skills</a>
          <a href="dashboard.html">Back to Dashboard</a>
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
                <input id="jsName" name="name" type="text" placeholder="e.g., Ama Mensah" required />
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
              <p class="helper">Tip: Mention tools and tasks you can perform (e.g., Excel, customer service, data entry).</p>
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
              <p class="helper">Accepted: PDF, DOC, DOCX, TXT</p>
            </div>

            <button class="btn primary" type="submit">Upload & Extract Skills</button>
          </form>
        </section>

        <section id="skills" class="card">
          <h2>Confirm Extracted Skills</h2>
          <p class="sub">Review skills detected from your CV. Remove incorrect ones and add missing skills.</p>

          <div class="chips" style="margin-bottom:12px;">
            <span class="chip">MS Excel</span>
            <span class="chip">Data Entry</span>
            <span class="chip">Customer Service</span>
            <span class="chip">Communication</span>
            <span class="chip">Time Management</span>
          </div>

          <form class="form" action="#" method="post">
            <div class="field">
              <label for="addSkill">Add a Skill</label>
              <input id="addSkill" type="text" placeholder="e.g., PowerPoint, Sales, Python..." />
            </div>

            <div class="flex" style="justify-content:flex-end; flex-wrap:wrap;">
              <button class="btn" type="button">Remove Selected</button>
              <button class="btn primary" type="submit">Save Skills</button>
            </div>
          </form>

          <hr />
          <div class="alert success">
            <strong>Tip:</strong> The more accurate your skills list, the better the job matches and learning recommendations.
          </div>
        </section>

      </section>
    </div>
  </main>

  <footer class="footer">
    <div class="container flex" style="justify-content:space-between; flex-wrap:wrap;">
      <span>© 2026 SkillBridge (Prototype)</span>
      <span class="muted">Job Seeker Profile</span>
    </div>
  </footer>

</body>
</html>


<!-- =========================
     4) employer-posting.html
========================= -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SkillBridge | Employer Job Posting</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="dashboard.html">
        <span class="logo" aria-hidden="true"></span>
        <span>SkillBridge</span>
      </a>

      <nav class="nav-links" aria-label="Primary">
        <a href="dashboard.html">Dashboard</a>
        <a href="jobseeker-profile.html">Job Seeker Profile</a>
        <a href="employer-posting.html" class="active">Employer</a>
      </nav>

      <div class="nav-actions">
        <a class="btn ghost" href="login.html">Logout</a>
        <button class="burger" type="button" aria-label="Open menu">☰</button>
      </div>
    </div>
  </header>

  <main class="main">
    <div class="container layout">

      <aside class="sidebar">
        <p class="side-title">Employer</p>
        <nav class="side-menu" aria-label="Sidebar">
          <a class="active" href="#post">Post Job</a>
          <a href="#manage">Manage Jobs</a>
          <a href="#candidates">Candidate Matches</a>
          <a href="dashboard.html">Back to Dashboard</a>
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
              <p class="helper">Tip: Mention tools (Excel, CRM) and responsibilities (responding to tickets, reporting, etc.).</p>
            </div>

            <div class="flex" style="justify-content:flex-end; flex-wrap:wrap;">
              <button class="btn" type="button">Preview</button>
              <button class="btn primary" type="submit">Post Vacancy</button>
            </div>
          </form>

          <hr />
          <div class="alert success">
            <strong>After posting:</strong> The system extracts required skills, normalizes them, and ranks candidates by skill-fit score.
          </div>
        </section>

        <section id="manage" class="card">
          <h2>Manage Posted Jobs</h2>
          <p class="sub">View and edit your vacancies (prototype).</p>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Status</th>
                  <th>Date Posted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Customer Support Officer</td>
                  <td><span class="badge success">Active</span></td>
                  <td>Feb 18, 2026</td>
                  <td>
                    <button class="btn">Edit</button>
                    <button class="btn danger">Close</button>
                  </td>
                </tr>
                <tr>
                  <td>Administrative Assistant</td>
                  <td><span class="badge">Draft</span></td>
                  <td>Feb 17, 2026</td>
                  <td>
                    <button class="btn">Edit</button>
                    <button class="btn">Publish</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="candidates" class="card">
          <h2>Candidate Matches</h2>
          <p class="sub">Ranked candidates based on skill-fit score (prototype sample data).</p>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Top Skills</th>
                  <th>Fit Score</th>
                  <th>Missing Skills</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ama Mensah</td>
                  <td>Customer Service, Excel, Communication</td>
                  <td><span class="score high">85%</span></td>
                  <td>CRM Tools</td>
                  <td><button class="btn">View Profile</button></td>
                </tr>
                <tr>
                  <td>Kofi Owusu</td>
                  <td>Data Entry, Excel, Reporting</td>
                  <td><span class="score mid">66%</span></td>
                  <td>Ticketing Systems</td>
                  <td><button class="btn">View Profile</button></td>
                </tr>
                <tr>
                  <td>Akosua Boateng</td>
                  <td>Communication, Teamwork</td>
                  <td><span class="score low">42%</span></td>
                  <td>CRM Tools, Reporting</td>
                  <td><button class="btn">View Profile</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="helper">Note: In production, employers can shortlist, message, and export candidates.</p>
        </section>

      </section>
    </div>
  </main>

  <footer class="footer">
    <div class="container flex" style="justify-content:space-between; flex-wrap:wrap;">
      <span>© 2026 SkillBridge (Prototype)</span>
      <span class="muted">Employer Module</span>
    </div>
  </footer>

</body>
</html>


<!-- =========================================================
     OPTIONAL: Tiny JS snippet for a simple mobile menu
     Put this in each page before </body> if you want
========================================================= -->
<script>
  // Basic mobile menu toggle (simple placeholder)
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const visible = navLinks.style.display === "flex";
      navLinks.style.display = visible ? "none" : "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "68px";
      navLinks.style.right = "16px";
      navLinks.style.padding = "10px";
      navLinks.style.border = "1px solid var(--border)";
      navLinks.style.borderRadius = "14px";
      navLinks.style.background = "rgba(17,26,46,0.95)";
      navLinks.style.boxShadow = "var(--shadow)";
      navLinks.style.minWidth = "220px";
    });
  }
</script>