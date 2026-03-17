import {
  createIntegration,
  copySkillTemplate,
  copyAgentTemplate,
  getCustomTemplateDir,
} from '../base-integration.js'
import path from 'path'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'iac',
  name: 'IaC (Terraform / CDK)',
  category: 'cloud',
  description: 'Infrastructure as Code with Terraform, AWS CDK, and Pulumi patterns',
  components: ['skill', 'agent'],
}

async function install(options: InstallerOptions): Promise<void> {
  const templateDir = getCustomTemplateDir('iac')

  await copySkillTemplate(
    path.join(templateDir, 'skills', 'SKILL.md.hbs'),
    options.projectDir,
    'infrastructure-as-code',
    options.templateContext,
  )

  await copyAgentTemplate(
    path.join(templateDir, 'agents', 'iac-architect.md.hbs'),
    options.projectDir,
    'iac-architect',
    options.templateContext,
  )
}

export const iacInstaller = createIntegration(meta, install)
