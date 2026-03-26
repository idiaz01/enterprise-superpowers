import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'flutter',
  name: 'Flutter',
  category: 'frontend',
  description:
    'Flutter/Dart code review, patterns, and best practices for cross-platform mobile development',
  components: ['skill', 'agent'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('flutter-dart-code-review', options.projectDir, options.templateContext)

  await copyContentAgent('flutter-reviewer', options.projectDir, options.templateContext)
}

export const flutterInstaller = createIntegration(meta, install)
