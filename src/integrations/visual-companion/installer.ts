import {
  createIntegration,
  copySkillTemplate,
  getCustomTemplateDir,
} from '../base-integration.js'
import path from 'path'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'visual-companion',
  name: 'Visual Companion',
  category: 'frontend',
  description: 'Browser-based visualization and interactive prototyping',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  const templateDir = getCustomTemplateDir('visual-companion')

  await copySkillTemplate(
    path.join(templateDir, 'skills', 'SKILL.md.hbs'),
    options.projectDir,
    'visual-companion',
    options.templateContext,
  )
}

export const visualCompanionInstaller = createIntegration(meta, install)
