/*************************
* THEME TOGGLER BEHAVIOR *
*************************/

// Get stored theme from localStorage or default to "light".
let currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-bs-theme", currentTheme);

// Select all theme toggle buttons.
const themeTogglers = document.querySelectorAll(".theme-toggler");

// Get the button element for "works" section.
const worksBtn = document.getElementById("works-btn");

// Utility function to update the icon based on the theme.
function updateIcon(icon, theme) {
	// Remove any existing theme-related icon classes.
	icon.classList.remove("bi-sun-fill", "bi-moon-fill");

	// Add the correct class depending on the theme.
	if (theme === "light") {
		icon.classList.add("bi-moon-fill");

		worksBtn.classList.add("btn-outline-dark");
		worksBtn.classList.remove("btn-outline-light");
	} else {
		icon.classList.add("bi-sun-fill");

		worksBtn.classList.add("btn-outline-light");
		worksBtn.classList.remove("btn-outline-dark");
	}
}

// Initialize icons and set up event listeners.
themeTogglers.forEach(function (themeToggler) {
	const icon = themeToggler.querySelector("i");
	updateIcon(icon, currentTheme);

	themeToggler.addEventListener("click", function (event) {
		event.preventDefault();

		// Toggle the theme.
		if (currentTheme === "light") {
			currentTheme = "dark";
		} else {
			currentTheme = "light";
		}

		// Apply and store the new theme.
		document.documentElement.setAttribute("data-bs-theme", currentTheme);
		localStorage.setItem("theme", currentTheme);

		// Update the icon accordingly.
		updateIcon(icon, currentTheme);
	});
});


/*********************************************
 * SMOOTH SCROLLING ADJUSTED FOR FIXED HEADER *
 *********************************************/

// Reference the header element and compute its height.
const header = document.querySelector("header");
const headerHeight = header.offsetHeight;

// Select all internal anchor links (href starting with "#").
const anchors = document.querySelectorAll('a[href^="#"]');

anchors.forEach(function (anchor) {
	anchor.addEventListener("click", function (event) {
		event.preventDefault();

		// Retrieve the target section element from the link's href.
		const targetId = anchor.getAttribute("href");
		const targetSection = document.querySelector(targetId);

		// Exit if the section does not exist.
		if (!targetSection) {
			return;
		}

		// Compute the section's top position relative to the document.
		const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;

		// Determine whether to apply the header offset.
		let offsetToApply;
		if (targetSection.hasAttribute("data-no-scroll-offset")) {
			// If the section has data-no-scroll-offset, do not apply any offset.
			offsetToApply = 0;
		} else {
			// Otherwise, always subtract the header height.
			offsetToApply = headerHeight;
		}

		// Calculate the final scroll position.
		const scrollToPosition = sectionTop - offsetToApply;

		// Smooth scroll to the calculated position.
		window.scrollTo({
			top: scrollToPosition,
			behavior: "smooth"
		});

		window.dispatchEvent(new Event("scroll"));
	});
});


/****************************
* DATA FOR DYNAMIC CAROUSEL *
****************************/

const projects = [
	{
		title: "Holberton Survivors",
		description: 'Dans le cadre de ma formation à la Holberton School, j’ai co-développé avec <a href="https://github.com/SpStigma" target="_blank">Yoann Rivet</a> un jeu vidéo inspiré de <a href="https://store.steampowered.com/app/1794680/Vampire_Survivors/" target="_blank">Vampire Survivors</a>, réalisé en deux mois avec Unity en C#, sans connaissance préalable de ces outils. Présenté en anglais devant un jury de professionnels lors de notre soutenance finale, ce projet a mobilisé nos compétences en développement logiciel, gestion de projet et travail d’équipe, contribuant à l’obtention de notre diplôme.',
		image: "./assets/images/carousel/works-holberton_survivors.webp",
		link: "https://www.holbertonsurvivors.com/",
	},
	{
		title: "GitHub README Builder",
		description: 'Ce projet est une application web interactive qui permet aux utilisateurs de composer, prévisualiser et exporter des fichiers README.md pour <a href="https://github.com/" target="_blank">GitHub</a>. Elle propose un éditeur <a href="https://fr.wikipedia.org/wiki/Markdown" target="_blank">Markdown</a> en temps réel, des modules de contenu prédéfinis, un générateur de badges personnalisés basé sur ceux de <a href="https://shields.io/" target="_blank">Shields.io</a> et une prévisualisation instantanée au format et dans le style d\'affichage de GitHub (même CSS).',
		image: "./assets/images/carousel/works-github_readme_builder.webp",
		link: "https://fchavonet.github.io/web-github_readme_builder/"
	},
	{
		title: "Flip Book",
		description: 'Un simple flipbook réalisé en HTML et CSS. Son design essaie de reproduire la même expérience que celle du feuilletage d’un petit livre. Grâce aux animations et transitions CSS, le flipbook offre à l’utilisateur une navigation fluide, alliant fonctionnalité et esthétisme.',
		image: "./assets/images/carousel/works-flip_book.webp",
		link: "https://fchavonet.github.io/web-flip_book/"
	},
]

/****************************
* DYNAMIC CAROUSEL BEHAVIOR *
****************************/

const worksTitle = document.getElementById("works-title");
const carouselCaptionText = document.getElementById("carousel-caption-text");
const carouselInner = document.querySelector("#works-carousel .carousel-inner");
const carouselProjectLink = document.getElementById("carousel-project-link");

worksTitle.textContent = projects[0].title;
carouselCaptionText.innerHTML = projects[0].description;
carouselProjectLink.href = projects[0].link;

// Create each carousel item dynamically.
projects.forEach(function (project, index) {
	const item = document.createElement("div");
	item.classList.add("carousel-item");

	if (index === 0) {
		item.classList.add("active");
	}

	const img = document.createElement("img");
	img.classList.add("w-100", "d-block");
	img.src = project.image;
	img.alt = "Capture d'écran du projet " + project.title;

	item.appendChild(img);
	carouselInner.appendChild(item);
});

//
const worksCarousel = document.getElementById("works-carousel");

worksCarousel.addEventListener("slid.bs.carousel", function (event) {
	const index = event.to;
	worksTitle.textContent = projects[index].title;
	carouselCaptionText.innerHTML = projects[index].description;
	carouselProjectLink.href = projects[index].link;
});