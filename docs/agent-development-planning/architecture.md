---
Version: 0.1.0
Last Updated: 2025-06-01
---

# Agentopia System Architecture

## Overview

This document describes the high-level architecture for the Agentopia AI Agents ecosystem, supporting both local development and future cloud-based deployment. The architecture is designed to be modular, framework-agnostic, and extensible, enabling easy integration of new agent frameworks and open-source tools.

---

## Architecture Diagram

```mermaid
graph TD
    subgraph Agent Playground (Dev Repo)
        A1[Agent Source Code]
        A2[Agent Manifest (YAML/JSON)]
        A3[Framework Adapters]
    end
    subgraph Agent Registry (API/Metadata)
        B1[Agent Metadata Store]
        B2[Category & Tag Index]
    end
    subgraph Showcase Portal (Website)
        C1[Agent Gallery UI]
        C2[Category Pages]
        C3[Agent Detail Pages]
    end
    subgraph Cloud Services (Future)
        D1[Agent Hosting]
        D2[API Gateway]
        D3[User Management]
    end
    A1 -- described by --> A2
    A2 -- registered in --> B1
    B1 -- indexed by --> B2
    B1 -- feeds --> C1
    B2 -- powers --> C2
    B1 -- powers --> C3
    A1 -- can be launched locally/cloud --> D1
    D1 -- exposed via --> D2
    D2 -- managed by --> D3
```

---

## Key Components

### 1. Agent Playground (Development Repository)
- **Purpose:**  
  - Houses all agent source code, manifests, and framework adapters.
  - Supports both code-based and no-code agent frameworks.
- **Features:**  
  - Modular agent folders with manifest files.
  - Adapters/wrappers for each supported framework.
  - Local test and launch scripts.

### 2. Agent Registry (Metadata/API Layer)
- **Purpose:**  
  - Central store for agent metadata, categories, tags, and manifest info.
  - Powers search, filtering, and organization in the portal.
- **Features:**  
  - Structured metadata (YAML/JSON).
  - API endpoints for agent discovery (future).
  - Category and tag indexing.

### 3. Showcase Portal (Static/Dynamic Website)
- **Purpose:**  
  - User-facing website for discovering, filtering, and learning about agents.
  - Entry point for launching or downloading agents.
- **Features:**  
  - Agent gallery, category pages, and agent detail pages.
  - Links to launch/download agents (local or cloud).
  - Dynamic integration with registry API (future).

### 4. Cloud Services (Future Expansion)
- **Purpose:**  
  - Enable cloud-based agent hosting, management, and sharing.
- **Features:**  
  - Agent hosting and execution.
  - API gateway for agent access.
  - User authentication and management.

---

## Data & Integration Flow

1. **Agent Creation:**  
   - New agents are added to the playground repo, each with a manifest file describing metadata, framework, and launch instructions.

2. **Registration:**  
   - The agent manifest is registered in the Agent Registry (manually or via automation).

3. **Discovery:**  
   - The Showcase Portal queries the registry to display agents in the gallery, category, and detail pages.

4. **Launch/Download:**  
   - Users can launch agents locally (via provided scripts) or, in the future, directly in the cloud.

5. **Cloud Expansion:**  
   - Cloud services will enable scalable, managed agent execution and user management.

---

## Design Principles

- **Modularity:** Each agent, framework, and integration is self-contained.
- **Extensibility:** New frameworks can be supported by adding adapters and updating manifests.
- **Separation of Concerns:** Development, metadata, and user interface are decoupled for flexibility.
- **Scalability:** Start local, expand to cloud with minimal friction.

---

## Next Steps

- Define the agent manifest standard (`agent-manifest.md`).
- Document the repository structure (`repo-structure.md`).
- Outline the integration workflow (`integration-workflow.md`).
- Plan for open-source agent integration (`open-source-integration.md`).

---
