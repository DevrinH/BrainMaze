document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.theme-toggle');
    const toggleIcon = document.querySelector('.toggle-icon');
    const logoImage = document.querySelector('.logo');

    if (!toggleButton || !toggleIcon || !logoImage) {
        console.error('Missing elements:', { toggleButton, toggleIcon, logoImage });
        return;
    }

    toggleButton.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        toggleIcon.textContent = isDark ? '☀️' : '🌙';
        logoImage.src = isDark ? '/BrainJelli-header.png' : '/BrainJelli-header-white.png';
    });
});