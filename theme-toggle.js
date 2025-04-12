document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.theme-toggle');
    const toggleIcon = toggleButton.querySelector('.toggle-icon');
    const logoImage = document.querySelector('.logo');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    toggleIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    
    // Set initial logo based on theme
    logoImage.src = savedTheme === 'dark' ? 'BrainJelli-header-white.png' : 'BrainJelli-header.png';

    toggleButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Update theme attribute and icon
        document.documentElement.setAttribute('data-theme', newTheme);
        toggleIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';

        // Update logo image
        logoImage.src = newTheme === 'dark' ? 'BrainJelli-header-white.png' : 'BrainJelli-header.png';

        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
    });
});