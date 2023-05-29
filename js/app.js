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

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const navbarUl = document.querySelector("#navbar__list");
const sections = document.querySelector(".main").querySelectorAll("section");
const pageHeader = document.querySelector(".header");
const toTopBtn = document.querySelector("#to-top");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const addMenuElements = () => {
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        // collect id and data-nav
        const sectionId = section.getAttribute("id");
        const sectionDataNav = section.getAttribute("data-nav");
        // create the li elements
        const liElement = document.createElement("li");
        liElement.innerHTML = `<a href="#${sectionId}" class="menu__link">${sectionDataNav}</a>`;
        fragment.appendChild(liElement);
    }
    // add li elements to the ul
    navbarUl.appendChild(fragment);
}


// Add class 'active' to section when near top of viewport
const checkActiveSection = () => {
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        if(box.top < window.innerHeight / 2 && box.bottom > window.innerHeight / 2) {
            if(!section.classList.contains("section-active")) {
                section.classList.add("section-active");
                document.querySelector(`[href="#${section.id}"]`).classList.add("active");
            }
        } else {
            if(section.classList.contains("section-active")){
                section.classList.remove("section-active");
                document.querySelector(`[href="#${section.id}"]`).classList.remove("active");
            }
        }
    }
}


// Scroll to anchor ID using scrollTO event
const scrollToAnchor = () => {
    const menuLinks = navbarUl.querySelectorAll(".menu__link");
    for(let i = 0; i < menuLinks.length; i++){
        menuLinks[i].addEventListener("click", function(e){
            e.preventDefault();
            sections[i].scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }
}


// Hide fixed navigation bar while not scrolling after 2 seconds
const hideNav = () => {
    const scrollValueOne = window.scrollY;
    if(pageHeader.classList.contains("is-hidden")) {
        pageHeader.classList.remove("is-hidden");
    }
    setTimeout(function(){
        const scrollValueTwo = window.scrollY;
        if (scrollValueOne === scrollValueTwo) {
            if(!pageHeader.classList.contains("is-hidden")) {
                pageHeader.classList.add("is-hidden");
            }
        }
    }, 2000);
}

// show back to top button on scroll
const showBackToTopBtn = () => {
    document.body.scrollTop > 40 || document.documentElement.scrollTop > 40 ? toTopBtn.style.opacity = 1 : toTopBtn.style.opacity = 0;
}

// scroll to the top of the document
toTopBtn.addEventListener("click", () => {
    document.body.scrollIntoView({behavior: "smooth"});
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
addMenuElements();

// Scroll to section on link click
scrollToAnchor();

// Set sections as active
document.addEventListener("scroll", () => {
    checkActiveSection();
    hideNav();
    showBackToTopBtn ();
});
checkActiveSection();