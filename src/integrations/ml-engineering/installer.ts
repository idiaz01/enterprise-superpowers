import {
  createIntegration,
  copySkillTemplate,
  copyAgentTemplate,
  getCustomTemplateDir,
} from '../base-integration.js'
import path from 'path'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'ml-engineering',
  name: 'ML Engineering',
  category: 'ai-ml',
  description: 'MLOps, model deployment, forecasting, and experimentation patterns',
  components: ['skill', 'agent'],
}

async function install(options: InstallerOptions): Promise<void> {
  const templateDir = getCustomTemplateDir('ml-engineering')

  await copySkillTemplate(
    path.join(templateDir, 'skills', 'SKILL.md.hbs'),
    options.projectDir,
    'ml-engineering',
    options.templateContext,
  )

  await copyAgentTemplate(
    path.join(templateDir, 'agents', 'ml-engineer.md.hbs'),
    options.projectDir,
    'ml-engineer',
    options.templateContext,
  )
}

export const mlEngineeringInstaller = createIntegration(meta, install)
