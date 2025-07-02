// agent-detail.js
// Loads agent details from agents-data.json based on ?name= query param

/**
 * Get a query parameter from the URL
 * @param {string} param - The parameter name to get
 * @returns {string|null} The parameter value or null
 */
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Render markdown text to HTML
 * @param {string} text - The markdown text to render
 * @returns {string} The HTML rendered from markdown
 */
function renderMarkdown(text) {
  if (!text) return "";

  // Process code blocks first
  text = text.replace(/```([\s\S]*?)```/g, function (match, code) {
    return `<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-3"><code class="text-primary-600 dark:text-primary-400">${code.trim()}</code></pre>`;
  });

  // Process headers
  text = text.replace(
    /^### (.*$)/gm,
    '<h3 class="text-lg font-bold mt-4 mb-2 text-gray-800 dark:text-gray-200">$1</h3>',
  );
  text = text.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-5 mb-3 text-gray-900 dark:text-white">$1</h2>');
  text = text.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4 text-gray-900 dark:text-white">$1</h1>');

  // Process lists
  // First, identify list blocks and wrap them
  let inList = false;
  let listType = null;
  let listItems = [];

  const lines = text.split("\n");
  const processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isOrderedListItem = /^\d+\. (.*)$/.test(line);
    const isUnorderedListItem = /^\* (.*)$/.test(line);

    if (isOrderedListItem || isUnorderedListItem) {
      if (!inList) {
        inList = true;
        listType = isOrderedListItem ? "ol" : "ul";
        listItems = [];
      }

      // Extract the content of the list item
      const content = line.replace(/^\d+\. (.*)$/, "$1").replace(/^\* (.*)$/, "$1");
      listItems.push(content);
    } else {
      if (inList) {
        // End of a list, process the accumulated items
        const listClass = listType === "ol" ? "list-decimal" : "list-disc";
        let listHtml = `<${listType} class="${listClass} pl-5 my-3 space-y-1">`;

        listItems.forEach((item) => {
          listHtml += `<li class="ml-2">${item}</li>`;
        });

        listHtml += `</${listType}>`;
        processedLines.push(listHtml);

        inList = false;
        listItems = [];
      }

      processedLines.push(line);
    }
  }

  // Handle case where the list is at the end of the text
  if (inList) {
    const listClass = listType === "ol" ? "list-decimal" : "list-disc";
    let listHtml = `<${listType} class="${listClass} pl-5 my-3 space-y-1">`;

    listItems.forEach((item) => {
      listHtml += `<li class="ml-2">${item}</li>`;
    });

    listHtml += `</${listType}>`;
    processedLines.push(listHtml);
  }

  text = processedLines.join("\n");

  // Process inline formatting
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  text = text.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" class="text-primary-600 dark:text-primary-400 hover:underline" target="_blank">$1</a>',
  );

  // Process line breaks
  text = text.replace(/\n\n/g, '<p class="my-3"></p>');
  text = text.replace(/\n/g, "<br>");

  return text;
}

/**
 * Get the color class for an agent type
 * @param {string} type - The agent type
 * @returns {string} - The color class
 */
