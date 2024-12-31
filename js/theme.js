document.addEventListener('DOMContentLoaded', function() {
    // Get theme toggle buttons
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;

    // Function to toggle theme
    function toggleTheme() {
        body.classList.toggle('light-mode');
        
        // Save theme preference
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('agentopia-theme', currentTheme);

        // Update emoji visibility based on theme
        updateThemeEmojis();
    }

    // Function to update theme emoji visibility
    function updateThemeEmojis() {
        const isLightMode = body.classList.contains('light-mode');
        document.querySelectorAll('.light-mode-icon').forEach(icon => {
            icon.style.display = isLightMode ? 'none' : 'inline';
        });
        document.querySelectorAll('.dark-mode-icon').forEach(icon => {
            icon.style.display = isLightMode ? 'inline' : 'none';
        });
    }

    // Add click event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('agentopia-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    // Initial update of theme emojis
    updateThemeEmojis();
});
