import {
  createIntegration,
  copyContentSkill,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'django',
  name: 'Django',
  category: 'backend',
  description:
    'Django patterns, security, TDD, and verification workflows for Python web applications',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('django-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('django-security', options.projectDir, options.templateContext)
  await copyContentSkill('django-tdd', options.projectDir, options.templateContext)
  await copyContentSkill('django-verification', options.projectDir, options.templateContext)
}

export const djangoInstaller = createIntegration(meta, install)
