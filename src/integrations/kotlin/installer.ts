import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'kotlin',
  name: 'Kotlin',
  category: 'development',
  description:
    'Kotlin patterns, coroutines, Ktor, Exposed ORM, Compose Multiplatform, testing, and Android clean architecture',
  components: ['skill', 'agent'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('kotlin-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('kotlin-testing', options.projectDir, options.templateContext)
  await copyContentSkill('kotlin-coroutines-flows', options.projectDir, options.templateContext)
  await copyContentSkill('kotlin-exposed-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('kotlin-ktor-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('compose-multiplatform-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('android-clean-architecture', options.projectDir, options.templateContext)

  await copyContentAgent('kotlin-reviewer', options.projectDir, options.templateContext)
  await copyContentAgent('kotlin-build-resolver', options.projectDir, options.templateContext)
}

export const kotlinInstaller = createIntegration(meta, install)
