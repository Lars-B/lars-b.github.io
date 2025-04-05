// Get all the tab links and content sections
const tabLinks = document.querySelectorAll('nav a');
const tabContents = document.querySelectorAll('.tab-content');

// Function to switch active tab
function switchTab(event) {
    event.preventDefault();
    // Remove active class from all tab links and content
    tabLinks.forEach(link => link.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to clicked tab link and corresponding content
    const targetId = event.target.getAttribute('href').substring(1); // Remove '#' from href
    document.getElementById(targetId).classList.add('active');
    event.target.classList.add('active');
}

// Add event listeners to all tab links
tabLinks.forEach(link => {
    link.addEventListener('click', switchTab);
});

// Set the default active tab (e.g., Home)
document.querySelector('nav a').classList.add('active');
document.getElementById('home').classList.add('active');

