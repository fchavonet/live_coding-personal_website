/*************************************
* MANAGE ACTIVE NAVBAR LINK ON CLICK *
*************************************/

const navLinks = document.querySelectorAll(".nav-link");

// Loop through each navigation link.
navLinks.forEach(function (link) {
	link.addEventListener("click", function () {
		// Remove the "active" class from all nav links.
		navLinks.forEach(link => link.classList.remove("active"));

		// Add the "active" class to the clicked link.
		this.classList.add("active");
	});
});


/***********************************************
* CALCULATE HEADER HEIGHT FOR SECTIONS PADDING *
***********************************************/

const header = document.querySelector("header");
const sections = document.querySelectorAll("section");

function updateSectionsPadding() {
	// Get the header's current height.
	const headerHeight = header.offsetHeight;
	// Set all the section's top padding equal to the header height.
	sections.forEach(function (section) {
		section.style.paddingTop = headerHeight + "px";
	});
}

// Update padding on load and when the window is resized.
updateSectionsPadding();
window.addEventListener("resize", updateSectionsPadding);