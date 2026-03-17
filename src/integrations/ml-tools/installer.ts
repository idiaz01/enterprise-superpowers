import {
  createIntegration,
  copySkillTemplate,
  getCustomTemplateDir,
} from '../base-integration.js'
import path from 'path'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'ml-tools',
  name: 'ML Tools',
  category: 'ai-ml',
  description: 'Machine learning workflow support and experiment tracking',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  const templateDir = getCustomTemplateDir('ml-tools')

  await copySkillTemplate(
    path.join(templateDir, 'skills', 'SKILL.md.hbs'),
    options.projectDir,
    'ml-tools',
    options.templateContext,
  )
}

export const mlToolsInstaller = createIntegration(meta, install)
