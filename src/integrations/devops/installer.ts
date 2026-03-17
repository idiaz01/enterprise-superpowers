import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
  copyContentCommand,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'devops',
  name: 'DevOps',
  category: 'development',
  description: 'CI/CD pipelines, deployment strategies, and monitoring',
  components: ['skill', 'agent', 'command'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('deployment-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('docker-patterns', options.projectDir, options.templateContext)
  await copyContentAgent('build-error-resolver', options.projectDir, options.templateContext)
  await copyContentCommand('build-fix', options.projectDir, options.templateContext)
}

export const devopsInstaller = createIntegration(meta, install)
