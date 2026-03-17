import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
  copyContentCommand,
  copyContentRule,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'golang',
  name: 'Go',
  category: 'development',
  description:
    'Go patterns, testing, code review, build resolution, and idiomatic Go best practices',
  components: ['skill', 'agent', 'command', 'rule'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('golang-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('golang-testing', options.projectDir, options.templateContext)

  await copyContentAgent('go-reviewer', options.projectDir, options.templateContext)
  await copyContentAgent('go-build-resolver', options.projectDir, options.templateContext)

  await copyContentCommand('go-build', options.projectDir, options.templateContext)
  await copyContentCommand('go-review', options.projectDir, options.templateContext)
  await copyContentCommand('go-test', options.projectDir, options.templateContext)

  await copyContentRule('golang/coding-style.md', options.projectDir, options.templateContext)
  await copyContentRule('golang/patterns.md', options.projectDir, options.templateContext)
  await copyContentRule('golang/testing.md', options.projectDir, options.templateContext)
  await copyContentRule('golang/security.md', options.projectDir, options.templateContext)
  await copyContentRule('golang/hooks.md', options.projectDir, options.templateContext)
}

export const golangInstaller = createIntegration(meta, install)
