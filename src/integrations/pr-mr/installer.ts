import {
  createIntegration,
  copyContentSkill,
  copyContentCommand,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'pr-mr',
  name: 'PR/MR Workflows',
  category: 'development',
  description: 'Pull request automation, review workflows, and merge strategies',
  components: ['skill', 'command'],
}

async function install(options: InstallerOptions): Promise<void> {
  // Superpowers skills (real content)
  await copyContentSkill('requesting-code-review', options.projectDir, options.templateContext)
  await copyContentSkill('receiving-code-review', options.projectDir, options.templateContext)

  // ECC command (real content)
  await copyContentCommand('code-review', options.projectDir, options.templateContext)
}

export const prMrInstaller = createIntegration(meta, install)
