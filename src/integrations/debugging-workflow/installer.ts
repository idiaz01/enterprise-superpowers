import { createIntegration, copyContentSkill } from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'debugging-workflow',
  name: 'Debugging & Workflow',
  category: 'development',
  description:
    'Systematic debugging, brainstorming, planning, and parallel agent workflows',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill(
    'systematic-debugging',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'brainstorming',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'writing-plans',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'executing-plans',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'dispatching-parallel-agents',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'subagent-driven-development',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'verification-before-completion',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'blueprint',
    options.projectDir,
    options.templateContext,
  )
}

export const debuggingWorkflowInstaller = createIntegration(meta, install)
