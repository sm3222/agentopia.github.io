# Project Context: Agentopia Portal

**Last Updated:** 2025-06-22

## Overview
This repository (`agentopia.github.io`) contains the public-facing portal for the Agentopia project. It's a static website built with HTML, Tailwind CSS, and vanilla JavaScript. Its primary purpose is to showcase the AI agents developed in the `AIAgentopia` repository.

## Current Status
- **Agent Detail Page:** The critical rendering bug on `pages/agent-detail.html` has been **fixed**. The page now correctly loads and displays all dynamic data for agents, including nested details for LLM dependencies, privacy, and Docker commands.
- **Data Synchronization:** The `public/data/agents-data.json` file is the single source of truth for agent information displayed on the portal. It is manually updated for now, pending improvements to the `sync-agents.cjs` script.
- **Local Development:** The site can be served locally using `python -m http.server 8000`.

## Next Immediate Task
- Implement an instructional popup modal for the "Try Demo" button on the agent detail page. Instead of linking to a live demo (which doesn't exist for local Docker-based agents), the button should trigger a modal that directs the user to the Docker setup instructions on the same page.
