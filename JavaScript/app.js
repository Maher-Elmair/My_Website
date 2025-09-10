/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme_button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav_menu"),
    navToggle = document.getElementById("nav_toggle"),
    navClose = document.getElementById("nav_close");
/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav-link')

function linkAction() {
    const navMenu = document.getElementById('nav_menu')
    // When we click on each nav-link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== Typewriter effect using pure javascript ====================*/
const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

const textArray = ["Maher","Web Developer", "Web Designer"];

let textArrayIndex = 0;
let charIndex = 0;

const erase = () => {
    if (charIndex > 0) {
        cursor.classList.remove('blink');
        typedText.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 80);
    } else {
        cursor.classList.add('blink');
        textArrayIndex++;
        if (textArrayIndex > textArray.length - 1) {
            textArrayIndex = 0;
        }
        setTimeout(type, 2000);
    }
}

const type = () => {
    if (charIndex <= textArray[textArrayIndex].length - 1) {
        cursor.classList.remove('blink');
        typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 120);
    } else {
        cursor.classList.add('blink');
        setTimeout(erase, 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    type();
})
/*==================== ACCORDION SKILLS ====================*/

const skillsContent = document.getElementsByClassName("skills-content"),
    skillsHeader = document.querySelectorAll(".skills-header");

function toggleSkills() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills-content skills-close "
    }
    if (itemClass === "skills-content skills-close ") {
        this.parentNode.className = "skills-content skills-open "
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener("click", toggleSkills)
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll(".services-modal"),
    modalBtns = document.querySelectorAll(".services-button"),
    modalCloses = document.querySelectorAll(".services-modal-close");
    let body = document.querySelector("body")

let modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal")
    body.style.overflowY = "hidden";
}
modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})
modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove("active-modal")
            body.style.overflowY = "scroll";
        })
    })
})


/*==================== SHOW SCROLL UP ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
