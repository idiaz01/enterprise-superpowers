import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'java-spring',
  name: 'Java / Spring Boot',
  category: 'backend',
  description:
    'Java coding standards, JPA patterns, Spring Boot architecture, security, and TDD',
  components: ['skill', 'agent'],
}

async function install(options: InstallerOptions): Promise<void> {
  await copyContentSkill(
    'java-coding-standards',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'jpa-patterns',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'springboot-patterns',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'springboot-security',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'springboot-tdd',
    options.projectDir,
    options.templateContext,
  )
  await copyContentSkill(
    'springboot-verification',
    options.projectDir,
    options.templateContext,
  )

  await copyContentAgent(
    'java-reviewer',
    options.projectDir,
    options.templateContext,
  )
  await copyContentAgent(
    'java-build-resolver',
    options.projectDir,
    options.templateContext,
  )
}

export const javaSpringInstaller = createIntegration(meta, install)
