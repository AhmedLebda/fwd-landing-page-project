/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

// ===========> Global Variables <=========== 

const pageSections = document.querySelectorAll("section")
const navList = document.querySelector('#navbar__list')

// ===========> build nav function <=========== 

const buildNav = (sections) => {
    // Make sure that there are sections in the page
    if (sections) {
        const fragment = document.createDocumentFragment();

        sections.forEach(section => {
            const sectionName = section.dataset.nav;
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.classList.add("menu__link")
            a.href = `#${section.id}`
            a.textContent = sectionName
            li.appendChild(a)
            fragment.appendChild(li)
        });

        navList.appendChild(fragment)
    }
}
buildNav(pageSections);

// ===========> Add class 'active' to section when near top of viewport <=========== 
function scrollActive() {
    pageSections.forEach(section => {
        if (section.getBoundingClientRect().top <= 50 && section.getBoundingClientRect().bottom > 50) {
            section.classList.add('section__active')
            document.querySelector(`a[href='#${section.id}']`).classList.add("link__active")
        } else {
            section.classList.remove('section__active')
            document.querySelector(`a[href='#${section.id}']`).classList.remove("link__active")
        }
    });
}
window.addEventListener('scroll', scrollActive)

// ===========> Scroll to anchor ID using scrollTO event <=========== 

function scrollToSection(e) {
    // preventing the default action of anchor element
    e.preventDefault();

    const sectionId = e.target.getAttribute('href')
    const targetSection = document.querySelector(sectionId)
    window.scrollTo({ top: targetSection.offsetTop - 20, left: 0, behavior: 'smooth' })
}
[...navList.children].forEach(section => {
    section.addEventListener('click', scrollToSection);
});

// ===========> Scroll to to button <=========== 

function scrollTop() {
    const scrollTop = document.querySelector("#scrollToTop");
    window.scrollY >= 500
        ? scrollTop.classList.add("show")
        : scrollTop.classList.remove("show")

    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }))
}
window.addEventListener('scroll', scrollTop)

// ===========> Hide nav on scrolling down  <=========== 

let prevScroll = window.scrollY;
window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY;
    if (prevScroll < currentScroll) {
        navList.style.display = 'none';
    } else {
        navList.style.display = 'block'
    }
    prevScroll = currentScroll
})
