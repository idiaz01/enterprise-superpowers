import {
  createIntegration,
  copyContentSkill,
  copyContentCommand,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'skills-creator',
  name: 'Skills Creator',
  category: 'meta',
  description: 'Meta-skill for creating and managing new Claude Code skills',
  components: ['skill', 'command'],
}

async function install(options: InstallerOptions): Promise<void> {
  // Superpowers skill (real content)
  await copyContentSkill('writing-skills', options.projectDir, options.templateContext)

  // ECC command (real content)
  await copyContentCommand('skill-create', options.projectDir, options.templateContext)
}

export const skillsCreatorInstaller = createIntegration(meta, install)
