import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
  copyContentRule,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'security',
  name: 'Security',
  category: 'quality',
  description: 'Security hooks, secret scanning, OWASP checks, and pre-commit validation',
  components: ['skill', 'agent', 'rule'],
}

async function install(options: InstallerOptions): Promise<void> {
  // ECC skills (real content)
  await copyContentSkill('security-review', options.projectDir, options.templateContext)
  await copyContentSkill('security-scan', options.projectDir, options.templateContext)

  // ECC agent (real content)
  await copyContentAgent('security-reviewer', options.projectDir, options.templateContext)

  // ECC rule (real content)
  await copyContentRule('common/security.md', options.projectDir, options.templateContext)
}

export const securityInstaller = createIntegration(meta, install)
