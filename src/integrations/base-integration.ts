import fs from 'fs-extra'
import path from 'path'
import type {
  Installer,
  InstallerOptions,
  IntegrationMeta,
  TemplateContext,
} from '../core/types.js'
import {
  renderTemplateFile,
  copyWithCustomization,
  copyContentDir,
} from '../core/template-engine.js'
import { getTemplatesRoot, getContentRoot } from '../core/paths.js'

export type InstallFn = (options: InstallerOptions) => Promise<void>

export function createIntegration(
  meta: IntegrationMeta,
  installFn: InstallFn,
): Installer {
  return {
    meta,
    install: installFn,
  }
}

export async function copySkillTemplate(
  templatePath: string,
  projectDir: string,
  skillName: string,
  context: TemplateContext,
): Promise<void> {
  const outputPath = path.join(projectDir, 'skills', skillName, 'SKILL.md')
  await renderTemplateFile(templatePath, outputPath, context)
}

export async function copyAgentTemplate(
  templatePath: string,
  projectDir: string,
  agentName: string,
  context: TemplateContext,
): Promise<void> {
  const outputPath = path.join(projectDir, 'agents', `${agentName}.md`)
  await renderTemplateFile(templatePath, outputPath, context)
}

export async function copyCommandTemplate(
  templatePath: string,
  projectDir: string,
  commandName: string,
  context: TemplateContext,
): Promise<void> {
  const outputPath = path.join(projectDir, 'commands', `${commandName}.md`)
  await renderTemplateFile(templatePath, outputPath, context)
}

export async function addMcpServer(
  projectDir: string,
  serverName: string,
  config: Record<string, unknown>,
): Promise<void> {
  const mcpPath = path.join(projectDir, '.mcp.json')
  const existing = (await fs.pathExists(mcpPath))
    ? ((await fs.readJson(mcpPath)) as Record<string, unknown>)
    : { mcpServers: {} }

  const mcpServers = (existing.mcpServers ?? {}) as Record<string, unknown>
  const updated = {
    ...existing,
    mcpServers: {
      ...mcpServers,
      [serverName]: config,
    },
  }

  await fs.writeJson(mcpPath, updated, { spaces: 2 })
}

export async function addHookEntries(
  projectDir: string,
  hookType: string,
  entries: readonly Record<string, unknown>[],
): Promise<void> {
  const hooksPath = path.join(projectDir, 'hooks', 'hooks.json')
  const existing = (await fs.pathExists(hooksPath))
    ? ((await fs.readJson(hooksPath)) as Record<string, unknown>)
    : { hooks: {} }

  const hooks = (existing.hooks ?? {}) as Record<string, unknown[]>
  const existingEntries = hooks[hookType] ?? []
  const updated = {
    ...existing,
    hooks: {
      ...hooks,
      [hookType]: [...existingEntries, ...entries],
    },
  }

  await fs.writeJson(hooksPath, updated, { spaces: 2 })
}

export function getTemplateDir(integrationId: string): string {
  return path.join(
    getTemplatesRoot(import.meta.dirname),
    'integrations',
    integrationId,
  )
}

export function getCustomTemplateDir(integrationId: string): string {
  return path.join(
    getTemplatesRoot(import.meta.dirname),
    'custom',
    integrationId,
  )
}

export function getContentDir(): string {
  return getContentRoot(import.meta.dirname)
}

export async function copyContentSkill(
  skillName: string,
  projectDir: string,
  context: TemplateContext,
  customizable = false,
): Promise<void> {
  const contentDir = getContentDir()
  const sourceDir = path.join(contentDir, 'skills', skillName)
  const outputDir = path.join(projectDir, 'skills', skillName)
  await copyContentDir(sourceDir, outputDir, context, customizable)
}

export async function copyContentAgent(
  agentName: string,
  projectDir: string,
  context: TemplateContext,
  customizable = false,
): Promise<void> {
  const contentDir = getContentDir()
  const sourcePath = path.join(contentDir, 'agents', `${agentName}.md`)
  const outputPath = path.join(projectDir, 'agents', `${agentName}.md`)
  await copyWithCustomization(sourcePath, outputPath, context, customizable)
}

export async function copyContentCommand(
  commandName: string,
  projectDir: string,
  context: TemplateContext,
  customizable = false,
): Promise<void> {
  const contentDir = getContentDir()
  const sourcePath = path.join(contentDir, 'commands', `${commandName}.md`)
  const outputPath = path.join(projectDir, 'commands', `${commandName}.md`)
  await copyWithCustomization(sourcePath, outputPath, context, customizable)
}

export async function copyContentRule(
  rulePath: string,
  projectDir: string,
  context: TemplateContext,
  customizable = false,
): Promise<void> {
  const contentDir = getContentDir()
  const sourcePath = path.join(contentDir, 'rules', rulePath)
  const outputPath = path.join(projectDir, 'rules', rulePath)
  await copyWithCustomization(sourcePath, outputPath, context, customizable)
}

export async function copyContentHookScript(
  scriptName: string,
  projectDir: string,
): Promise<void> {
  const contentDir = getContentDir()
  const sourcePath = path.join(contentDir, 'hooks', 'scripts', scriptName)
  const outputDir = path.join(projectDir, 'hooks', 'scripts')
  await fs.ensureDir(outputDir)
  await fs.copy(sourcePath, path.join(outputDir, scriptName))
}
