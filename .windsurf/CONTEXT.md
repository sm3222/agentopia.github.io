# Agentopia Project Context

## Project Overview
- **Name**: Agentopia GitHub Pages
- **Type**: Organization Showcase Website
- **Primary Purpose**: Display and organize Agentopia's GitHub repositories
- **Hosting**: Initially GitHub Pages, later Vercel for full-stack deployment

## Development Workflow

### Git Strategy
- **Main Branches**:
  - `main`: Production-ready code
  - `develop`: Integration branch for features
- **Branch Types**:
  1. **Feature Branches**
     - Format: `feature/[descriptive-name]`
     - Source: develop
     - Target: develop
     - Example: `feature/add-login-page`
  2. **Bugfix Branches**
     - Format: `bugfix/[issue-description]`
     - Source: develop
     - Target: develop
     - Example: `bugfix/fix-login-validation`
  3. **Hotfix Branches**
     - Format: `hotfix/[version]-[brief-description]`
     - Source: main
     - Target: main and develop
     - Example: `hotfix/1.2.1-fix-security-vulnerability`
  4. **Release Branches**
     - Format: `release/[version]`
     - Source: develop
     - Target: main and develop
     - Example: `release/1.2.0`

### Pull Request Process
1. **Creating PR**:
   - Follow PR template in `.github/pull_request_template.md`
   - Title format: `type: Brief description`
   - Types: feat, fix, docs, style, refactor, perf, test, chore
2. **Review Process**:
   - Required approvals: 1
   - Address all comments
   - Keep PR focused and small
3. **Merging**:
   - Squash and merge
   - Delete branch after merge

### Development Phases

#### Phase 1: Static Site (Current)
- **Technologies**:
  - HTML5
  - Tailwind CSS
  - Vanilla JavaScript
- **Key Features**:
  - Responsive design
  - Dark/Light mode theme toggle
  - Dynamic GitHub repository fetching
  - Interactive repository search
  - Blog system with dynamic content
- **Deployment**: GitHub Pages

#### Phase 2: Enhanced Frontend
- **Planned Technologies**:
  - Jekyll/Ruby for blog features
  - React with TypeScript
  - shadcn UI framework
- **Key Additions**:
  - Blog functionality
  - Enhanced UI components
  - Type-safe development
  - Improved user interactions

#### Phase 3: Full-Stack Implementation
- **Planned Technologies**:
  - Backend services
  - Database integration
  - API development
  - Authentication system
- **Deployment**: Vercel

## Design Principles

### Clean, Modern Web Design
- Consistent spacing and typography system
- Clear visual hierarchy
- Modern, minimalist aesthetic
- Thoughtful use of whitespace

### User Experience & Interactivity
- Immediate visual feedback on interactions
- Smooth, purposeful animations
- Clear loading and error states
- Intuitive navigation patterns

### Responsive & Accessible Design
- Mobile-first development approach
- WCAG AA compliance
- Semantic HTML structure
- Performance optimization
- Universal usability

## Session Management
Each development session should follow this workflow:

### Start of Session
1. Review this CONTEXT.md for project vision and workflow
2. Review CHANGELOG.md for recent changes and status
3. Check rules.json for technical standards
4. Pull latest changes and verify correct branch

### End of Session
1. Update CHANGELOG.md with progress
2. Follow git workflow for PRs and branch cleanup
3. Document any new technical decisions

## File Responsibilities
- **CONTEXT.md**: Project vision, phases, workflows, and principles
- **CHANGELOG.md**: Session history and project status tracking
- **rules.json**: Technical specifications and standards