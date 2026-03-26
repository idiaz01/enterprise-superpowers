import {
  createIntegration,
  copyContentSkill,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'swift',
  name: 'Swift',
  category: 'development',
  description:
    'SwiftUI patterns, Swift concurrency, actor persistence, protocol-based DI, and Liquid Glass design',
  components: ['skill'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill('swiftui-patterns', options.projectDir, options.templateContext)
  await copyContentSkill('swift-concurrency-6-2', options.projectDir, options.templateContext)
  await copyContentSkill('swift-actor-persistence', options.projectDir, options.templateContext)
  await copyContentSkill('swift-protocol-di-testing', options.projectDir, options.templateContext)
  await copyContentSkill('liquid-glass-design', options.projectDir, options.templateContext)
}

export const swiftInstaller = createIntegration(meta, install)
