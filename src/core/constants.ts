import type { IntegrationCategory, IntegrationMeta } from './types.js'

export const VERSION = '0.2.0'

export const INTEGRATION_CATEGORIES: readonly IntegrationCategory[] = [
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'Task tracking and project management tools',
  },
  {
    id: 'collaboration',
    name: 'Collaboration & Docs',
    description: 'Documentation and collaboration platforms',
  },
  {
    id: 'cloud',
    name: 'Cloud & Infrastructure',
    description: 'Cloud providers and infrastructure tools',
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Version control and development workflows',
  },
  {
    id: 'quality',
    name: 'Quality & Security',
    description: 'Code quality, testing, and security tools',
  },
  {
    id: 'frontend',
    name: 'Frontend & Design',
    description: 'Frontend development and design tools',
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Backend development patterns',
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    description: 'Data platforms and analytics tools',
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'ML tools, MLOps, and agentic engineering',
  },
  {
    id: 'meta',
    name: 'Meta & Tooling',
    description: 'Skills creation, language servers, and utilities',
  },
] as const

export const INTEGRATIONS: readonly IntegrationMeta[] = [
  // Project Management
  {
    id: 'jira',
    name: 'Jira',
    category: 'project-management',
    description: 'Task management, sprint tracking, and backlog analysis',
    components: ['skill', 'mcp', 'agent'],
  },

  // Collaboration
  {
    id: 'confluence',
    name: 'Confluence',
    category: 'collaboration',
    description: 'Wiki documentation and knowledge base',
    components: ['skill', 'mcp'],
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'collaboration',
    description: 'Project docs, wikis, and databases',
    components: ['skill', 'mcp'],
  },
  {
    id: 'diagramming',
    name: 'Draw.io / Excalidraw',
    category: 'collaboration',
    description: 'Diagram generation and architecture visualization',
    components: ['skill'],
  },

  // Cloud
  {
    id: 'aws',
    name: 'AWS',
    category: 'cloud',
    description:
      'AWS infrastructure patterns, IAM, CloudWatch, and best practices',
    components: ['skill', 'agent'],
  },
  {
    id: 'azure-gcp',
    name: 'Azure / GCP',
    category: 'cloud',
    description: 'Multi-cloud support for Azure and Google Cloud Platform',
    components: ['skill'],
  },
  {
    id: 'iac',
    name: 'IaC (Terraform / CDK)',
    category: 'cloud',
    description:
      'Infrastructure as Code with Terraform, AWS CDK, and Pulumi patterns',
    components: ['skill', 'agent'],
  },

  // Development
  {
    id: 'git',
    name: 'Git (Lab/Hub)',
    category: 'development',
    description: 'Git workflows, branch conventions, and commit standards',
    components: ['skill', 'hook', 'agent'],
  },
  {
    id: 'devops',
    name: 'DevOps',
    category: 'development',
    description: 'CI/CD pipelines, deployment strategies, and monitoring',
    components: ['skill'],
  },
  {
    id: 'pr-mr',
    name: 'PR/MR Workflows',
    category: 'development',
    description:
      'Pull request automation, review workflows, and merge strategies',
    components: ['skill', 'agent', 'command'],
  },
  {
    id: 'golang',
    name: 'Go',
    category: 'development',
    description:
      'Go patterns, testing, code review, build resolution, and idiomatic Go best practices',
    components: ['skill', 'agent', 'command', 'rule'],
  },
  {
    id: 'language-servers',
    name: 'Language Servers',
    category: 'development',
    description:
      'LSP configurations for Terraform, Dockerfile, and other languages',
    components: ['skill'],
  },
  {
    id: 'observability',
    name: 'Observability',
    category: 'development',
    description:
      'Grafana dashboards, Sentry error tracking, and monitoring via official MCP servers',
    components: ['mcp'],
  },

  // Quality & Security
  {
    id: 'security',
    name: 'Security',
    category: 'quality',
    description:
      'Security hooks, secret scanning, OWASP checks, and pre-commit validation',
    components: ['skill', 'hook', 'agent'],
  },
  {
    id: 'code-quality',
    name: 'Code Quality & Coverage',
    category: 'quality',
    description:
      'Linting standards, test coverage enforcement, and TDD workflows',
    components: ['skill', 'hook'],
  },

  // Frontend
  {
    id: 'frontend',
    name: 'Frontend',
    category: 'frontend',
    description:
      'Component architecture, state management, and UI patterns using company design system',
    components: ['skill', 'agent'],
  },
  {
    id: 'frontend-slides',
    name: 'Frontend Slides',
    category: 'frontend',
    description: 'Presentation generation with company branding and animations',
    components: ['skill'],
  },
  {
    id: 'visual-companion',
    name: 'Visual Companion',
    category: 'frontend',
    description: 'Browser-based visualization and interactive prototyping',
    components: ['skill'],
  },

  // Backend
  {
    id: 'backend',
    name: 'Backend',
    category: 'backend',
    description:
      'API design, microservices patterns, and server-side best practices',
    components: ['skill', 'agent'],
  },
  {
    id: 'django',
    name: 'Django',
    category: 'backend',
    description:
      'Django patterns, security, TDD, and verification workflows for Python web applications',
    components: ['skill'],
  },
  {
    id: 'java-spring',
    name: 'Java / Spring Boot',
    category: 'backend',
    description:
      'Java coding standards, JPA patterns, Spring Boot architecture, security, and TDD',
    components: ['skill'],
  },

  // Data
  {
    id: 'databases',
    name: 'Databases',
    category: 'data',
    description:
      'SQL best practices, schema design, migrations, and query optimization',
    components: ['skill'],
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    category: 'data',
    description: 'Snowflake data warehouse patterns and optimization',
    components: ['skill'],
  },
  {
    id: 'sap',
    name: 'SAP',
    category: 'data',
    description: 'SAP integration patterns and enterprise ERP workflows',
    components: ['skill'],
  },

  // AI & ML
  {
    id: 'ml-tools',
    name: 'ML Tools',
    category: 'ai-ml',
    description: 'Machine learning workflow support and experiment tracking',
    components: ['skill'],
  },
  {
    id: 'ml-engineering',
    name: 'ML Engineering',
    category: 'ai-ml',
    description:
      'MLOps, model deployment, forecasting, and experimentation patterns',
    components: ['skill', 'agent'],
  },
  {
    id: 'agentic-engineering',
    name: 'Agentic Engineering',
    category: 'ai-ml',
    description:
      'Multi-agent orchestration, agent design patterns, and autonomous workflows',
    components: ['skill'],
  },

  // Meta
  {
    id: 'skills-creator',
    name: 'Skills Creator',
    category: 'meta',
    description: 'Meta-skill for creating and managing new Claude Code skills',
    components: ['skill', 'command'],
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    category: 'meta',
    description:
      'Article writing, content engine, and multi-platform content systems',
    components: ['skill'],
  },

  // Development (additional)
  {
    id: 'debugging-workflow',
    name: 'Debugging & Workflow',
    category: 'development',
    description:
      'Systematic debugging, brainstorming, planning, and parallel agent workflows',
    components: ['skill', 'command'],
  },
] as const

