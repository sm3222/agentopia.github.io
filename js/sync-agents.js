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

const fs = require('fs');
const path = require('path');

// Path to AIAgentopia repo's agents directory (adjust if needed)
const AGENTS_DIR = path.resolve(__dirname, '../../AIAgentopia/agents');
// Output path for agents-data.json in portal repo
const OUTPUT_JSON = path.resolve(__dirname, '../js/agents-data.json');

function getAgentManifests(agentsDir) {
    const agents = [];
    if (!fs.existsSync(agentsDir)) {
        console.error('Agents directory not found:', agentsDir);
        return agents;
    }
    const agentFolders = fs.readdirSync(agentsDir).filter(f =>
        fs.statSync(path.join(agentsDir, f)).isDirectory()
    );
    agentFolders.forEach((folder, idx) => {
        const manifestPath = path.join(agentsDir, folder, 'agent.json');
        if (fs.existsSync(manifestPath)) {
            try {
                const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
                // Map manifest fields to portal format
                agents.push({
                    id: idx + 1,
                    name: manifest.name || folder,
                    category: manifest.category || 'Uncategorized',
                    type: manifest.type || 'regular',
                    scale: manifest.scale || 'single',
                    description: manifest.description || '',
                    rating: 5.0,
                    reviews: 0,
                    features: manifest.features || ['Demo Agent'],
                    tags: manifest.tags || ['demo']
                });
            } catch (e) {
                console.warn('Could not parse', manifestPath, e);
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
            existingAgents = JSON.parse(fs.readFileSync(OUTPUT_JSON, 'utf-8'));
        } catch (e) {
            console.warn('Could not parse existing agents-data.json:', e);
        }
    }
    // Get real agents from AIAgentopia
    const realAgents = getAgentManifests(AGENTS_DIR);
    // Merge: replace manual entry if name matches, otherwise keep manual
    const merged = [...realAgents];
    existingAgents.forEach(manualAgent => {
        if (!realAgents.find(a => a.name === manualAgent.name)) {
            merged.push(manualAgent);
        }
    });
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(merged, null, 4));
    console.log(`Merged ${realAgents.length} real agents with ${existingAgents.length} manual agents. Wrote ${merged.length} agents to`, OUTPUT_JSON);
}

main();
