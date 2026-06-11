# 🧑‍💻 Maher-Portfolio – Personal Portfolio

A professional front-end developer portfolio to showcase my projects and services.
The website is built with **HTML, CSS/Sass, JavaScript**, supports **Dark/Light mode**, and uses **Swiper.js** to display projects dynamically.

---

## 📸 Screenshots

### 🖥️ Desktop View

![Desktop Preview](/assets/images/Portfolio//My_Website.png)

---

## 🛠️ Built With

- **HTML5**
- **CSS3 + Sass** (modular partials + SCSS map)
- **JavaScript (Vanilla)**
- **Swiper.js** (portfolio slider)
- **Normalize.css** (cross-browser styling reset)
- **Font Awesome** & **Unicons** (icons)
- **Responsive Design**
- **Custom Favicon**
- **GitHub API** (fetching repos dynamically)
- **Local JSON Data** (custom project images & order)

---

## 📂 Project Structure

```tree
My_Website/
|
├── .github/
│   └── workflows/
│       └── update-portfolio.yml
│
├── assets/
│   └── images/
│       └── ... (project previews, images, icons, design assets)
│
├── Css/
│   ├── Normalize.css
│   ├── style.css
│   ├── style.css.map
│   └── swiper-bundle.min.css
│
├── Data/
│   ├── langs-cache.json     # Auto-generated file (created by GitHub Actions workflow)
│   ├── projects.json        # Custom repo config (names, images, fallback)
│   └── repos-cache.json     # Auto-generated file (created by GitHub Actions workflow)
│
├── JavaScript/
│   ├── app.js
│   ├── GitHubAPI.js         # Handles GitHub API + JSON integration
│   ├── sendEmail.js
│   └── swiper-bundle.min.js
│
├── Sass/
│   ├── _breakpoints.scss
│   ├── _global.scss
│   └── style.scss
│
├── index.html
│
└── README.md
```

---

## 📋 Features

- 🎯 **Clean semantic structure** (accessible HTML5).
- 🌗 **Dark/Light mode** toggle with `data-theme`.
- 📱 **Fully responsive** (SCSS breakpoints).
- 🧭 **Responsive navigation menu** with active link highlighting.
- 🧩 **Accordion skills section** (expand/collapse).
- 🧰 **Modal windows** for services details.
- 🖼️ **Portfolio slider** using Swiper.js:
  - Projects fetched via **GitHub API**.
  - Order & images controlled via **projects.json**.
  - **Fallback image** support if preview is missing.
- 📨 **Contact form** with EmailJS integration.
- 🔗 **Social links** in header & footer.
- 🧷 **Custom favicon** and icon libraries.

---

## ⚙️ GitHub Actions — Auto Portfolio Cache

The portfolio reads from a **local JSON cache** instead of calling GitHub API on every visit. This eliminates 403 rate-limit errors and makes loading instant. The cache updates automatically every day at midnight UTC.

### GitHub Actions Setup

#### How It Works

```text
Every day at midnight (UTC):
GitHub Actions → GitHub API (with Token) → repos-cache.json + langs-cache.json → commit & push

Every page visit:
Browser → reads Data/repos-cache.json locally → renders portfolio instantly
```

### Setup

#### Step 1 — Create a GitHub Token

1. `github.com` → profile picture → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)** → Note: `portfolio-cache` → Expiration: `No expiration` → Scope: `public_repo` only
3. Click **Generate token** and **copy it immediately**

#### **Step 2 — Add Token as Repository Secret**

1. Your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
2. Name: `PORTFOLIO_TOKEN` → paste the token → **Add secret**

#### **Step 3 — Enable Write Permissions**

Your repo → **Settings** → **Actions** → **General** → **Workflow permissions** → select **Read and write permissions** → **Save**

#### **Step 4 — Create the Workflow File**

Create `.github/workflows/update-portfolio.yml`:

#### **Step 5 — Run Manually (First Time)**

Repo → **Actions** tab → **Update Portfolio Cache** → **Run workflow** → wait ~1 minute → then run `git pull` locally.

---

## 📧 Contact Form — EmailJS Setup

The contact form sends emails directly from the browser using [EmailJS](https://emailjs.com) — no backend required.

### Configuration

1.Create an account at [emailjs.com](https://emailjs.com) 2.**Email Services** → **Add New Service** → connect Gmail → note the **Service ID** 3.**Email Templates** → **Create New Template** → use these variables:

```text
{{user_name}}  {{user_email}}  {{project}}  {{message}}  {{user_avatar}}
```

4.Note the **Template ID** → **Account** → copy **Public Key**
5.Update `sendEmail.js`:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");
emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this);
```

6.**Account** → **Security** → **Allowed Origins** → add `https://maher-elmair.github.io` to prevent unauthorized use of your key

---

## 🚀 Live Demo

- 🔗 [View Live Project](https://maher-elmair.github.io/My_Website/)
- 💡 [Bit.ly Short Link](https://bit.ly/Maher-portfolio)

---

## 👨‍💻 Developer

### **Maher Elmair**

- 📫 [maher.elmair.dev@gmail.com](mailto:maher.elmair.dev@gmail.com)
- 🔗 [LinkedIn](https://www.linkedin.com/in/maher-elmair)
- ✖️ [X (Twitter)](https://x.com/Maher_Elmair)
- ❤️ Made with passion by [Maher Elmair](https://maher-elmair.github.io/My_Website)

---

## 🙏 Credits

- 🎠 Slider: **Swiper.js**
- 🧰 Icons: **Font Awesome** & **Unicons**
- 📦 GitHub API: for repo info
- 💡 Inspired by open-source developer templates (_Bedimcode_ style)

---

## 🙌 Thank You

If you liked the project, please ⭐ the repository!  
Feel free to open issues or submit pull requests with improvements 🙏
