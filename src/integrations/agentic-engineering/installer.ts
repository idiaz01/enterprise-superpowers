import {
  createIntegration,
  copyContentSkill,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'agentic-engineering',
  name: 'Agentic Engineering',
  category: 'ai-ml',
  description: 'Multi-agent orchestration, agent design patterns, and autonomous workflows',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('agentic-engineering', options.projectDir, options.templateContext)
  await copyContentSkill('autonomous-loops', options.projectDir, options.templateContext)
  await copyContentSkill('enterprise-agent-ops', options.projectDir, options.templateContext)
}

export const agenticEngineeringInstaller = createIntegration(meta, install)