function getTypeColor(type) {
  if (!type) return "";

  switch (type.toLowerCase()) {
    case "assistant":
      return "text-blue-600 dark:text-blue-400";
    case "autonomous":
      return "text-purple-600 dark:text-purple-400";
    case "hybrid":
      return "text-indigo-600 dark:text-indigo-400";
    case "regular":
      return "text-teal-600 dark:text-teal-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}

/**
 * Get the color class for an agent scale
 * @param {string} scale - The agent scale
 * @returns {string} - The color class
 */
function getScaleColor(scale) {
  if (!scale) return "";

  switch (scale.toLowerCase()) {
    case "simple":
      return "text-green-600 dark:text-green-400";
    case "intermediate":
      return "text-yellow-600 dark:text-yellow-400";
    case "advanced":
      return "text-orange-600 dark:text-orange-400";
    case "complex":
      return "text-red-600 dark:text-red-400";
    case "single":
      return "text-green-600 dark:text-green-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}

// Helper function to create a generic attribute badge
function createAttributeBadge(text, baseClasses, iconSvg = '') {
  const badge = document.createElement('span');
  badge.className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${baseClasses} mr-2 mb-2`;
  let iconHtml = '';
  if (iconSvg) {
    iconHtml = `<svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">${iconSvg}</svg>`;
  }
  badge.innerHTML = `${iconHtml}${text}`;
  return badge;
}

// Helper function to populate a list of items as badges
function populateBadgesList(containerElement, itemsArray, badgeBaseClasses, emptyMessageElement, itemIconSvg = '') {
  containerElement.innerHTML = ''; // Clear existing badges
  if (itemsArray && itemsArray.length > 0) {
    itemsArray.forEach(item => {
      const badge = createAttributeBadge(item, badgeBaseClasses, itemIconSvg);
      containerElement.appendChild(badge);
    });
    if (emptyMessageElement) emptyMessageElement.classList.add('hidden');
  } else {
    if (emptyMessageElement) emptyMessageElement.classList.remove('hidden');
  }
}

/**
 * Generate star rating HTML
 * @param {number} rating - The rating value (0-5)
 * @returns {string} HTML for star rating
 */
function generateStarRating(rating) {
  let html = '<div class="flex items-center">';

  // Full stars
  for (let i = 0; i < Math.floor(rating); i++) {
    html +=
      '<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
  }

  // Half star
  if (rating % 1 >= 0.5) {
    html +=
      '<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
  }

  // Empty stars
  for (let i = Math.ceil(rating); i < 5; i++) {
    html +=
      '<svg class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
  }

  html += "</div>";
  return html;
}

/**
 * Format number with suffix
 * @param {number} num - The number to format
 * @returns {string} Formatted number with suffix
 */
function formatNumber(num) {
  if (num === 0) return "0";
  if (num === 1) return "1 review";
  if (num < 1000) return `${num} reviews`;
  if (num < 1000000) return `${(num / 1000).toFixed(1)}k reviews`;
  return `${(num / 1000000).toFixed(1)}M reviews`;
}

/**
 * Load saved configuration from localStorage
 * @param {string} agentId - The ID of the agent
 * @param {Array} configFields - The configuration fields
 */
function loadSavedConfig(agentId, configFields) {
  try {
    let savedConfig = {};
    try {
      const stored = localStorage.getItem(`agent-config-${agentId}`);
      if (stored) {
        savedConfig = JSON.parse(stored);
      }
    } catch (storageError) {
      console.warn("Could not access localStorage:", storageError);
    }

    // Populate form fields with saved data
    configFields.forEach((field) => {
      const input = document.getElementById(`field-${field.name}`);
      if (input && savedConfig[field.name] !== undefined) {
        input.value = savedConfig[field.name];
      }
    });
  } catch (error) {
    console.error("Error loading saved config:", error);
  }
}

/**
 * Load agent data and populate the UI
 */
async function loadAgentData() {
  console.log("loadAgentData started - " + new Date().toISOString());
  console.log("Current URL:", window.location.href);
  console.log("Document base URL:", document.baseURI);
  // Show loading state
  document.getElementById("agent-hero").innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-16 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
      <p class="text-white text-xl">Loading agent data...</p>
    </div>
  `;
  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    mainContent.classList.remove("loaded");
    mainContent.classList.add("loading");
  }

  try {
    // Get agent name from URL parameter
    const agentName = getQueryParam("name");
    if (!agentName) {
      // Show error in hero section
      document.getElementById("agent-hero").innerHTML =
        '<div class="max-w-7xl mx-auto px-4 py-16 text-center"><p class="text-white text-xl mb-6">No agent specified.</p>' +
        '<a href="../agents.html" class="px-5 py-2.5 bg-white hover:bg-gray-100 text-primary-700 font-medium rounded-lg transition-all duration-300 inline-flex items-center shadow-md">' +
        '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>' +
        "Back to Agents</a></div>";

      // Hide main content
      document.getElementById("main-content").classList.remove("loaded");
      document.getElementById("main-content").classList.add("loading");
      return;
    }

    // Set page title
    document.title = `${agentName} | Agentopia`;

    // Fetch agent data
    console.log("Fetching agent data for:", agentName);
    try {
      // Try with relative path first
      const paths = ["/public/data/agents-data.json"]; // Use root-relative path
      let response;
      let error;

      for (const path of paths) {
        try {
          console.log("Attempting to fetch from:", path);
          response = await fetch(path);
          if (response.ok) {
            console.log("Successfully fetched from:", path);
            break;
          }
        } catch (e) {
          console.warn(`Failed to fetch from ${path}:`, e);
          error = e;
        }
      }

      if (!response?.ok) {
        throw error || new Error("Failed to fetch agent data from any path");
      }
      const agent = await handleAgentDataResponse(response, agentName);
      if (agent) {
        populateAgentDetails(agent);
      }
    } catch (error) {
      console.error("Error fetching agent data with relative path:", error);
      // Fallback logic removed as we are now confident in the primary path or expect it to fail clearly.
    }
  } catch (error) {
    console.error("Error loading agent data:", error);
    displayErrorMessage(error);
  }
}

/**
 * Handle the agent data response
 * @param {Response} response - The fetch response
 * @param {string} agentName - The name of the agent to find
 * @returns {Promise<void>}
 */
async function handleAgentDataResponse(response, agentName) {
  console.log("Handling agent data response");
  const agents = await response.json();
  console.log("Loaded agents:", agents.length);
  allAgents = agents;
  const agent = agents.find((a) => a.name === agentName);
  console.log("Found agent:", agent ? "yes" : "no");
  if (!agent) {
    const error = new Error(`Agent "${agentName}" not found.`);
    displayErrorMessage(error);
    return null;
  }

  // Update navigation state
  currentAgentIndex = allAgents.findIndex((a) => a.name === agentName);
  updateBreadcrumb(agentName);
  updateNavigation();

  return agent;
}

/**
 * Populate the agent details in the UI
 * @param {Object} agent - The agent data
 */
function setupRunLocallyModal(agent) {
  const runButton = document.getElementById('run-locally-button');
  const modal = document.getElementById('docker-run-modal');
  const closeModalButton = document.getElementById('close-modal-button');
  const closeModalButtonBottom = document.getElementById('modal-close-button-bottom');
  const commandTextElement = document.getElementById('docker-command-text');
  const copyButton = document.getElementById('copy-command-button');

  if (!runButton || !modal || !agent.docker_run_instructions) {
    if (runButton) runButton.style.display = 'none';
    return;
  }

  // Use a more robust regex to find the first code block, handling optional language and whitespace.
  const commandRegex = /```(?:bash)?\s*([\s\S]*?)```/;
  const match = agent.docker_run_instructions.match(commandRegex);
  const commandText = match ? match[1].trim() : "Could not extract command.";

  const openModal = () => {
    commandTextElement.textContent = commandText;
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.remove('opacity-0'), 10); // For transition
  };

  const closeModal = () => {
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
  };

  runButton.addEventListener('click', openModal);
  closeModalButton.addEventListener('click', closeModal);
  closeModalButtonBottom.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  copyButton.addEventListener('click', () => {
    // Fix: Use the correct variable 'commandText'
    navigator.clipboard.writeText(commandText).then(() => {
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy command: ', err);
    });
  });
}

function populateAgentDetails(agent) {
  try {
    // Basic Agent Info
    document.getElementById("agent-hero").innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center py-16">
          <div class="mb-4 flex justify-center items-center space-x-4">
            <span class="text-4xl">${agent.emoji || "🤖"}</span>
            <h1 class="text-3xl font-bold text-white">${agent.name}</h1>
          </div>
          <div id="agent-attributes-badges" class="flex flex-wrap justify-center items-center gap-2 mb-3">
            <!-- Badges were moved to Key Details section -->
          </div>
          ${
            agent.tags && agent.tags.length > 0
              ? `
          <div class="flex flex-wrap justify-center items-center gap-2 mb-6">
            ${agent.tags.map((tag) => `<span class="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-md text-xs font-medium">#${tag}</span>`).join("")}
          </div>`
              : ""
          }
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">${agent.description}</p>
          <div class="mt-6 flex justify-center items-center space-x-4">
            ${generateStarRating(agent.rating)}
            <span class="text-gray-400">${formatNumber(agent.reviews)} reviews</span>
          </div>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            ${
              agent.docker_run_instructions
                ? `
            <button id="run-locally-button" 
              class="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center text-sm">
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              Run Locally
            </button>`
                : ""
            }
            ${
              agent.sourceUrl && agent.sourceUrl !== "#"
                ? `
            <a id="agent-source-link" href="${agent.sourceUrl}" target="_blank" class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center text-sm">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              View Source
            </a>`
                : ""
            }
          </div>
        </div>
      </div>
    `;

    // Show main content with fade-in animation
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.classList.remove("loading");
      mainContent.classList.add("loaded");
    }



    // Helper to set text or rendered markdown, handling N/A cases
    const setText = (id, text, isMarkdown = false) => {
      const el = document.getElementById(id);
      if (el) {
        if (text !== undefined && text !== null && text.toString().trim() !== "") {
          el.innerHTML = isMarkdown ? renderMarkdown(text) : text;
        } else {
          el.innerHTML = '<span class="text-gray-400 dark:text-gray-500">N/A</span>';
        }
      } else {
        // console.warn(`[Agent Details] Element with ID '${id}' not found for setText.`);
      }
    };

    // Helper to populate a <ul> with list items, rendering markdown for each
    const populateList = (ulId, items, emptyMessage) => {
      const ul = document.getElementById(ulId);
      if (ul) {
        if (items && Array.isArray(items) && items.length > 0) {
          ul.innerHTML = items
            .map((item) => {
              const markdownContent = typeof item === "string" ? renderMarkdown(item) : item || "N/A";
              return `
              <li class="flex items-start space-x-3">
                <svg class="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span class="text-gray-700 dark:text-gray-300">${markdownContent}</span>
              </li>
            `;
            })
            .join("");
        } else {
          ul.innerHTML = `<li class="text-gray-500 dark:text-gray-400">${emptyMessage}</li>`;
        }
      }
    };

    // Populate Long Description
    const longDescriptionEl = document.getElementById("agent-long-description");
    if (longDescriptionEl) {
      if (agent.long_description) {
        longDescriptionEl.innerHTML = renderMarkdown(agent.long_description);
      } else {
        longDescriptionEl.innerHTML =
          '<p class="text-gray-500 dark:text-gray-400">No detailed description available.</p>';
      }
    }

    // Populate Key Details Section
    setText("detail-agent-author", agent.author);
    setText("detail-agent-version", agent.version ? `${agent.version}` : null);
    setText("detail-agent-deployment-status", agent.deployment_status);
    setText("detail-agent-type", agent.type);
    setText("detail-agent-scale", agent.scale);
    setText("detail-agent-entry-point", agent.entry_point ? `<code>${agent.entry_point}</code>` : null);

    // Populate Roadmap Features
    const roadmapUl = document.getElementById("roadmap-features-list");
    const roadmapEmpty = document.getElementById("roadmap-features-empty");
    populateList("roadmap-features-list", agent.roadmap_features || [], "No roadmap features listed yet.");
    if (agent.roadmap_features && agent.roadmap_features.length > 0) {
      if(roadmapEmpty) roadmapEmpty.classList.add("hidden");
    } else {
      if(roadmapEmpty) roadmapEmpty.classList.remove("hidden");
    }

    // Populate Technical Details
    const devFrameworksContainer = document.getElementById('development-frameworks-list');
    const devFrameworksEmpty = document.getElementById('development-frameworks-empty');
    if (devFrameworksContainer) populateBadgesList(devFrameworksContainer, agent.developmentFrameworks, 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600', devFrameworksEmpty);

    const intendedAudienceContainer = document.getElementById('intended-audience-list');
    const intendedAudienceEmpty = document.getElementById('intended-audience-empty');
    if (intendedAudienceContainer) populateBadgesList(intendedAudienceContainer, agent.intendedAudience, 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700', intendedAudienceEmpty);

    const dataModalitiesContainer = document.getElementById('data-modalities-list');
    const dataModalitiesEmpty = document.getElementById('data-modalities-empty');
    if (dataModalitiesContainer) populateBadgesList(dataModalitiesContainer, agent.dataModalities, 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-700', dataModalitiesEmpty);

    const integrationTypeElement = document.getElementById('integration-type-text');
    const integrationTypeEmpty = document.getElementById('integration-type-empty');
    if (integrationTypeElement) {
      if (agent.integrationType) {
        integrationTypeElement.textContent = agent.integrationType;
        if (integrationTypeEmpty) integrationTypeEmpty.classList.add('hidden');
        integrationTypeElement.classList.remove('hidden');
      } else {
        integrationTypeElement.classList.add('hidden');
        if (integrationTypeEmpty) integrationTypeEmpty.classList.remove('hidden');
      }
    }

    const demoLink = document.getElementById("demo-link");
    const agentSourceLink = document.getElementById("agent-source-link"); // New ID for the source code button in hero

    if (demoLink) {
      if (agent.demoUrl) {
        demoLink.href = agent.demoUrl;
        demoLink.style.display = 'inline-flex';
      } else {
        demoLink.style.display = 'none';
      }
    }

    if (agentSourceLink) {
      if (agent.sourceUrl) {
        agentSourceLink.href = agent.sourceUrl;
        agentSourceLink.style.display = 'inline-flex';
      } else {
        agentSourceLink.style.display = 'none';
      }
    }

    // Keep the old sourceLink logic for the main content button if it's still used elsewhere, or remove if fully deprecated.
    // For now, assuming the hero 'agent-source-link' is the primary one for source code.
    const oldSourceLink = document.getElementById("source-link"); 
    if (oldSourceLink) {
        if (agent.sourceUrl) { // Or a different field if this button serves another purpose
            oldSourceLink.href = agent.sourceUrl;
            oldSourceLink.style.display = 'inline-flex'; 
        } else {
            oldSourceLink.style.display = 'none';
        }
    }

    // --- Additions for Missing Sections ---

    // Key Details (Author)
    setText('detail-agent-author', agent.author);

    // Features Tab
    populateList('agent-features', agent.features, 'No features listed.');

    // Setup Tab
    setText('setup-section', agent.setup_instructions, true);

    // Configuration Tab (Placeholder - generateConfigForm call and definition are missing)
    const configFormContainer = document.getElementById('config-form');
    if (configFormContainer) {
      if (typeof generateConfigForm === 'function') {
        generateConfigForm(agent.configFields || [], 'config-form');
      } else {
        // console.warn('[Agent Details] generateConfigForm function not found or not implemented yet.');
        setText('config-form', '<p class="text-gray-500 dark:text-gray-400">Configuration form is not available at this time.</p>');
      }
    }

    // Use Cases Tab
    populateList('agent-use-cases', agent.use_cases, 'No use cases listed.');

    // Requirements Tab
    populateList('agent-requirements', agent.requirements, 'No requirements listed.');

    // More Info Tab - LLM Dependency
    if (agent.llm_dependency) {
        setText('llm-dependency-type', agent.llm_dependency.type);
        setText('llm-dependency-api-key-env', agent.llm_dependency.apiKeyEnvVar);
        setText('llm-dependency-endpoint-env', agent.llm_dependency.apiEndpointEnvVar);
        setText('llm-dependency-model', agent.llm_dependency.modelRecommendation);
        setText('llm-dependency-notes', agent.llm_dependency.notes, true);
    } else {
        setText('llm-dependency-type', 'N/A');
        setText('llm-dependency-api-key-env', 'N/A');
        setText('llm-dependency-endpoint-env', 'N/A');
        setText('llm-dependency-model', 'N/A');
        setText('llm-dependency-notes', 'No specific LLM dependency information provided.');
    }

    // More Info Tab - Privacy Considerations
    setText('privacy-considerations', agent.privacy_considerations, true);

    // More Info Tab - Docker Information
    setText('docker-image-name', agent.docker_image_name);
    setText('docker-pull-instructions', agent.docker_pull_instructions, true);
    setText('docker-run-instructions', agent.docker_run_instructions, true);

    // Setup the "Run Locally" modal
    setupRunLocallyModal(agent);
    // --- End of Additions ---

  } catch (error) {
    console.error("Error populating agent details:", error);
    displayErrorMessage(error);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadAgentData();
});

/**
 * Display an error message in the hero section
 * @param {Error} error - The error that occurred
 */
function displayErrorMessage(error) {
  console.error("Error loading agent data:", error);
  // Show error in hero section
  document.getElementById("agent-hero").innerHTML =
    `<div class="max-w-7xl mx-auto px-4 py-16 text-center"><p class="text-white text-xl mb-6">Error loading agent data: ${error.message}</p>` +
    '<a href="../agents.html" class="px-5 py-2.5 bg-white hover:bg-gray-100 text-primary-700 font-medium rounded-lg transition-all duration-300 inline-flex items-center shadow-md">' +
    '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>' +
    "Back to Agents</a></div>";

  // Hide main content
  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    mainContent.classList.remove("loaded");
    mainContent.classList.add("loading");
  }
}

// Global variable to store all agents data
let allAgents = [];
let currentAgentIndex = -1;

/**
 * Update breadcrumb with current agent name
 * @param {string} agentName - The name of the current agent
 */
function updateBreadcrumb(agentName) {
  const breadcrumbName = document.getElementById("breadcrumb-agent-name");
  if (breadcrumbName) {
    breadcrumbName.textContent = agentName;
  }
}

/**
 * Update previous/next navigation buttons
 */
function updateNavigation() {
  const prevButton = document.getElementById("prev-agent");
  const nextButton = document.getElementById("next-agent");

  if (currentAgentIndex > 0) {
    prevButton.removeAttribute("disabled");
    prevButton.onclick = () => navigateToAgent(currentAgentIndex - 1);
  } else {
    prevButton.setAttribute("disabled", "true");
    prevButton.onclick = null;
  }

  if (currentAgentIndex < allAgents.length - 1) {
    nextButton.removeAttribute("disabled");
    nextButton.onclick = () => navigateToAgent(currentAgentIndex + 1);
  } else {
    nextButton.setAttribute("disabled", "true");
    nextButton.onclick = null;
  }
}

/**
 * Navigate to a specific agent
 * @param {number} index - The index of the agent to navigate to
 */
function navigateToAgent(index) {
  if (index >= 0 && index < allAgents.length) {
    const agent = allAgents[index];
    const url = new URL(window.location.href);
    url.searchParams.set("name", agent.name);
    window.history.pushState({}, "", url);
    loadAgentData();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");
  loadAgentData();
});
