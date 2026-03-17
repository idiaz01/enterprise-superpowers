import {
  createIntegration,
  copyContentSkill,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'backend',
  name: 'Backend',
  category: 'backend',
  description: 'API design, microservices patterns, and server-side best practices',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('backend-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('api-design', options.projectDir, options.templateContext)
}

export const backendInstaller = createIntegration(meta, install)
