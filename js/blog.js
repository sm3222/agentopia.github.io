// Blog post metadata and search functionality
let blogPosts = [];
let activeFilters = new Set(['All']);

// Fetch blog post metadata
async function fetchBlogPosts() {
    try {
        const response = await fetch('/blog/posts/metadata.json');
        const data = await response.json();
        blogPosts = data.posts;
        return blogPosts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

// Search functionality
function searchPosts(query) {
    const filtered = blogPosts.filter(post => {
        const searchString = `${post.title} ${post.description} ${post.categories.join(' ')}`.toLowerCase();
        return searchString.includes(query.toLowerCase());
    });
    return filtered;
}

// Filter posts by category
function filterPosts(category) {
    if (category === 'All') {
        return blogPosts;
    }
    return blogPosts.filter(post => post.categories.includes(category));
}

// Render blog post card
function renderPostCard(post) {
    return `
        <article class="blog-card bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-amber-400/50 transition-colors duration-300">
            <div class="flex gap-2 mb-4">
                ${post.categories.map(category => `<span class="blog-category">${category}</span>`).join('')}
            </div>
            <h2 class="text-2xl font-bold mb-4 hover:text-amber-400">${post.title}</h2>
            <p class="text-gray-400 mb-4">${post.description}</p>
            <div class="flex items-center gap-4 text-sm text-gray-500">
                <span>${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span class="read-time">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    ${post.readTime} min read
                </span>
                <a href="${post.url}" class="text-amber-400 hover:text-amber-300">Read More →</a>
            </div>
        </article>
    `;
}

// Update blog post grid
function updateBlogGrid(posts) {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    // Filter out featured posts from the regular grid
    const regularPosts = posts.filter(post => !post.featured);
    
    // Sort posts by date (newest first)
    const sortedPosts = regularPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Render posts
    blogGrid.innerHTML = sortedPosts.map(renderPostCard).join('');

    // Update featured post if it exists
    const featuredPost = posts.find(post => post.featured);
    const featuredSection = document.querySelector('.featured-post');
    
    if (featuredPost && featuredSection) {
        featuredSection.innerHTML = `
            <div class="max-w-4xl mx-auto mb-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-amber-400/50 transition-colors duration-300">
                <div class="flex gap-2 mb-4">
                    ${featuredPost.categories.map(category => `<span class="blog-category">${category}</span>`).join('')}
                </div>
                <h2 class="text-3xl font-bold mb-4 hover:text-amber-400">${featuredPost.title}</h2>
                <p class="text-gray-400 mb-4">${featuredPost.description}</p>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                    <span>${new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span class="read-time">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        ${featuredPost.readTime} min read
                    </span>
                    <a href="${featuredPost.url}" class="text-amber-400 hover:text-amber-300">Read More →</a>
                </div>
            </div>
        `;
        featuredSection.style.display = 'block';
    } else if (featuredSection) {
        featuredSection.style.display = 'none';
    }
}

// Initialize blog functionality
async function initBlog() {
    await fetchBlogPosts();

    // Set up search
    const searchInput = document.querySelector('.blog-search');
    const searchButton = document.querySelector('#search-button');
    
    if (searchInput && searchButton) {
        // Handle search input
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            const filteredPosts = searchPosts(query);
            updateBlogGrid(filteredPosts);
        });

        // Handle search button click
        searchButton.addEventListener('click', () => {
            const query = searchInput.value;
            const filteredPosts = searchPosts(query);
            updateBlogGrid(filteredPosts);
        });

        // Handle enter key in search input
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                const filteredPosts = searchPosts(query);
                updateBlogGrid(filteredPosts);
            }
        });
    }

    // Set up category filters
    const categoryButtons = document.querySelectorAll('.category-filter');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update active filters
            const category = button.textContent.trim();
            activeFilters.clear();
            activeFilters.add(category);

            // Filter posts
            const filteredPosts = filterPosts(category);
            updateBlogGrid(filteredPosts);
        });
    });

    // Initial render
    updateBlogGrid(blogPosts);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initBlog);
