import {
  createIntegration,
  copyContentSkill,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'content-creation',
  name: 'Content Creation',
  category: 'meta',
  description:
    'Article writing, content engine, and multi-platform content systems',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('article-writing', options.projectDir, options.templateContext)
  await copyContentSkill('content-engine', options.projectDir, options.templateContext)
}

export const contentCreationInstaller = createIntegration(meta, install)
