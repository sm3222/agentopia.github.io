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
      const paths = ["../js/agents-data.json", "/js/agents-data.json", "./js/agents-data.json"];
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
      try {
        // Try with absolute path as fallback
        const absoluteResponse = await fetch("/js/agents-data.json");
        if (!absoluteResponse.ok) {
          throw new Error(`Failed to fetch agent data: ${absoluteResponse.status} ${absoluteResponse.statusText}`);
        }
        const agent = await handleAgentDataResponse(absoluteResponse, agentName);
        if (agent) {
          populateAgentDetails(agent);
        }
      } catch (fallbackError) {
        console.error("Error fetching agent data with absolute path:", fallbackError);
        displayErrorMessage(fallbackError);
        throw fallbackError;
      }
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
          <div class="flex flex-wrap justify-center items-center gap-2 mb-3">
            <span class="${getTypeColor(agent.type)} px-3 py-1 rounded-full text-xs font-medium capitalize">${agent.type}</span>
            <span class="${getScaleColor(agent.scale)} px-3 py-1 rounded-full text-xs font-medium capitalize">${agent.scale}</span>
            ${agent.category ? `<span class="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-medium capitalize">${agent.category}</span>` : ""}
            ${agent.version ? `<span class="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 px-3 py-1 rounded-full text-xs font-medium">v${agent.version}</span>` : ""}
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
              agent.demoUrl && agent.demoUrl !== "#"
                ? `
            <a id="demo-link" href="${agent.demoUrl}" target="_blank" class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center text-sm">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Try Demo
            </a>`
                : ""
            }
            ${
              agent.sourceUrl && agent.sourceUrl !== "#"
                ? `
            <a id="source-link" href="${agent.sourceUrl}" target="_blank" class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center text-sm">
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

    // Features
    const featuresList = document.getElementById("agent-features");
    if (featuresList && agent.features && Array.isArray(agent.features) && agent.features.length > 0) {
      featuresList.innerHTML = agent.features
        .map((feature) => {
          const title = typeof feature === "string" ? feature : feature.title;
          const description = typeof feature === "string" ? "" : feature.description;
          return `
          <li class="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg shadow-sm">
            <h4 class="font-semibold text-gray-800 dark:text-gray-100">${renderMarkdown(title, true)}</h4>
            ${description ? `<div class="text-sm text-gray-600 dark:text-gray-400 mt-1">${renderMarkdown(description)}</div>` : ""}
          </li>
        `;
        })
        .join("");
    } else if (featuresList) {
      featuresList.innerHTML = '<li class="text-gray-500 dark:text-gray-400">No specific features listed.</li>';
    }

    // Setup Instructions
    const setupSection = document.getElementById("setup-section");
    if (setupSection) {
      let setupContent = "";
      if (agent.setup_instructions) {
        if (typeof agent.setup_instructions === "object" && agent.setup_instructions !== null) {
          if (agent.setup_instructions.docker) {
            setupContent +=
              "<h3>Docker Setup</h3>\n" + renderMarkdown(agent.setup_instructions.docker) + '\n<hr class="my-4">\n';
          }
          if (agent.setup_instructions.python) {
            setupContent += "<h3>Python Setup</h3>\n" + renderMarkdown(agent.setup_instructions.python);
          }
          if (
            Object.keys(agent.setup_instructions).length === 0 ||
            (!agent.setup_instructions.docker && !agent.setup_instructions.python && agent.setup_instructions.general)
          ) {
            setupContent = renderMarkdown(
              agent.setup_instructions.general || "No specific setup instructions provided.",
            );
          } else if (!agent.setup_instructions.docker && !agent.setup_instructions.python) {
            setupContent = renderMarkdown("No Docker or Python setup instructions provided.");
          }
        } else if (typeof agent.setup_instructions === "string") {
          setupContent = renderMarkdown(agent.setup_instructions);
        } else {
          setupContent = renderMarkdown("Setup instructions are in an unexpected format.");
        }
      } else if (agent.setupInstructions) {
        setupContent = renderMarkdown(agent.setupInstructions);
      } else {
        setupContent = renderMarkdown("No setup instructions provided.");
      }
      setupSection.innerHTML = setupContent;
    } else {
      console.warn("[Agent Details] Setup section element not found.");
    }

    // Use Cases, Requirements, Roadmap Features (Lists)
    populateList("agent-use-cases", agent.use_cases, "No use cases listed.");
    populateList("agent-requirements", agent.requirements, "No requirements listed.");
    populateList("agent-roadmap-features", agent.roadmap_features, "No roadmap features listed.");

    // LLM Dependency
    if (agent.llm_dependency) {
      setText("llm-type", agent.llm_dependency.type);
      setText(
        "llm-api-key-env-var",
        agent.llm_dependency.api_key_env_var ? `<code>${agent.llm_dependency.api_key_env_var}</code>` : null,
      );
      setText("llm-model-recommendation", agent.llm_dependency.model_recommendation);
      setText("llm-notes-content", agent.llm_dependency.notes, true);
    } else {
      setText("llm-type", "N/A");
      setText("llm-api-key-env-var", "N/A");
      setText("llm-model-recommendation", "N/A");
      setText("llm-notes-content", "No LLM dependency information provided.", true);
    }

    // Privacy Considerations
    setText("privacy-considerations-content", agent.privacy_considerations, true);

    // Docker Information
    if (agent.docker_info) {
      setText(
        "docker-image-name",
        agent.docker_info.image_name ? `<code>${agent.docker_info.image_name}</code>` : null,
      );
      setText("docker-pull-instructions-content", agent.docker_info.pull_instructions, true);
      setText("docker-run-instructions-content", agent.docker_info.run_instructions, true);
    } else {
      setText("docker-image-name", "N/A");
      setText("docker-pull-instructions-content", "No Docker pull instructions provided.", true);
      setText("docker-run-instructions-content", "No Docker run instructions provided.", true);
    }

    // Configuration Form
    const configForm = document.getElementById("config-form");
    if (configForm && agent.configFields && Array.isArray(agent.configFields) && agent.configFields.length > 0) {
      let savedConfig = {};
      try {
        const stored = localStorage.getItem(`agent-config-${agent.id}`);
        if (stored) {
          savedConfig = JSON.parse(stored);
        }
      } catch (storageError) {
        console.warn("Could not access localStorage:", storageError);
      }

      const formHtml = agent.configFields
        .map((field) => {
          const value = savedConfig[field.name] || field.default || "";
          let inputHtml = "";

          switch (field.type) {
            case "select":
              inputHtml = `
              <select id="${field.name}" name="${field.name}" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"${field.required ? " required" : ""}>
                ${field.options
                  .map(
                    (option) => `
                  <option value="${option}"${option === value ? " selected" : ""}>${option}</option>
                `,
                  )
                  .join("")}
              </select>
            `;
              break;

            case "password":
              inputHtml = `
              <input type="password" id="${field.name}" name="${field.name}" value="${value}" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"${field.required ? " required" : ""}>
            `;
              break;

            default: // text
              inputHtml = `
              <input type="text" id="${field.name}" name="${field.name}" value="${value}" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"${field.required ? " required" : ""}>
            `;
          }

          return `
          <div>
            <label for="${field.name}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">${field.label}</label>
            ${inputHtml}
          </div>
        `;
        })
        .join("");

      configForm.innerHTML = formHtml;

      // Add form submission handling
      configForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(configForm);
        const config = {};
        for (const [key, value] of formData.entries()) {
          config[key] = value;
        }

        try {
          localStorage.setItem(`agent-config-${agent.id}`, JSON.stringify(config));
          alert("Configuration saved successfully!");
        } catch (error) {
          console.error("Error saving configuration:", error);
          alert("Failed to save configuration. Please try again.");
        }
      };
    }

    // Use Cases
    if (Array.isArray(agent.use_cases)) {
      populateList(
        "agent-use-cases",
        agent.use_cases,
        '<svg class="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
      );
    } else {
      const el = document.getElementById("agent-use-cases");
      if (el)
        el.innerHTML =
          '<li><span class="text-gray-400 dark:text-gray-500">Use cases not available or in unexpected format.</span></li>';
    }

    // Requirements
    if (Array.isArray(agent.requirements)) {
      populateList(
        "agent-requirements",
        agent.requirements,
        '<svg class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      );
    } else {
      const el = document.getElementById("agent-requirements");
      if (el)
        el.innerHTML =
          '<li><span class="text-gray-400 dark:text-gray-500">Requirements not available or in unexpected format.</span></li>';
    }

    // Roadmap Features
    if (Array.isArray(agent.roadmap_features)) {
      populateList(
        "agent-roadmap-features",
        agent.roadmap_features,
        '<svg class="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13V7m0 13a1 1 0 001.447.894L15 20M9 7a1 1 0 011.447-.894L15 4m6 9v1.382a1 1 0 01-.553.894L15 18m-6-4l6-4"></path></svg>',
      );
    } else {
      const el = document.getElementById("agent-roadmap-features");
      if (el)
        el.innerHTML =
          '<li><span class="text-gray-400 dark:text-gray-500">Roadmap features not available or in unexpected format.</span></li>';
    }

    // LLM Dependency
    if (agent.llm_dependency) {
      setText("llm-type", agent.llm_dependency.type);
      setText(
        "llm-api-key-env-var",
        agent.llm_dependency.api_key_env_var ? `<code>${agent.llm_dependency.api_key_env_var}</code>` : null,
      );
      setText("llm-model-recommendation", agent.llm_dependency.model_recommendation);
      setText("llm-notes-content", agent.llm_dependency.notes, true);
    } else {
      setText("llm-type", null);
      setText("llm-api-key-env-var", null);
      setText("llm-model-recommendation", null);
      setText("llm-notes-content", '<p class="text-gray-400 dark:text-gray-500">No LLM dependency specified.</p>');
    }

    // Privacy Considerations
    setText("privacy-considerations-content", agent.privacy_considerations, true);

    // Docker Information
    if (agent.docker_info) {
      setText(
        "docker-image-name",
        agent.docker_info.image_name ? `<code>${agent.docker_info.image_name}</code>` : null,
      );
      setText("docker-pull-instructions-content", agent.docker_info.pull_instructions, true);
      setText("docker-run-instructions-content", agent.docker_info.run_instructions, true);
    } else {
      setText("docker-image-name", null);
      setText(
        "docker-pull-instructions-content",
        '<p class="text-gray-400 dark:text-gray-500">No Docker pull instructions provided.</p>',
      );
      setText(
        "docker-run-instructions-content",
        '<p class="text-gray-400 dark:text-gray-500">No Docker run instructions provided.</p>',
      );
    }

    /* 
    // Demo and Source Links (This block is now handled by the hero template literal)
    console.log(`[Agent Details] Populating for agent: ${agent.name}`);
    console.log(`[Agent Details] From agent object -- demoUrl (camel): ${agent.demoUrl}, sourceUrl (camel): ${agent.sourceUrl}`);
    console.log(`[Agent Details] From agent object -- demo_url (snake): ${agent.demo_url}, source_url (snake): ${agent.source_url}`);

    const demoLink = document.getElementById('demo-link');
    console.log('[Agent Details] demoLink element:', demoLink);
    const sourceLink = document.getElementById('source-link');
    console.log('[Agent Details] sourceLink element:', sourceLink);
    
    if (demoLink) {
      if (agent.demoUrl) {
        demoLink.href = agent.demoUrl;
        demoLink.style.display = 'inline-flex';
        console.log('[Agent Details] Demo link SHOULD be visible.');
        console.log('[Agent Details] demoLink.style.display AFTER set:', demoLink.style.display);
      } else {
        demoLink.style.display = 'none';
        console.log('[Agent Details] Demo link explicitly hidden.');
        console.log('[Agent Details] demoLink.style.display AFTER set to none:', demoLink.style.display);
      }
    }
    
    if (sourceLink) {
      if (agent.sourceUrl) {
        sourceLink.href = agent.sourceUrl;
        sourceLink.style.display = 'inline-flex';
        console.log('[Agent Details] Source link SHOULD be visible.');
        console.log('[Agent Details] sourceLink.style.display AFTER set:', sourceLink.style.display);
      } else {
        sourceLink.style.display = 'none';
        console.log('[Agent Details] Source link explicitly hidden.');
        console.log('[Agent Details] sourceLink.style.display AFTER set to none:', sourceLink.style.display);
      }
    }
    */
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
