document.addEventListener('DOMContentLoaded', function() {
    // Navigation HTML template
    const navHTML = `
    <header class="fixed w-full top-0 z-50">
        <!-- Desktop Navigation -->
        <nav class="desktop-nav max-w-6xl mx-auto flex justify-between items-center p-4">
            <div class="flex items-center">
                <img src="images/logo.svg" alt="AI Agentopia Logo" class="w-10 h-10 mr-3">
                <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">AI Agentopia</span>
            </div>
            <div class="space-x-6 flex items-center">
                <a href="/" class="nav-link text-amber-400/80 hover:text-amber-400">Home</a>
                <a href="/agents.html" class="nav-link text-amber-400/80 hover:text-amber-400">Agents</a>
                <a href="/resources.html" class="nav-link text-amber-400/80 hover:text-amber-400">Resources</a>
                <a href="/about.html" class="nav-link text-amber-400/80 hover:text-amber-400">About</a>
                <a href="https://github.com/Agentopia" class="nav-link text-amber-400/80 hover:text-amber-400" target="_blank">GitHub</a>
                <button id="theme-toggle" class="theme-toggle-btn">
                    <span class="light-mode-icon">🌞</span>
                    <span class="dark-mode-icon">🌙</span>
                </button>
            </div>
        </nav>

        <!-- Mobile Navigation -->
        <nav class="mobile-nav">
            <div class="max-w-6xl mx-auto flex justify-between items-center p-4">
                <div class="flex items-center">
                    <img src="images/logo.svg" alt="AI Agentopia Logo" class="w-10 h-10 mr-3">
                    <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">AI Agentopia</span>
                </div>
                <button id="mobile-menu-toggle" class="text-amber-400 text-2xl">☰</button>
            </div>

            <div id="mobile-menu" class="hidden mobile-menu-panel">
                <button id="mobile-menu-close" class="absolute top-4 right-4 text-2xl text-amber-400">×</button>
                <a href="/" class="block py-2 px-4 hover:bg-amber-400/10 text-amber-400/80 hover:text-amber-400">Home</a>
                <a href="/agents.html" class="block py-2 px-4 hover:bg-amber-400/10 text-amber-400/80 hover:text-amber-400">Agents</a>
                <a href="/resources.html" class="block py-2 px-4 hover:bg-amber-400/10 text-amber-400/80 hover:text-amber-400">Resources</a>
                <a href="/about.html" class="block py-2 px-4 hover:bg-amber-400/10 text-amber-400/80 hover:text-amber-400">About</a>
                <a href="https://github.com/Agentopia" class="block py-2 px-4 hover:bg-amber-400/10 text-amber-400/80 hover:text-amber-400" target="_blank">GitHub</a>
                <button id="mobile-theme-toggle" class="theme-toggle-btn mt-4">
                    <span class="light-mode-icon">🌞</span>
                    <span class="dark-mode-icon">🌙</span>
                </button>
            </div>
        </nav>
    </header>
    `;

    // Insert navigation
    document.getElementById('nav-placeholder').innerHTML = navHTML;

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});
