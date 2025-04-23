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