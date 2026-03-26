import fs from 'fs-extra'
import path from 'path'
import type {
  DesignSystem,
  EnterpriseSkill,
  IntegrationMeta,
  ProjectConfig,
  TemplateContext,
} from './types.js'
import { GENERATED_DIRS, VERSION } from './constants.js'
import { renderTemplateFile } from './template-engine.js'
import { writeProjectConfig } from './config.js'
import { getTemplatesRoot } from './paths.js'
import { generateDesignSystem } from '../design-system/generator.js'
import { loadInstallers, getIntegrationById } from '../integrations/registry.js'

export interface GenerateOptions {
  readonly companyName: string
  readonly companySlug: string
  readonly designSystem: DesignSystem
  readonly enterpriseSkills: readonly EnterpriseSkill[]
  readonly selectedIntegrations: readonly string[]
  readonly outputDir: string
}

export async function generatePlugin(
  options: GenerateOptions,
): Promise<string> {
  const projectDir = path.join(
    options.outputDir,
    `${options.companySlug}-superpowers`,
  )

  const integrationMetas = options.selectedIntegrations
    .map(getIntegrationById)
    .filter((i): i is IntegrationMeta => i !== undefined)

  const context = createTemplateContext(
    options.companyName,
    options.companySlug,
    options.designSystem,
    integrationMetas,
  )

  await createDirectoryStructure(projectDir)
  await renderBaseTemplates(projectDir, context)
  await copyEnterpriseSkills(projectDir, options.enterpriseSkills)
  await generateDesignSystem(projectDir, options.designSystem, context)
  await installIntegrations(
    projectDir,
    options.selectedIntegrations,
    options,
    context,
  )
  await writeProjectConfigFile(projectDir, options, context)
  await initializeMcpConfig(projectDir)

  return projectDir
}

function createTemplateContext(
  companyName: string,
  companySlug: string,
  designSystem: DesignSystem,
  integrations: readonly IntegrationMeta[],
): TemplateContext {
  return {
    companyName,
    companySlug,
    designSystem,
    integrations,
    generatedAt: new Date().toISOString().split('T')[0],
    version: VERSION,
  }
}

async function createDirectoryStructure(projectDir: string): Promise<void> {
  for (const dir of GENERATED_DIRS) {
    await fs.ensureDir(path.join(projectDir, dir))
  }
}

async function renderBaseTemplates(
  projectDir: string,
  context: TemplateContext,
): Promise<void> {
  const templatesDir = path.join(getTemplatesRoot(import.meta.dirname), 'base')

  await renderTemplateFile(
    path.join(templatesDir, 'plugin.json.hbs'),
    path.join(projectDir, '.claude-plugin', 'plugin.json'),
    context,
  )

  await renderTemplateFile(
    path.join(templatesDir, 'hooks.json.hbs'),
    path.join(projectDir, 'hooks', 'hooks.json'),
    context,
  )

  await renderTemplateFile(
    path.join(templatesDir, 'README.md.hbs'),
    path.join(projectDir, 'README.md'),
    context,
  )

  await renderTemplateFile(
    path.join(templatesDir, 'CLAUDE.md.hbs'),
    path.join(projectDir, 'CLAUDE.md'),
    context,
  )

  await renderTemplateFile(
    path.join(templatesDir, 'setup.sh.hbs'),
    path.join(projectDir, 'setup.sh'),
    context,
  )

  await renderTemplateFile(
    path.join(templatesDir, 'uninstall.sh.hbs'),
    path.join(projectDir, 'uninstall.sh'),
    context,
  )
}

async function copyEnterpriseSkills(
  projectDir: string,
  skills: readonly EnterpriseSkill[],
): Promise<void> {
  if (skills.length === 0) return

  const skillsDir = path.join(projectDir, 'skills')

  for (const skill of skills) {
    const destDir = path.join(skillsDir, skill.name)
    await fs.copy(skill.sourcePath, destDir, { overwrite: false })
  }
}

async function installIntegrations(
  projectDir: string,
  integrationIds: readonly string[],
  options: GenerateOptions,
  context: TemplateContext,
): Promise<void> {
  if (integrationIds.length === 0) return

  const installers = await loadInstallers(integrationIds)

  for (const installer of installers) {
    await installer.install({
      projectDir,
      companyName: options.companyName,
      companySlug: options.companySlug,
      designSystem: options.designSystem,
      templateContext: context,
    })
  }
}

async function writeProjectConfigFile(
  projectDir: string,
  options: GenerateOptions,
  context: TemplateContext,
): Promise<void> {
  const config: ProjectConfig = {
    companyName: options.companyName,
    companySlug: options.companySlug,
    designSystem: options.designSystem,
    enterpriseSkills: options.enterpriseSkills.map((s) => s.name),
    enabledIntegrations: [...options.selectedIntegrations],
    version: VERSION,
    generatedAt: context.generatedAt,
  }
  await writeProjectConfig(projectDir, config)
}

async function initializeMcpConfig(projectDir: string): Promise<void> {
  const mcpPath = path.join(projectDir, '.mcp.json')
  const exists = await fs.pathExists(mcpPath)
  if (!exists) {
    await fs.writeJson(mcpPath, { mcpServers: {} }, { spaces: 2 })
  }
}

export async function addIntegrationsToProject(
  projectDir: string,
  integrationIds: readonly string[],
  config: ProjectConfig,
): Promise<ProjectConfig> {
  const allIntegrationIds = [...config.enabledIntegrations, ...integrationIds]
  const allMetas = allIntegrationIds
    .map(getIntegrationById)
    .filter((i): i is IntegrationMeta => i !== undefined)

  const context = createTemplateContext(
    config.companyName,
    config.companySlug,
    config.designSystem,
    allMetas,
  )

  const installers = await loadInstallers(integrationIds)
  for (const installer of installers) {
    await installer.install({
      projectDir,
      companyName: config.companyName,
      companySlug: config.companySlug,
      designSystem: config.designSystem,
      templateContext: context,
    })
  }

  const updatedConfig: ProjectConfig = {
    ...config,
    enabledIntegrations: [...new Set(allIntegrationIds)].sort(),
  }
  await writeProjectConfig(projectDir, updatedConfig)

  return updatedConfig
}
