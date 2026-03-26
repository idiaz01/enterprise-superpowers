import {
  createIntegration,
  copyContentSkill,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'laravel',
  name: 'Laravel',
  category: 'backend',
  description:
    'Laravel patterns, security, TDD, and verification workflows for PHP web applications',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('laravel-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('laravel-security', options.projectDir, options.templateContext)
  await copyContentSkill('laravel-tdd', options.projectDir, options.templateContext)
  await copyContentSkill('laravel-verification', options.projectDir, options.templateContext)
  await copyContentSkill('perl-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('perl-security', options.projectDir, options.templateContext)
  await copyContentSkill('perl-testing', options.projectDir, options.templateContext)
}

export const laravelInstaller = createIntegration(meta, install)
