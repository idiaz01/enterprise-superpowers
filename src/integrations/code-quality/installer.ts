import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
  copyContentCommand,
  copyContentRule,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'code-quality',
  name: 'Code Quality & Coverage',
  category: 'quality',
  description: 'Linting standards, test coverage enforcement, and TDD workflows',
  components: ['skill', 'agent', 'command', 'rule'],
}

async function install(options: InstallerOptions): Promise<void> {
  // ECC skills (real content)
  await copyContentSkill('tdd-workflow', options.projectDir, options.templateContext)
  await copyContentSkill('verification-loop', options.projectDir, options.templateContext)
  await copyContentSkill('coding-standards', options.projectDir, options.templateContext)

  // ECC agent (real content)
  await copyContentAgent('tdd-guide', options.projectDir, options.templateContext)

  // ECC commands (real content)
  await copyContentCommand('tdd', options.projectDir, options.templateContext)
  await copyContentCommand('verify', options.projectDir, options.templateContext)
  await copyContentCommand('test-coverage', options.projectDir, options.templateContext)

  // ECC rule (real content)
  await copyContentRule('common/testing.md', options.projectDir, options.templateContext)
}

export const codeQualityInstaller = createIntegration(meta, install)
