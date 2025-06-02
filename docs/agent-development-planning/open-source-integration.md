---
Version: 0.1.0
Last Updated: 2025-06-01
---

# Open-Source Agent & Framework Integration Guide

## Overview

This guide explains how to discover, evaluate, and integrate open-source AI agents, frameworks, or tools into the Agentopia ecosystem. It provides best practices for technical integration, licensing, attribution, and community contribution.

---

## 1. Discovery & Evaluation
- Identify promising open-source agents or frameworks (e.g., from GitHub, Hugging Face, LangChainHub).
- Evaluate:
  - Project activity and maintenance
  - Documentation quality
  - License compatibility (MIT, Apache, etc.)
  - Community adoption and reputation

---

## 2. Technical Integration
- Fork or clone the open-source repo as needed.
- Add the agent or framework to the playground repo under `agents/` or `adapters/`.
- If required, wrap the agent with an adapter to conform to the Agentopia manifest/interface standard (see [Agent Manifest Standard](./agent-manifest.md)).
- Document any modifications or customizations made.
- Ensure dependencies are clearly listed in the manifest.
- Add tests or example scripts if possible.

---

## 3. Attribution & Licensing
- Respect original licenses and attribution requirements.
- Clearly state the origin of the integrated agent/framework in the README and manifest.
- If required, include license files from the original project.
- Avoid integrating code with incompatible or restrictive licenses.

---

## 4. Documentation & Community
- Update the agent’s README to include:
  - Original authors and links
  - Description of integration or adaptation steps
  - Usage instructions within Agentopia
- Encourage upstream contributions or improvements where possible.

---

## 5. Contribution Workflow
- Open a PR to add the integrated agent/framework to the playground repo.
- Clearly describe the source, license, and any changes in the PR description.
- Tag maintainers for review and feedback.
- Sync manifest and metadata to the portal repo as with any native agent.

---

## Best Practices
- Favor well-maintained, permissively licensed projects.
- Use adapters/wrappers to minimize invasive changes.
- Keep attribution and documentation clear for transparency.
- Engage with upstream communities when possible.

---

## References
- [Agent Manifest Standard](./agent-manifest.md)
- [Integration Workflow](./integration-workflow.md)
- [Choose an open source license](https://choosealicense.com/)
- [Hugging Face Model Hub](https://huggingface.co/models)
- [LangChainHub](https://smith.langchain.com/hub)
