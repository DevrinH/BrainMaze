document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.theme-toggle');
    const toggleIcon = toggleButton.querySelector('.toggle-icon');
    const logoImage = document.querySelector('.logo');

    if (!toggleButton || !toggleIcon || !logoImage) {
        console.error('Missing elements:', { toggleButton, toggleIcon, logoImage });
        return;
    }

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log('Initial theme:', savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    toggleIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    
    // Set initial logo based on theme
    logoImage.src = savedTheme === 'dark' ? 'BrainJelli-header-white.png' : 'BrainJelli-header.png';

    toggleButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        console.log('Toggling to theme:', newTheme);

        // Update theme attribute and icon
        document.documentElement.setAttribute('data-theme', newTheme);
        toggleIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';

        // Update logo image
        logoImage.src = newTheme === 'dark' ? 'BrainJelli-header-white.png' : 'BrainJelli-header.png';

        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);

        // Log body background to verify
        console.log('Body background:', getComputedStyle(document.body).background);
    });
});