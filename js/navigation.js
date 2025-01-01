document.addEventListener('DOMContentLoaded', function() {
    // Navigation HTML template
    const navHTML = `
    <header class="fixed w-full top-0 z-50 bg-gray-900/80 backdrop-blur-sm">
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex max-w-6xl mx-auto justify-between items-center p-4">
            <a href="/" class="flex items-center hover:opacity-80 transition-opacity">
                <img src="images/logo.svg" alt="AI Agentopia Logo" class="w-10 h-10 mr-3">
                <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">AI Agentopia</span>
            </a>
            <div class="space-x-6 flex items-center">
                <a href="/agents.html" class="nav-link text-amber-400/80 hover:text-amber-400">Agents</a>
                <a href="/resources.html" class="nav-link text-amber-400/80 hover:text-amber-400">Resources</a>
                <a href="https://github.com/Agentopia" class="nav-link text-amber-400/80 hover:text-amber-400" target="_blank">GitHub</a>
                <button id="theme-toggle" class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                    <span class="light-mode-icon">🌞</span>
                    <span class="dark-mode-icon hidden">🌙</span>
                </button>
            </div>
        </nav>

        <!-- Mobile Navigation -->
        <nav class="md:hidden">
            <div class="flex justify-between items-center p-4">
                <a href="/" class="flex items-center hover:opacity-80 transition-opacity">
                    <img src="images/logo.svg" alt="AI Agentopia Logo" class="w-10 h-10">
                </a>
                <div class="flex items-center space-x-4">
                    <button id="theme-toggle-mobile" class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                        <span class="light-mode-icon">🌞</span>
                        <span class="dark-mode-icon hidden">🌙</span>
                    </button>
                    <button id="mobile-menu-toggle" class="text-amber-400 text-2xl p-2">☰</button>
                </div>
            </div>

            <div id="mobile-menu" class="hidden fixed inset-0 bg-gray-900/95 backdrop-blur-sm">
                <div class="flex flex-col items-center justify-center h-full relative">
                    <button id="mobile-menu-close" class="absolute top-4 right-4 text-3xl text-amber-400 p-2">×</button>
                    <a href="/agents.html" class="block py-4 px-4 hover:bg-amber-400/10 text-amber-400/80 hover:text-amber-400 text-xl">Agents</a>
                    <a href="/resources.html" class="block py-4 px-4 hover:bg-amber-400/10 text-amber-400/80 hover:text-amber-400 text-xl">Resources</a>
                    <a href="https://github.com/Agentopia" class="block py-4 px-4 hover:bg-amber-400/10 text-amber-400/80 hover:text-amber-400 text-xl" target="_blank">GitHub</a>
                </div>
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
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.getElementsByTagName('a');
    Array.from(mobileLinks).forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });
});
