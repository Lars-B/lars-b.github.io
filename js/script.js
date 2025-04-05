// Get all tab links and tab content sections
const tabLinks = document.querySelectorAll('nav a');
const tabContentSections = document.querySelectorAll('.tab-content');

// Add click event listeners to each tab link
tabLinks.forEach(link => {
	link.addEventListener('click', () => {
		// Remove the 'active' class from all tab links and tab content sections
		tabLinks.forEach(link => link.classList.remove('active'));
		tabContentSections.forEach(section => section.classList.remove('active'));

		// Add the 'active' class to the clicked tab link and corresponding tab content section
		const tabName = link.dataset.tab;
		const matchingSection = document.querySelector(`#${tabName}`);
		link.classList.add('active');
		matchingSection.classList.add('active');

		// If the About or CV tab was clicked, load its content dynamically from the corresponding HTML file
		if (tabName === 'about' || tabName === 'cv') {
			fetch(`${tabName}.html`)