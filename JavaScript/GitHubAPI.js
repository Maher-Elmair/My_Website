/*==================== PORTFOLIO SWIPER ====================*/

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  React: "#61dafb",
  Python: "#3572A5",
  Dart: "#00B4AB",
  "C++": "#f34b7d",
  Shell: "#89e051",
  Ruby: "#701516",
  PHP: "#4F5D95",
};

// Languages that belong to tooling/config — excluded from display pills
// These are not actual source languages and skew the language breakdown
const EXCLUDED_LANGUAGES = [
  "Dockerfile",
  "Makefile",
  "Shell",
  "Batchfile",
  "PowerShell",
  "CMake",
  "Nix",
  "YAML",
  "JSON",
  "Markdown",
  "Text",
];

document.addEventListener("DOMContentLoaded", async function () {
  const portfolioWrapper = document.querySelector(
    "#github-portfolio .swiper-wrapper",
  );
  const viewMoreBtn = document.getElementById("view-more-github");
  const githubUsername = "Maher-Elmair";

  if (!portfolioWrapper || !viewMoreBtn) {
    console.error("Portfolio container or view more button not found!");
    return;
  }

  try {
    // ── 1. Load project config ──────────────────────────────────────────────
    const configRes = await fetch("Data/projects.json");
    if (!configRes.ok) throw new Error("Failed to load projects.json");
    const config = await configRes.json();
    const { selectedProjects, repoImages, portfolioFallbackImage } = config;

    // ── 2. Load repos: local cache first, fallback to GitHub API in dev ─────
    let allRepos;

    try {
      const cacheRes = await fetch("Data/repos-cache.json");
      if (cacheRes.ok) {
        allRepos = await cacheRes.json();
        console.log("Loaded repos from local cache.");
      } else {
        throw new Error("Cache not found");
      }
    } catch {
      console.warn(
        "repos-cache.json not found — falling back to GitHub API (dev mode)",
      );
      const apiRes = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?per_page=100`,
      );
      allRepos = await apiRes.json();

      if (!Array.isArray(allRepos)) {
        throw new Error(
          `GitHub API error: ${JSON.stringify(allRepos).slice(0, 120)}`,
        );
      }
    }

    if (!Array.isArray(allRepos)) {
      throw new Error("repos data is malformed — expected an array");
    }

    // ── 3. Filter and sort repos to match selectedProjects order ────────────
    const filteredRepos = allRepos.filter((repo) =>
      selectedProjects.includes(repo.name),
    );

    const orderedRepos = selectedProjects
      .map((name) => filteredRepos.find((repo) => repo.name === name))
      .filter(Boolean);

    const totalProjects = orderedRepos.length;

    // ── 4. Load languages: local cache first, fallback to GitHub API ─────────
    let langsData = {};

    try {
      const langsRes = await fetch("Data/langs-cache.json");
      if (langsRes.ok) {
        langsData = await langsRes.json();
        console.log("Loaded languages from local cache.");
      } else {
        throw new Error("Cache not found");
      }
    } catch {
      console.warn(
        "langs-cache.json not found — fetching languages from API (dev mode)",
      );

      const langResults = await Promise.allSettled(
        orderedRepos.map((repo) =>
          fetch(
            `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`,
          )
            .then((r) => r.json())
            .then((langs) => ({ name: repo.name, langs })),
        ),
      );

      langResults.forEach((result) => {
        if (result.status === "fulfilled") {
          langsData[result.value.name] = result.value.langs;
        }
      });
    }

    // ── 5. Build a slide for each project ───────────────────────────────────
    orderedRepos.forEach((repo, index) => {
      const portfolioItem = document.createElement("div");
      portfolioItem.classList.add("portfolio-content", "swiper-slide");

      const displayName = repo.name.replace(/-/g, " ");
      const imageSrc = repoImages[repo.name] || portfolioFallbackImage;
      const demoLink =
        repo.homepage && repo.homepage.length > 0 ? repo.homepage : null;
      const codeLink = repo.html_url;

      // Filter out tooling languages, then take top 3 by byte count
      const langs = langsData[repo.name] || {};
      const langPills = Object.entries(langs)
        .filter(([lang]) => !EXCLUDED_LANGUAGES.includes(lang))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([lang]) => {
          const color = LANGUAGE_COLORS[lang] || "#8b949e";
          return `
            <span class="lang-pill">
              <span class="lang-dot" style="background:${color}"></span>
              ${lang}
            </span>`;
        })
        .join("");

      // Counter badge (e.g. 01 / 33)
      const slideNumber = String(index + 1).padStart(2, "0");
      const slideTotal = String(totalProjects).padStart(2, "0");

      portfolioItem.innerHTML = `
        <div class="portfolio-img-wrap">
          <img src="${imageSrc}" alt="${displayName}" class="portfolio-img" />
          <span class="portfolio-counter">${slideNumber} / ${slideTotal}</span>
        </div>
        <div class="portfolio-data">
          <div class="portfolio-meta">
            <span class="portfolio-tag">Project</span>
          </div>
          <h3 class="portfolio-title">${displayName}</h3>
          <p class="portfolio-description">${
            repo.description || "No description available."
          }</p>
          ${langPills ? `<div class="portfolio-langs">${langPills}</div>` : ""}
          <div class="portfolio-actions">
            <a href="${codeLink}" target="_blank" class="portfolio-button portfolio-button--ghost">
              View Code
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </a>
            ${
              demoLink
                ? `<a href="${demoLink}" target="_blank" class="portfolio-button portfolio-button--primary">
                    View Demo
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>`
                : ""
            }
          </div>
        </div>
      `;

      // Swap to fallback image on load error
      const imgEl = portfolioItem.querySelector(".portfolio-img");
      imgEl.onerror = () => {
        imgEl.src = portfolioFallbackImage;
      };

      portfolioWrapper.appendChild(portfolioItem);
    });

    // ── 6. Initialize Swiper ────────────────────────────────────────────────
    new Swiper(".portfolio-container", {
      loop: true,
      grabCursor: true,
      spaceBetween: 32,

      // Arrows inside the swiper container, on left and right sides
      navigation: {
        nextEl: ".portfolio-container .swiper-button-next",
        prevEl: ".portfolio-container .swiper-button-prev",
      },

      // Pagination dots rendered inside .portfolio-bottom on the left
      pagination: {
        el: ".portfolio-container .swiper-pagination",
        clickable: true,
        dynamicBullets: true, // shows max 3 visible dots, active always centered
        dynamicMainBullets: 1, // only the active dot is shown when there are many slides
      },

      // Auto-advance every 5 seconds — pauses on hover, resumes after interaction
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      // Enable progress tracking for pagination and other features
      watchSlidesProgress: true,

      // Disable mouse wheel to prevent accidental slide changes while page scrolling
      mousewheel: false,

      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      breakpoints: {
        568: { slidesPerView: 1 },
      },
    });

    viewMoreBtn.href = `https://github.com/${githubUsername}?tab=repositories`;
  } catch (err) {
    console.error("Failed to load portfolio:", err.message);
  }
});
