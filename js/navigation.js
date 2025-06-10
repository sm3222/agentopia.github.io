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
                    <li class="flex items-center justify-end space-x-2">
                        <a href="https://www.facebook.com/bixoryai/" class="hover:text-amber-400 flex items-center" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                            </svg>
                            Facebook
                        </a>
                    </li>
                    <li class="flex items-center justify-end space-x-2">
                        <a href="https://x.com/AIMindfully" class="hover:text-amber-400 flex items-center" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Twitter
                        </a>
                    </li>
                    <li class="flex items-center justify-end space-x-2">
                        <a href="https://www.linkedin.com/company/bixoryai" class="hover:text-amber-400 flex items-center" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            LinkedIn
                        </a>
                    </li>
                    <li class="flex items-center justify-end space-x-2">
                        <a href="https://github.com/Agentopia" class="hover:text-amber-400 flex items-center" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.398.1 2.647.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                            </svg>
                            GitHub Community
                        </a>
                    </li>
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
