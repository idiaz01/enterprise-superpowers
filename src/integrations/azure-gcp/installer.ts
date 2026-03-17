import {
  createIntegration,
  copySkillTemplate,
  getCustomTemplateDir,
} from '../base-integration.js'
import path from 'path'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'azure-gcp',
  name: 'Azure / GCP',
  category: 'cloud',
  description: 'Multi-cloud support for Azure and Google Cloud Platform',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  const templateDir = getCustomTemplateDir('azure-gcp')

  await copySkillTemplate(
    path.join(templateDir, 'skills', 'SKILL.md.hbs'),
    options.projectDir,
    'multi-cloud',
    options.templateContext,
  )
}

export const azureGcpInstaller = createIntegration(meta, install)
