// sync-agents.js
//
// --- Agentopia Portal Agent Sync Script ---
//
// This script synchronizes agent metadata from your local AIAgentopia repo into the portal's js/agents-data.json file.
//
// USAGE:
//   1. Make sure your AIAgentopia repo is cloned at the same directory level as this portal repo.
//      (../AIAgentopia/agents should exist relative to this script)
//   2. Run this script from the root of your portal repo (agentopia.github.io):
//        Windows:
//            node js/sync-agents.js
//        Mac/Linux:
//            node js/sync-agents.js
//   3. After running, check js/agents-data.json for updated agent data.
//
// WHAT IT DOES:
//   - Reads all agent manifests (agent.json) from AIAgentopia/agents/*
//   - Merges them with any manual agents already in js/agents-data.json
//   - Writes the combined list back to js/agents-data.json
//
// NOTE:
//   - If you add or update agents in AIAgentopia, re-run this script to sync changes!
//   - If you move this script, update the AGENTS_DIR and OUTPUT_JSON paths below.
//

const fs = require("fs");
const path = require("path");

// Path to AIAgentopia repo's agents directory (adjust if needed)
const AGENTS_DIR = path.resolve(__dirname, "../../AIAgentopia/agents");
// Output path for agents-data.json in portal repo
const OUTPUT_JSON = path.resolve(__dirname, "../js/agents-data.json");

function getAgentManifests(agentsDir) {
  const agents = [];
  if (!fs.existsSync(agentsDir)) {
    console.error("Agents directory not found:", agentsDir);
    return agents;
  }
  const agentFolders = fs.readdirSync(agentsDir).filter((f) => fs.statSync(path.join(agentsDir, f)).isDirectory());
  agentFolders.forEach((folder, idx) => {
    const manifestPath = path.join(agentsDir, folder, "agent.json");
    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
        // Map manifest fields to portal format
        agents.push({
          id: idx + 1, // This ID might get overridden if a manual entry with same name exists
          name: manifest.name || folder,
          emoji: manifest.emoji || "🤖", // Added emoji
          version: manifest.version || "0.1.0", // Added version
          author: manifest.author || "Agentopia Team", // Added author
          category: manifest.category || "Uncategorized",
          type: manifest.type || "regular",
          scale: manifest.scale || "single",
          description: manifest.description || "",
          // setupInstructions is handled below to prioritize structured 'setup_instructions'
          configFields: manifest.configFields || [], // Added configFields
          features: manifest.features || ["Demo Agent"],
          tags: manifest.tags || ["demo"],
          demoUrl: manifest.demoUrl || "#", // Added demoUrl
          sourceUrl: manifest.sourceUrl || "#", // Added sourceUrl
          // Default rating and reviews, can be overridden by manual entries if needed
          rating: manifest.rating !== undefined ? manifest.rating : 5.0,
          reviews: manifest.reviews !== undefined ? manifest.reviews : 0,
          // New fields from comprehensive schema (preserving snake_case from source manifest)
          long_description: manifest.long_description || manifest.description || "",
          entry_point: manifest.entry_point || null,
          deployment_status: manifest.deployment_status || "N/A",
          use_cases: manifest.use_cases || [],
          requirements: manifest.requirements || [],
          roadmap_features: manifest.roadmap_features || [],
          llm_dependency: manifest.llm_dependency || null,
          privacy_considerations: manifest.privacy_considerations || "",
          docker_info: manifest.docker_info || null,
          // Ensure setup_instructions (if structured) is carried over correctly
          // The agent-detail.js expects 'setupInstructions' (camelCase) if it's a simple string from older manifests
          // or a structured object (which might be snake_case 'setup_instructions' in source manifest)
          // For now, let's assume source manifest uses 'setup_instructions' for the structured object
          setup_instructions: manifest.setup_instructions || manifest.setupInstructions || "", // Prioritize structured, fallback to simple
        });
      } catch (e) {
        console.warn("Could not parse", manifestPath, e);
      }
    }
  });
  return agents;
}

function main() {
  // Read existing agents-data.json (manual entries)
  let existingAgents = [];
  if (fs.existsSync(OUTPUT_JSON)) {
    try {
      existingAgents = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf-8"));
    } catch (e) {
      console.warn("Could not parse existing agents-data.json:", e);
    }
  }
  // Get real agents from AIAgentopia
  const realAgents = getAgentManifests(AGENTS_DIR);
  // Merge: replace manual entry if name matches, otherwise keep manual
  const merged = [...realAgents];
  existingAgents.forEach((manualAgent) => {
    if (!realAgents.find((a) => a.name === manualAgent.name)) {
      merged.push(manualAgent);
    }
  });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(merged, null, 4));
  console.log(
    `Merged ${realAgents.length} real agents with ${existingAgents.length} manual agents. Wrote ${merged.length} agents to`,
    OUTPUT_JSON,
  );
}

main();
