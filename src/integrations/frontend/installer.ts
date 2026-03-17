import {
  createIntegration,
  copyContentSkill,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'frontend',
  name: 'Frontend',
  category: 'frontend',
  description: 'Component architecture, state management, and UI patterns using company design system',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  // ECC skill (real content)
  await copyContentSkill('frontend-patterns', options.projectDir, options.templateContext)
}

export const frontendInstaller = createIntegration(meta, install)
