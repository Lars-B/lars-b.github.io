// Function to toggle between light and dark mode
const modeToggleButton = document.getElementById('mode-toggle');

// Check local storage for saved theme preference, or default to light mode
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
} else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
}

// Event listener for the button to toggle modes
modeToggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');  // Save the dark mode preference
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');  // Save the light mode preference
    }
});

