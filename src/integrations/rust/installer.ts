import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'rust',
  name: 'Rust',
  category: 'development',
  description:
    'Rust patterns, testing, code review, and build resolution for safe, performant systems programming',
  components: ['skill', 'agent'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('rust-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('rust-testing', options.projectDir, options.templateContext)

  await copyContentAgent('rust-reviewer', options.projectDir, options.templateContext)
  await copyContentAgent('rust-build-resolver', options.projectDir, options.templateContext)
}

export const rustInstaller = createIntegration(meta, install)
