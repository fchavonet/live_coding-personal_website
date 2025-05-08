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
