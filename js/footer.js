// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Create footer HTML content
  const footerContent = `
    <footer class="bg-gray-900 py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <!-- About -->
                <div class="text-center md:text-left">
                    <h3 class="text-xl font-semibold mb-4 text-amber-400">About Agentopia</h3>
                    <p class="text-gray-400">
                        Building the future of AI agents through open collaboration and innovation.
                    </p>
                </div>
                <!-- Quick Links -->
                <div class="text-center">
                    <h3 class="text-xl font-semibold mb-4 text-amber-400">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="/agents.html" class="text-gray-400 hover:text-amber-400">Agents</a></li>
                        <li><a href="/resources.html" class="text-gray-400 hover:text-amber-400">Resources</a></li>
                        <li><a href="https://github.com/Agentopia" class="text-gray-400 hover:text-amber-400">GitHub</a></li>
                    </ul>
                </div>
                <!-- Connect -->
                <div class="text-center md:text-right">
                    <h3 class="text-xl font-semibold mb-4 text-amber-400">Connect</h3>
                    <div class="flex justify-center md:justify-end space-x-4">
                        <a href="https://github.com/Agentopia" target="_blank" class="text-gray-400 hover:text-amber-400">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8">
                <p class="text-gray-400 text-center mb-4">
                    2024 AI Agentopia. All rights reserved.
                </p>
                <div class="text-center space-x-4">
                    <a href="https://github.com/Agentopia/agentopia.github.io/blob/main/LICENSE" class="text-sm text-gray-500 hover:text-amber-400">License</a>
                    <a href="https://github.com/Agentopia/agentopia.github.io/blob/main/CODE_OF_CONDUCT.md" class="text-sm text-gray-500 hover:text-amber-400">Code of Conduct</a>
                </div>
            </div>
        </div>
    </footer>
    `;

  // Function to inject footer
  function injectFooter() {
    // Get or create footer placeholder
    let footerPlaceholder = document.getElementById("footer-placeholder");
    if (!footerPlaceholder) {
      footerPlaceholder = document.createElement("div");
      footerPlaceholder.id = "footer-placeholder";
      document.body.appendChild(footerPlaceholder);
    }

    // Insert the footer content
    footerPlaceholder.innerHTML = footerContent;

    // Fix relative paths based on current page location
    const currentPath = window.location.pathname;
    const depth = (currentPath.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? "../".repeat(depth) : "./";

    // Update all relative links in the footer
    footerPlaceholder.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return;
      link.href = prefix + href;
    });
  }

  // Try to inject footer immediately
  injectFooter();

  // Retry after a short delay if the first attempt fails
  setTimeout(injectFooter, 100);
});
