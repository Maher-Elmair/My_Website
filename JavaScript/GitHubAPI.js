/*==================== PORTFOLIO SWIPER  ====================*/

document.addEventListener("DOMContentLoaded", async function () {
  const portfolioWrapper = document.querySelector(
    "#github-portfolio .swiper-wrapper"
  );
  const viewMoreBtn = document.getElementById("view-more-github");
  const githubUsername = "Maher-Elmair";

  if (!portfolioWrapper || !viewMoreBtn) {
    console.error("❌ Portfolio container or view more button not found!");
    return;
  }

  try {
    // 🔹 جلب بيانات المشاريع من JSON
    const dataResponse = await fetch("Data/projects.json");
    const data = await dataResponse.json();
    const selectedProjects = data.selectedProjects;
    const repoImages = data.repoImages;
    const portfolioFallbackImage = data.portfolioFallbackImage;

    // 🔹 جلب بيانات مستودعات GitHub
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?per_page=100`
    );
    const repos = await response.json();

    // 🔹 فلترة المشاريع اللي موجودة على GitHub
    const filteredRepos = repos.filter((repo) =>
      selectedProjects.includes(repo.name)
    );

    // 🔹 ترتيب المشاريع حسب ترتيب selectedProjects في JSON
    const orderedRepos = selectedProjects
      .map((name) => filteredRepos.find((repo) => repo.name === name))
      .filter(Boolean); // إزالة المشاريع غير الموجودة

    // 🔹 إنشاء كل المشاريع كـ Slides
    orderedRepos.forEach((repo) => {
      const portfolioItem = document.createElement("div");
      portfolioItem.classList.add("portfolio-content", "swiper-slide");

      const displayName = repo.name.replace(/-/g, " "); // للعرض فقط
      const imageSrc = repoImages[repo.name] || portfolioFallbackImage;
      const demoLink =
        repo.homepage && repo.homepage.length > 0
          ? repo.homepage
          : repo.html_url;

      portfolioItem.innerHTML = `
        <img src="${imageSrc}" alt="${displayName}" class="portfolio-img"/>
        <div class="portfolio-data">
          <h3 class="portfolio-title">${displayName}</h3>
          <p class="portfolio-description">${
            repo.description || "No description available."
          }</p>
          <a href="${demoLink}" target="_blank" class="portfolio-button">
            View Project
            <i class="uil uil-arrow-right button-icon"></i>
          </a>
        </div>
      `;

      // 🔹 استخدام fallback لو حصل خطأ في تحميل الصورة
      const imgElement = portfolioItem.querySelector("img");
      imgElement.onerror = () => {
        imgElement.src = portfolioFallbackImage;
      };

      portfolioWrapper.appendChild(portfolioItem);
    });

    // 🔹 تهيئة Swiper بعد إضافة كل المشاريع
    const swiperPortfolio = new Swiper(".portfolio-container", {
      loop: true,
      grabCursor: true,
      spaceBetween: 48,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        568: { slidesPerView: 1 },
      },
      mousewheel: true,
      keyboard: true,
    });

    viewMoreBtn.href = `https://github.com/${githubUsername}?tab=repositories`;
  } catch (err) {
    console.error("❌ Failed to fetch data:", err);
  }
});
