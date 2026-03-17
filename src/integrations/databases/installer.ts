import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'databases',
  name: 'Databases',
  category: 'data',
  description: 'SQL best practices, schema design, migrations, and query optimization',
  components: ['skill', 'agent'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('postgres-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('database-migrations', options.projectDir, options.templateContext)
  await copyContentAgent('database-reviewer', options.projectDir, options.templateContext)
}

export const databasesInstaller = createIntegration(meta, install)
