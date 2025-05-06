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

	themeToggler.addEventListener("click", function () {
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


/***********************************************
* CALCULATE HEADER HEIGHT FOR SECTIONS PADDING *
***********************************************/

const header = document.querySelector("header");
// const sections = document.querySelectorAll("section");
const aboutSection = document.getElementById("about");

function updateSectionsPadding() {
	// Get the header's current height.
	const headerHeight = header.offsetHeight;

	// Set all the section's top padding equal to the header height.
	// sections.forEach(function (section) {
	// 	section.style.paddingTop = headerHeight + "px";
	// });

	aboutSection.style.paddingTop = headerHeight - 32 + "px";
}

// Update padding on load and when the window is resized.
updateSectionsPadding();
window.addEventListener("resize", updateSectionsPadding);