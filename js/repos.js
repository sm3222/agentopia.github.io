// GitHub API integration
async function fetchAgentopiaRepos() {
    try {
        const response = await fetch('https://api.github.com/orgs/Agentopia/repos');
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        displayError();
    }
}

function displayRepos(repos) {
    const reposContainer = document.getElementById('repos-container');
    if (!reposContainer) return;

    // Sort repos by stars (most starred first)
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

    reposContainer.innerHTML = repos.map(repo => `
        <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-amber-400/50 transition-colors duration-300">
            <a href="${repo.html_url}" target="_blank" class="block">
                <h3 class="text-xl font-bold text-amber-400 mb-3">${repo.name}</h3>
                <p class="text-gray-300 mb-4 line-clamp-2">${repo.description || 'No description available'}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-400">
                    <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        ${repo.stargazers_count}
                    </span>
                    <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        ${repo.forks_count}
                    </span>
                    <span class="text-xs">${new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
            </a>
        </div>
    `).join('');
}

function displayError() {
    const reposContainer = document.getElementById('repos-container');
    if (!reposContainer) return;

    reposContainer.innerHTML = `
        <div class="col-span-full text-center p-8">
            <div class="text-red-400 mb-2">Failed to load repositories</div>
            <p class="text-gray-400">Please try again later</p>
        </div>
    `;
}

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', fetchAgentopiaRepos);
