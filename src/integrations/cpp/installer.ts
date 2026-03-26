import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'cpp',
  name: 'C++',
  category: 'development',
  description:
    'C++ Core Guidelines, testing with GoogleTest/CTest, build resolution, and code review',
  components: ['skill', 'agent'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('cpp-coding-standards', options.projectDir, options.templateContext)
  await copyContentSkill('cpp-testing', options.projectDir, options.templateContext)

  await copyContentAgent('cpp-reviewer', options.projectDir, options.templateContext)
  await copyContentAgent('cpp-build-resolver', options.projectDir, options.templateContext)
}

export const cppInstaller = createIntegration(meta, install)
