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
const OUTPUT_JSON = path.resolve(__dirname, "../public/data/agents-data.json");

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
          // Prioritize icon, then emoji
          icon: manifest.icon || manifest.emoji || "🤖", 
          emoji: manifest.emoji || manifest.icon || "🤖", // Keep emoji for compatibility if icon not present
          version: manifest.version || "0.1.0",
          author: manifest.author || "Agentopia Team",
          category: manifest.category || "Uncategorized",
          agentType: manifest.agentType || manifest.type || "Assistant", 
          agentScale: manifest.agentScale || manifest.scale || "Single-Agent", 
          subcategory: manifest.subcategory || "",
          developmentFrameworks: manifest.developmentFrameworks || [],
          intendedAudience: manifest.intendedAudience || [],
          dataModalities: manifest.dataModalities || [],
          integrationType: manifest.integrationType || "",
          description: manifest.description || "",
          configFields: manifest.config_fields || [], // Use snake_case from source
          features: manifest.features || ["Demo Agent"],
          tags: manifest.tags || ["demo"],
          // Use snake_case from source manifest, fallback to camelCase if old manifest, then placeholder
          demoUrl: manifest.demo_url || manifest.demoUrl || "", // Output key is demoUrl (camelCase)
          sourceUrl: manifest.source_url || manifest.sourceUrl || "", // Output key is sourceUrl (camelCase)

          rating: manifest.rating !== undefined ? manifest.rating : 5.0,
          reviews: manifest.reviews !== undefined ? manifest.reviews : 0,
          long_description: manifest.long_description || manifest.description || "",
          entry_point: manifest.entry_point || null,
          deployment_status: manifest.deployment_status || "N/A",
          use_cases: manifest.use_cases || [],
          requirements: manifest.requirements || [],
          roadmap_features: manifest.roadmap_features || [],
          llm_dependency: manifest.llm_dependency || null,
          privacy_considerations: manifest.privacy_considerations || "",
          // Correctly map individual Docker fields from snake_case source
          docker_image_name: manifest.docker_image_name || null,
          docker_pull_instructions: manifest.docker_pull_instructions || null,
          docker_run_instructions: manifest.docker_run_instructions || null,
          setup_instructions: manifest.setup_instructions || manifest.setupInstructions || "", 
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
  // Merge: Prioritize existing manual agents. Update them if a match is found in realAgents, 
  // or add new realAgents if no match is found in existingAgents.
  const mergedAgents = [...existingAgents]; // Start with all existing manual agents

  realAgents.forEach((realAgent) => {
    const existingAgentIndex = mergedAgents.findIndex(manual => manual.name === realAgent.name);
    if (existingAgentIndex !== -1) {
      // Agent with the same name exists, update it with data from realAgent
      // This simple merge overwrites existing fields with realAgent fields.
      // For more granular control (e.g., only updating specific fields), this would need to be more complex.
      mergedAgents[existingAgentIndex] = { ...mergedAgents[existingAgentIndex], ...realAgent };
      console.log(`Updated existing agent: ${realAgent.name}`);
    } else {
      // Agent does not exist, add it
      mergedAgents.push(realAgent);
      console.log(`Added new agent from AIAgentopia: ${realAgent.name}`);
    }
  });

  // The 'merged' variable for writing to file should be 'mergedAgents'
  // We need to ensure the console log and writeFileSync use the correct variable name.
  // The original script used 'merged', so we'll adjust the variable name for the final output to match.
  const merged = mergedAgents; // Use 'merged' for consistency with the rest of the original script's output logic

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(merged, null, 4));
  console.log(
    `Merged ${realAgents.length} real agents with ${existingAgents.length} manual agents. Wrote ${merged.length} agents to`,
    OUTPUT_JSON,
  );
}

main();
