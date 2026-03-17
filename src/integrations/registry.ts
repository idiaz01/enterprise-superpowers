import type { Installer, IntegrationMeta } from '../core/types.js'
import { INTEGRATIONS, INTEGRATION_CATEGORIES } from '../core/constants.js'

type InstallerLoader = () => Promise<Installer>

const installerLoaders: ReadonlyMap<string, InstallerLoader> = new Map([
  // Project Management
  ['jira', () => import('./jira/installer.js').then((m) => m.jiraInstaller)],

  // Collaboration
  [
    'confluence',
    () =>
      import('./confluence/installer.js').then((m) => m.confluenceInstaller),
  ],
  [
    'notion',
    () => import('./notion/installer.js').then((m) => m.notionInstaller),
  ],
  [
    'diagramming',
    () =>
      import('./diagramming/installer.js').then((m) => m.diagrammingInstaller),
  ],

  // Cloud
  ['aws', () => import('./aws/installer.js').then((m) => m.awsInstaller)],
  [
    'azure-gcp',
    () => import('./azure-gcp/installer.js').then((m) => m.azureGcpInstaller),
  ],
  ['iac', () => import('./iac/installer.js').then((m) => m.iacInstaller)],

  // Development
  ['git', () => import('./git/installer.js').then((m) => m.gitInstaller)],
  [
    'golang',
    () => import('./golang/installer.js').then((m) => m.golangInstaller),
  ],
  [
    'devops',
    () => import('./devops/installer.js').then((m) => m.devopsInstaller),
  ],
  ['pr-mr', () => import('./pr-mr/installer.js').then((m) => m.prMrInstaller)],
  [
    'language-servers',
    () =>
      import('./language-servers/installer.js').then(
        (m) => m.languageServersInstaller,
      ),
  ],
  [
    'observability',
    () =>
      import('./observability/installer.js').then(
        (m) => m.observabilityInstaller,
      ),
  ],
  [
    'debugging-workflow',
    () =>
      import('./debugging-workflow/installer.js').then(
        (m) => m.debuggingWorkflowInstaller,
      ),
  ],

  // Quality & Security
  [
    'security',
    () => import('./security/installer.js').then((m) => m.securityInstaller),
  ],
  [
    'code-quality',
    () =>
      import('./code-quality/installer.js').then((m) => m.codeQualityInstaller),
  ],

  // Frontend
  [
    'frontend',
    () => import('./frontend/installer.js').then((m) => m.frontendInstaller),
  ],
  [
    'frontend-slides',
    () =>
      import('./frontend-slides/installer.js').then(
        (m) => m.frontendSlidesInstaller,
      ),
  ],
  [
    'visual-companion',
    () =>
      import('./visual-companion/installer.js').then(
        (m) => m.visualCompanionInstaller,
      ),
  ],

  // Backend
  [
    'backend',
    () => import('./backend/installer.js').then((m) => m.backendInstaller),
  ],
  [
    'django',
    () => import('./django/installer.js').then((m) => m.djangoInstaller),
  ],
  [
    'java-spring',
    () =>
      import('./java-spring/installer.js').then((m) => m.javaSpringInstaller),
  ],

  // Data
  [
    'databases',
    () => import('./databases/installer.js').then((m) => m.databasesInstaller),
  ],
  [
    'snowflake',
    () => import('./snowflake/installer.js').then((m) => m.snowflakeInstaller),
  ],
  ['sap', () => import('./sap/installer.js').then((m) => m.sapInstaller)],

  // AI & ML
  [
    'ml-tools',
    () => import('./ml-tools/installer.js').then((m) => m.mlToolsInstaller),
  ],
  [
    'ml-engineering',
    () =>
      import('./ml-engineering/installer.js').then(
        (m) => m.mlEngineeringInstaller,
      ),
  ],
  [
    'agentic-engineering',
    () =>
      import('./agentic-engineering/installer.js').then(
        (m) => m.agenticEngineeringInstaller,
      ),
  ],

  // Meta
  [
    'skills-creator',
    () =>
      import('./skills-creator/installer.js').then(
        (m) => m.skillsCreatorInstaller,
      ),
  ],
  [
    'content-creation',
    () =>
      import('./content-creation/installer.js').then(
        (m) => m.contentCreationInstaller,
      ),
  ],
])

export function getAllIntegrations(): readonly IntegrationMeta[] {
  return INTEGRATIONS
}

export function getIntegrationById(id: string): IntegrationMeta | undefined {
  return INTEGRATIONS.find((i) => i.id === id)
}

export function getIntegrationsByCategory(
  category: string,
): readonly IntegrationMeta[] {
  return INTEGRATIONS.filter((i) => i.category === category)
}

export function getAvailableIntegrations(): readonly IntegrationMeta[] {
  return INTEGRATIONS.filter((i) => installerLoaders.has(i.id))
}

export async function loadInstaller(id: string): Promise<Installer> {
  const loader = installerLoaders.get(id)
  if (!loader) {
    throw new Error(
      `No installer found for integration "${id}". Available: ${[...installerLoaders.keys()].join(', ')}`,
    )
  }
  return loader()
}

export async function loadInstallers(
  ids: readonly string[],
): Promise<readonly Installer[]> {
  return Promise.all(ids.map(loadInstaller))
}

export function getCategories() {
  return INTEGRATION_CATEGORIES
}

export function getGroupedIntegrations(): ReadonlyMap<
  string,
  readonly IntegrationMeta[]
> {
  const grouped = new Map<string, IntegrationMeta[]>()

  for (const category of INTEGRATION_CATEGORIES) {
    const integrations = INTEGRATIONS.filter((i) => i.category === category.id)
    if (integrations.length > 0) {
      grouped.set(category.id, integrations)
    }
  }

  return grouped
}

export function isInstallerAvailable(id: string): boolean {
  return installerLoaders.has(id)
}
