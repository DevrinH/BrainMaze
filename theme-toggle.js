document.addEventListener('DOMContentLoaded', () => {
    console.log("External theme-toggle.js loaded");
    const toggleButton = document.querySelector('.theme-toggle');
    const toggleIcon = document.querySelector('.toggle-icon');
    const logoImage = document.querySelector('.logo');

    if (!toggleButton || !toggleIcon || !logoImage) {
        console.error('Missing elements in theme-toggle.js:', { toggleButton, toggleIcon, logoImage });
        return;
    }

    console.log("Elements found in theme-toggle.js:", { toggleButton, toggleIcon, logoImage });

    toggleButton.addEventListener('click', () => {
        console.log("Theme toggle clicked in theme-toggle.js");
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        toggleIcon.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19'; // Explicit Unicode
        logoImage.src = isDark ? '/BrainJelli-header.png' : '/BrainJelli-header-white.png';
    });
});