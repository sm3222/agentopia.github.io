// agent-detail.js
// Loads agent details from agents-data.json based on ?name= query param

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function renderMarkdown(text) {
  // Simple markdown renderer for demonstration (bold, italics, links, lists)
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-amber-600 underline" target="_blank">$1</a>')
    .replace(/\n/g, '<br>');
}

async function loadAgentData() {
  const agentName = getQueryParam('name');
  if (!agentName) {
    document.getElementById('agent-detail').innerHTML = '<p class="text-red-600">No agent specified.</p>';
    return;
  }
  const response = await fetch('../js/agents-data.json');
  const agents = await response.json();
  const agent = agents.find(a => a.name === agentName);
  if (!agent) {
    document.getElementById('agent-detail').innerHTML = `<p class="text-red-600">Agent ${agentName} not found.</p>`;
    return;
  }
  // Populate UI
  document.getElementById('agent-name').textContent = agent.name;
  document.getElementById('agent-category').textContent = agent.category || '';
  document.getElementById('agent-description').textContent = agent.description || '';
  // Icon
  if (agent.icon) {
    const iconEl = document.getElementById('agent-icon');
    iconEl.src = agent.icon;
    iconEl.style.display = '';
  }
  // Tags
  const tagsEl = document.getElementById('agent-tags');
  tagsEl.innerHTML = '';
  if (agent.tags) {
    agent.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium';
      span.textContent = tag;
      tagsEl.appendChild(span);
    });
  }
  // Features
  const featuresEl = document.getElementById('agent-features');
  featuresEl.innerHTML = '';
  if (agent.features) {
    agent.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      featuresEl.appendChild(li);
    });
  }
  // Setup Instructions
  const setupEl = document.getElementById('setup-section');
  if (agent.setup_instructions) {
    setupEl.innerHTML = `<h2 class="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">Setup Instructions</h2><div class="prose dark:prose-invert">${renderMarkdown(agent.setup_instructions)}</div>`;
  }
  // Config Fields
  const configForm = document.getElementById('config-form');
  configForm.innerHTML = '';
  if (agent.config_fields && agent.config_fields.length) {
    configForm.innerHTML = '<h2 class="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">Configuration</h2>';
    agent.config_fields.forEach(field => {
      const label = document.createElement('label');
      label.textContent = field.label || field.name;
      label.className = 'block text-sm font-medium text-gray-700 dark:text-gray-200 mt-2';
      const input = document.createElement('input');
      input.type = field.type || 'text';
      input.name = field.name;
      input.required = !!field.required;
      input.className = 'mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100';
      configForm.appendChild(label);
      configForm.appendChild(input);
    });
    // Optionally: add a Save button or handle persistence
  }
  // Demo/Source Links
  if (agent.demo_url) {
    const demoLink = document.getElementById('demo-link');
    demoLink.href = agent.demo_url;
    demoLink.style.display = '';
    demoLink.classList.remove('hidden');
  }
  if (agent.source_url) {
    const srcLink = document.getElementById('source-link');
    srcLink.href = agent.source_url;
    srcLink.style.display = '';
    srcLink.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', loadAgentData);
