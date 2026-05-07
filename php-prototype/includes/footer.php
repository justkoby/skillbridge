  <footer class="footer">
    <div class="container flex" style="justify-content:space-between; flex-wrap:wrap;">
      <span>© 2026 SkillBridge (Prototype)</span>
      <span class="muted">University Undergraduate Project</span>
    </div>
  </footer>

  <script>
    // Basic mobile menu toggle
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");
    if (burger && navLinks) {
      burger.addEventListener("click", () => {
        const visible = navLinks.style.display === "flex";
        navLinks.style.display = visible ? "none" : "flex";
        if (!visible) {
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
          navLinks.style.zIndex = "100";
        }
      });
    }
  </script>
</body>
</html>
