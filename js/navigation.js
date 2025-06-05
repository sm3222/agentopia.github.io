document.addEventListener("DOMContentLoaded", function () {
  const navHTML = `
    <header class="fixed w-full top-0 z-50 bg-gray-900/80 backdrop-blur-sm">
        <!-- Desktop Navigation -->
        <nav class="desktop-nav hidden md:flex max-w-6xl mx-auto justify-between items-center p-4">
            <a href="/" class="flex items-center hover:opacity-80 transition-opacity">
                <img src="/images/logo.svg" alt="AI Agentopia Logo" class="w-10 h-10 mr-3">
                <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">AI Agentopia</span>
            </a>
            <div class="space-x-6 flex items-center">
                <a href="/blog.html" class="nav-link">Blog</a>
                <a href="/resources.html" class="nav-link">Resources</a>
                <a href="/agents.html" class="nav-link">Agents</a>
                <a href="https://github.com/Agentopia" class="nav-link" target="_blank">GitHub</a>
                <button id="theme-toggle" class="theme-toggle-btn">
                    <span class="light-mode-icon">🌞</span>
                    <span class="dark-mode-icon hidden">🌙</span>
                </button>
            </div>
        </nav>

        <!-- Mobile Navigation -->
        <nav class="mobile-nav md:hidden">
            <div class="flex justify-between items-center p-4">
                <a href="/" class="flex items-center">
                    <img src="/images/logo.svg" alt="AI Agentopia Logo" class="w-8 h-8">
                    <span class="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 ml-2">AI Agentopia</span>
                </a>
                <button id="mobile-menu-toggle" class="text-amber-400 text-2xl p-2">☰</button>
            </div>

            <div id="mobile-menu" class="hidden bg-gray-900/95 backdrop-blur-sm fixed inset-0 pt-16">
                <button id="mobile-menu-close" class="absolute top-4 right-4 text-3xl text-amber-400">×</button>
                <div class="flex flex-col space-y-4 text-center px-4 pt-8">
                    <a href="/blog.html" class="nav-link text-lg border-b border-amber-400/20 pb-4">Blog</a>
                    <a href="/resources.html" class="nav-link text-lg border-b border-amber-400/20 pb-4">Resources</a>
                    <a href="/agents.html" class="nav-link text-lg border-b border-amber-400/20 pb-4">Agents</a>
                    <a href="https://github.com/Agentopia" class="nav-link text-lg" target="_blank">GitHub</a>
                </div>
            </div>
        </nav>
    </header>
    `;

  // Insert navigation
  document.getElementById("nav-placeholder").innerHTML = navHTML;

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuClose = document.getElementById("mobile-menu-close");

  if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }
});

// Footer HTML template
const footerHTML = `
<footer class="mt-auto bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-md border-t border-gray-700/50">
    <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center md:text-left">
                <div class="flex items-center justify-center md:justify-start mb-3">
                    <img src="/images/logo.svg" alt="AI Agentopia Logo" class="w-6 h-6 mr-2">
                    <span class="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">AI Agentopia</span>
                </div>
                <p class="text-gray-400 text-sm mb-4">A happy place for all kinds of AI agents.</p>
                <div class="mt-3">
                    <h3 class="text-base font-semibold mb-2 text-amber-400">Stay Updated</h3>
                    <form class="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
                        <input type="email" placeholder="Enter your email" class="px-3 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-400 text-gray-300">
                        <button type="submit" class="px-3 py-1.5 text-sm bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-400 transition-colors">Subscribe</button>
                    </form>
                </div>
            </div>
            <div class="text-center">
                <h3 class="text-base font-semibold mb-2 text-amber-400">Quick Links</h3>
                <ul class="space-y-1.5 text-sm text-gray-400">
                    <li><a href="/blog.html" class="hover:text-amber-400">Blog</a></li>
                    <li><a href="/resources.html" class="hover:text-amber-400">Resources</a></li>
                    <li><a href="/agents.html" class="hover:text-amber-400">Agents</a></li>
                    <li><a href="/tools/getting-started.html" class="hover:text-amber-400">Documentation</a></li>
                </ul>
            </div>
            <div class="text-center md:text-right">
                <h3 class="text-base font-semibold mb-2 text-amber-400">Connect With Us</h3>
                <ul class="space-y-1.5 text-sm text-gray-400">
                    <li><a href="https://github.com/Agentopia" class="hover:text-amber-400" target="_blank">GitHub Community</a></li>
                    <li><a href="/coming-soon.html" class="hover:text-amber-400">Discord Server</a></li>
                    <li><a href="/coming-soon.html" class="hover:text-amber-400">Twitter</a></li>
                </ul>
            </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-700 text-center">
            <p class="text-xs text-gray-500 mb-2">&copy; ${new Date().getFullYear()} AI Agentopia, a BIXORY AI entity. All rights reserved.</p>
            <div class="flex justify-center gap-4 text-xs text-gray-500">
                <a href="/privacy-policy.html" class="hover:text-amber-400">Privacy Policy</a>
                <a href="/terms-of-service.html" class="hover:text-amber-400">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>
`;

// Insert footer
document.getElementById("footer-placeholder").innerHTML = footerHTML;
