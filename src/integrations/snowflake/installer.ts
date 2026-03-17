import {
  createIntegration,
  copySkillTemplate,
  getCustomTemplateDir,
} from '../base-integration.js'
import path from 'path'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'snowflake',
  name: 'Snowflake',
  category: 'data',
  description: 'Snowflake data warehouse patterns and optimization',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  const templateDir = getCustomTemplateDir('snowflake')

  await copySkillTemplate(
    path.join(templateDir, 'skills', 'SKILL.md.hbs'),
    options.projectDir,
    'snowflake-patterns',
    options.templateContext,
  )
}

export const snowflakeInstaller = createIntegration(meta, install)
