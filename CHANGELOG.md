# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed
- **Agent Detail Page**: Resolved critical rendering error ('Cannot set properties of null') by correcting mismatched and missing HTML element IDs in `pages/agent-detail.html`. The page now correctly loads and displays all data from `agents-data.json`, including Key Details, LLM & Privacy, and Docker Information sections.
