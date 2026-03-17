import {
  createIntegration,
  copySkillTemplate,
  getCustomTemplateDir,
} from '../base-integration.js'
import path from 'path'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'diagramming',
  name: 'Draw.io / Excalidraw',
  category: 'collaboration',
  description: 'Diagram generation and architecture visualization',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  const templateDir = getCustomTemplateDir('diagramming')

  await copySkillTemplate(
    path.join(templateDir, 'skills', 'SKILL.md.hbs'),
    options.projectDir,
    'diagramming',
    options.templateContext,
  )
}

export const diagrammingInstaller = createIntegration(meta, install)