export const MVP_INTEGRATION_IDS = [
  'jira',
  'confluence',
  'notion',
  'diagramming',
  'aws',
  'azure-gcp',
  'iac',
  'git',
  'golang',
  'devops',
  'pr-mr',
  'language-servers',
  'observability',
  'security',
  'code-quality',
  'frontend',
  'frontend-slides',
  'visual-companion',
  'backend',
  'django',
  'java-spring',
  'databases',
  'snowflake',
  'sap',
  'ml-tools',
  'ml-engineering',
  'agentic-engineering',
  'skills-creator',
  'content-creation',
  'debugging-workflow',
] as const

export const DEFAULT_COLORS = [
  { name: 'primary', hex: '#0066CC' },
  { name: 'secondary', hex: '#2D3748' },
  { name: 'accent', hex: '#38A169' },
  { name: 'background', hex: '#FFFFFF' },
  { name: 'text', hex: '#1A202C' },
] as const

export const GENERATED_DIRS = [
  '.claude-plugin',
  'agents',
  'commands',
  'skills',
  'hooks',
  'rules',
  'assets/logos',
  'assets/fonts',
  'assets/examples',
  'config',
] as const

export const CONFIG_FILE = 'config/integrations.json'
export const DESIGN_SYSTEM_FILE = 'config/design-system.json'
