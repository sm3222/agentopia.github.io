---
Version: 0.1.0
Last Updated: 2025-06-01
---

# Repository Structure: Agentopia Ecosystem

## Overview

Agentopia is organized as a multi-repo ecosystem to support modular, scalable, and community-driven AI agent development. This document explains the structure and relationship between the two main repositories:
- **Showcase Portal Repo** (`agentopia.github.io`)
- **Agent Playground Repo** (`agent-playground`)

---

## 1. Showcase Portal Repo (`agentopia.github.io`)

**Purpose:**
- User-facing website for discovering, filtering, and learning about AI agents
- Central hub for documentation, gallery, and resources
- Does **not** contain agent source code or manifests directly

**Example Structure:**
```
agentopia.github.io/
  index.html
  agents.html
  resources.html
  docs/
    AGENT-DEVELOPMENT.md
    agent-development-planning/
      architecture.md
      agent-manifest.md
      repo-structure.md
      ...
  js/
  css/
  images/
  ...
```

**Key Points:**
- References agent metadata and manifests from the playground repo
- Can display, link to, or launch agents using data imported from playground
- May use scripts or automation to sync agent data (see below)

---

## 2. Agent Playground Repo (`agent-playground`)

**Purpose:**
- Home for all agent source code, manifests, and framework adapters
- Supports both code-based and no-code agent frameworks
- Provides templates, adapters, and utilities for agent development

**Example Structure:**
```
agent-playground/
  agents/
    research-assistant/
      main.py
      agent.yaml
      README.md
    productivity-bot/
      app.js
      manifest.yaml
      README.md
    ...
  adapters/
  templates/
  docs/
    CONTRIBUTING.md
    ...
```

**Key Points:**
- Each agent lives in its own folder with code, manifest, and docs
- Adapters/wrappers for different frameworks live in `adapters/`
- Templates for new agents live in `templates/`
- This repo is the source of truth for agent metadata

---

## 3. How the Repos Interact

- **Manual Sync:**
  - Periodically copy manifest files or summary data from playground to portal
- **Automated Sync:**
  - Use scripts or GitHub Actions to fetch latest manifests and update portal dataset
- **Direct API (future):**
  - Expose an API from playground for live metadata fetching

**Typical Workflow:**
1. Develop or update an agent in the playground repo
2. Update its manifest and documentation
3. (Manual or automated) Sync manifest data to the portal repo
4. Portal site updates its gallery and agent pages with new data

---

## 4. Working Locally with Both Repos

- Clone both repos as sibling folders:
  ```
  ~/projects/
    agentopia.github.io/
    agent-playground/
  ```
- Use a code editor (e.g., VS Code) with multi-root workspace support to open and edit both at once
- Keep documentation and references in sync as you develop

---

## 5. Best Practices
- Keep agent manifests and code together in the playground repo
- Use automation (scripts, GitHub Actions) to reduce manual sync errors
- Reference playground agents in portal docs and UI with clear links
- Document the sync process for contributors
- Plan for future API-based integration as the ecosystem grows

---

## References
- [Agent Manifest Standard](./agent-manifest.md)
- [System Architecture](./architecture.md)
