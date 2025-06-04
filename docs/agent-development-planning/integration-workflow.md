---
Version: 0.2.0
Last Updated: 2025-06-02
---

# Agent Integration Workflow

## Overview

This document outlines the step-by-step process for integrating new AI agents into the Agentopia ecosystem. It covers both the technical and collaborative steps needed to ensure agents are discoverable, usable, and maintainable—whether developed internally or contributed by the community.

---

## 1. Agent Development (Playground Repo)
- Create a new folder for your agent under `agents/` in the playground repo.
- Implement the agent using your chosen framework (LangChain, AutoGen, CrewAI, custom, no-code, etc.).
- Write a manifest file (`agent.yaml` or `manifest.yaml`) describing the agent (see [Agent Manifest Standard](./agent-manifest.md)).
- Add a `README.md` with usage instructions, requirements, and examples.
- (Optional) Add tests or example scripts for validation.

---

## 2. Manifest Validation
- Ensure the manifest includes all required fields (id, name, description, version, framework, entry_point, category, labels, requirements, launch, inputs/outputs, documentation, maintainer, license).
- Include optional fields for enhanced portal integration:
  - `demo_url`: Link to live demo if available
  - `source_url`: Link to source code repository
  - `config_fields`: Configuration options with field types and defaults
  - `setup_instructions`: Markdown-formatted setup guide
- Validate the manifest using a schema validator (if available).
- Check that dependencies and launch instructions are correct and reproducible.

---

## 3. Documentation & Metadata
- Provide clear, concise documentation in the agent’s `README.md`.
- Add relevant tags, categories, and labels for discoverability.
- Link to external resources or papers if applicable.

---

## 4. Contribution & Review
- Open a pull request (PR) to add or update the agent in the playground repo.
- Follow the contribution guidelines and PR template.
- Address feedback from maintainers and reviewers.
- Ensure tests (if present) pass and documentation is complete.

---

## 5. Syncing with the Portal Repo
- Once merged, the agent's manifest and metadata should be synced to the showcase portal repo.
  - **Manual:** Copy manifest or summary data to the portal repo's dataset.
  - **Automated:** Use a script or GitHub Action to fetch and update agent data in the portal.
- Verify the agent detail page displays correctly:
  - Hero section with emoji, name, category, and description
  - Setup instructions render properly in markdown
  - Configuration form shows all fields with correct types
  - Demo and source links work if provided
  - Sidebar navigation functions properly
- Confirm that the portal displays the new/updated agent correctly in the gallery and category pages.

---

## 6. Launch & Discovery
- Users can now discover, filter, and (if supported) launch the agent from the portal.
- Provide clear instructions or links for launching locally or in the cloud (future).

---

## 7. Maintenance & Updates
- Keep the agent’s code, manifest, and documentation up to date as features evolve.
- Respond to issues or enhancement requests from the community.
- Update the portal dataset as new versions are released.

---

## Best Practices
- Use semantic versioning for agent releases.
- Keep manifests and documentation clear and up to date.
- Automate syncing and validation where possible.
- Foster community collaboration by providing templates and clear guidelines.

---

## References
- [Agent Manifest Standard](./agent-manifest.md)
- [Repository Structure](./repo-structure.md)
- [System Architecture](./architecture.md)
