import {
  createIntegration,
  copySkillTemplate,
  getCustomTemplateDir,
} from '../base-integration.js'
import path from 'path'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'language-servers',
  name: 'Language Servers',
  category: 'development',
  description: 'LSP configurations for Terraform, Dockerfile, and other languages',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  const templateDir = getCustomTemplateDir('language-servers')

  await copySkillTemplate(
    path.join(templateDir, 'skills', 'SKILL.md.hbs'),
    options.projectDir,
    'language-servers',
    options.templateContext,
  )
}

export const languageServersInstaller = createIntegration(meta, install)
