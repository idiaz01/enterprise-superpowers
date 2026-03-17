import {
  createIntegration,
  copySkillTemplate,
  copyAgentTemplate,
  getCustomTemplateDir,
} from '../base-integration.js'
import path from 'path'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'aws',
  name: 'AWS',
  category: 'cloud',
  description: 'AWS infrastructure patterns, IAM, CloudWatch, and best practices',
  components: ['skill', 'agent'],
}

async function install(options: InstallerOptions): Promise<void> {
  const templateDir = getCustomTemplateDir('aws')

  await copySkillTemplate(
    path.join(templateDir, 'skills', 'SKILL.md.hbs'),
    options.projectDir,
    'aws-infrastructure',
    options.templateContext,
  )

  await copyAgentTemplate(
    path.join(templateDir, 'agents', 'aws-architect.md.hbs'),
    options.projectDir,
    'aws-architect',
    options.templateContext,
  )
}

export const awsInstaller = createIntegration(meta, install)
