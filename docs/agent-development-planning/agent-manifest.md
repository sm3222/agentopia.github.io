---
Version: 0.1.0
Last Updated: 2025-06-01
---

# Agent Manifest Standard

## Overview

The Agent Manifest is a structured metadata file (YAML or JSON) that describes each AI agent in the Agentopia ecosystem. This standard ensures that agents—regardless of framework or origin—can be discovered, launched, and integrated in a consistent way, both locally and in the cloud.

---

## Goals

- **Framework-Agnostic:** Support agents built with any framework (LangChain, AutoGen, CrewAI, no-code, etc.).
- **Discoverability:** Enable the portal and registry to display, filter, and search agents by category, capability, and more.
- **Automation-Ready:** Provide all information needed to automate launching, testing, and integrating agents.
- **Extensible:** Allow for future expansion as new frameworks and requirements emerge.

---

## Example Manifest (YAML)

```yaml
id: agent-001
name: "Research Assistant"
description: "An AI agent that helps users gather and summarize research papers."
version: 1.0.0
framework: langchain
entry_point: main.py
category: Data Analysis & Research
labels:
  - summarization
  - search
  - NLP
requirements:
  - python>=3.10
  - langchain>=0.1.0
launch:
  type: cli
  command: "python main.py --input {input_file} --output {output_file}"
inputs:
  - name: input_file
    type: file
    description: "Path to the input document."
outputs:
  - name: output_file
    type: file
    description: "Path to the summary file."
documentation: https://github.com/Agentopia/agent-playground/agents/research-assistant/README.md
maintainer: agentopia-core
license: MIT
```

---

## Required Fields

- `id`: Unique identifier for the agent
- `name`: Human-readable name
- `description`: Short summary of what the agent does
- `version`: Agent version (semantic versioning recommended)
- `framework`: Framework or tool used (e.g., langchain, autogen, custom)
- `entry_point`: File or script to run the agent
- `category`: Main category (e.g., Data Analysis & Research, Productivity & Organization, Creative Content & Design, Automation & Utilities)
- `labels`: List of tags/capabilities
- `requirements`: List of dependencies (pip, npm, etc.)
- `launch`: How to launch/run the agent (CLI, API, GUI, etc.)
- `inputs`/`outputs`: Expected input/output parameters
- `documentation`: Link to agent docs or README
- `maintainer`: Responsible person/team
- `license`: License for reuse

---

## Optional Fields

- `example_usage`: Example command or API call
- `test_script`: Script for automated testing
- `icon`: Path or URL to agent icon
- `cloud_ready`: Boolean (is this agent ready for cloud deployment?)
- `adapter`: Reference to framework adapter if required

---

## Best Practices

- Keep manifests up to date as agents evolve.
- Use clear, descriptive names and categories.
- Provide thorough documentation links.
- Validate manifests with a schema validator if possible.

---

## Future Extensions

- Support for multi-modal agents (audio, video, etc.)
- Internationalization/localization fields
- Security and compliance metadata

---

## References

- [Sample Agent Manifests](https://github.com/Agentopia/agent-playground/tree/main/agents)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Home Assistant Manifest Example](https://developers.home-assistant.io/docs/creating_integration_manifest/)
