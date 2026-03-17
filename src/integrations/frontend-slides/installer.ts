import {
  createIntegration,
  copyContentSkill,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'frontend-slides',
  name: 'Frontend Slides',
  category: 'frontend',
  description: 'Presentation generation with company branding and animations',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('frontend-slides', options.projectDir, options.templateContext)
}

export const frontendSlidesInstaller = createIntegration(meta, install)
