async function loadProject() {
  const container = document.getElementById("project-content");

  const parameters = new URLSearchParams(window.location.search);

  const projectId = parameters.get("id");

  if (!projectId) {
    showError("Es wurde kein Projekt angegeben.");

    return;
  }

  try {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw new Error("projects.json konnte nicht geladen werden.");
    }

    const projects = await response.json();

    const project = projects.find((item) => item.id === projectId);

    if (!project) {
      showError("Das angeforderte Projekt wurde nicht gefunden.");

      return;
    }

    renderProject(project);
  } catch (error) {
    console.error(error);

    showError("Das Projekt konnte leider nicht geladen werden.");
  }
}

function renderProject(project) {
  document.title = `${project.title} | Portfolio`;

  const container = document.getElementById("project-content");

  container.innerHTML = `

    <header class="project-header">

      <p class="project-status">
        ${project.category}
      </p>

      <h1>
        ${project.title}
      </h1>

      <p class="project-intro">
        ${project.description}
      </p>

    </header>


    <div class="project-preview">

      <h2>
        Vorschau
      </h2>

      <div class="project-image-wrapper">

        <img
          class="project-image"
          src="${project.image}"
          alt="Screenshot von ${project.title}"
        >

      </div>

    </div>


    <section class="project-technologies">

      <h2>
        Technologien
      </h2>

      <ul class="technology-list">

        ${project.technologies
          .map(
            (technology) => `
              <li>
                ${technology}
              </li>
            `
          )
          .join("")}

      </ul>

    </section>


    <div class="project-grid">


      <section class="project-section">

        <h2>
          Über das Projekt
        </h2>

        <p>
          ${project.details.about}
        </p>

      </section>


      <section class="project-section">

        <h2>
          Funktionen
        </h2>

        <ul class="feature-list">

          ${project.details.features
            .map(
              (feature) => `
                <li>
                  ${feature}
                </li>
              `
            )
            .join("")}

        </ul>

      </section>


      <section class="project-section">

        <h2>
          Herausforderungen
        </h2>

        <p>
          ${project.details.challenges}
        </p>

      </section>


      <section class="project-section">

        <h2>
          Was ich gelernt habe
        </h2>

        <p>
          ${project.details.learned}
        </p>

      </section>


    </div>

  `;
}

function showError(message) {
  const container = document.getElementById("project-content");

  container.innerHTML = `

        <section>

            <h1>
                Projekt nicht gefunden
            </h1>

            <p>
                ${message}
            </p>

            <a
                class="button"
                href="index.html#projects"
            >
                Zurück zu Projekten
            </a>

        </section>

    `;
}

loadProject();
