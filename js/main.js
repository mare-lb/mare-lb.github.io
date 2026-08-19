async function loadProjects() {
  const container = document.getElementById("project-container");

  if (!container) {
    return;
  }

  try {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw new Error("projects.json konnte nicht geladen werden.");
    }

    const projects = await response.json();

    projects.forEach((project) => {
      const card = document.createElement("article");

      card.className = "project-card";

      card.innerHTML = `

                <img
                    src="${project.image}"
                    alt="Screenshot von ${project.title}"
                    class="project-image-preview"
                    loading="lazy"
                >

                <div class="project-content">

                    <h3>
                        ${project.title}
                    </h3>

                    <p>
                        ${project.description}
                    </p>

                    <p class="project-status">
                        ${project.status}
                    </p>

                    <ul class="project-tags">

                        ${project.technologies
                          .map((technology) => `<li>${technology}</li>`)
                          .join("")}

                    </ul>

                    <a
                        href="project.html?id=${project.id}"
                        class="project-link"
                    >
                        Projekt ansehen →
                    </a>

                </div>
            `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Fehler beim Laden der Projekte:", error);

    container.innerHTML = `
            <p>
                Die Projekte konnten leider nicht geladen werden.
            </p>
        `;
  }
}

loadProjects();

/* =====================
   Dark Mode
===================== */

const themeToggle = document.getElementById("theme-toggle");

const themeIcon = document.getElementById("theme-icon");

function updateThemeIcon() {
  const darkMode = document.body.classList.contains("dark-mode");

  if (darkMode) {
    themeIcon.textContent = "☀";

    themeToggle.setAttribute("aria-label", "Light Mode aktivieren");
  } else {
    themeIcon.textContent = "☾";

    themeToggle.setAttribute("aria-label", "Dark Mode aktivieren");
  }
}

function setTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  localStorage.setItem("theme", theme);

  updateThemeIcon();
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");

    setTheme(isDark ? "light" : "dark");
  });
}
