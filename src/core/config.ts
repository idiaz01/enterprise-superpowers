import fs from 'fs-extra'
import path from 'path'
import type { DesignSystem, ProjectConfig } from './types.js'
import { CONFIG_FILE, DESIGN_SYSTEM_FILE } from './constants.js'

export async function readProjectConfig(
  projectDir: string,
): Promise<ProjectConfig | null> {
  const configPath = path.join(projectDir, CONFIG_FILE)
  const exists = await fs.pathExists(configPath)
  if (!exists) return null
  return fs.readJson(configPath) as Promise<ProjectConfig>
}

export async function writeProjectConfig(
  projectDir: string,
  config: ProjectConfig,
): Promise<void> {
  const configPath = path.join(projectDir, CONFIG_FILE)
  await fs.ensureDir(path.dirname(configPath))
  await fs.writeJson(configPath, config, { spaces: 2 })
}

export async function readDesignSystem(
  projectDir: string,
): Promise<DesignSystem | null> {
  const dsPath = path.join(projectDir, DESIGN_SYSTEM_FILE)
  const exists = await fs.pathExists(dsPath)
  if (!exists) return null
  return fs.readJson(dsPath) as Promise<DesignSystem>
}

export async function writeDesignSystem(
  projectDir: string,
  designSystem: DesignSystem,
): Promise<void> {
  const dsPath = path.join(projectDir, DESIGN_SYSTEM_FILE)
  await fs.ensureDir(path.dirname(dsPath))
  await fs.writeJson(dsPath, designSystem, { spaces: 2 })
}

export function mergeIntegrations(
  existing: readonly string[],
  added: readonly string[],
): readonly string[] {
  const combined = new Set([...existing, ...added])
  return [...combined].sort()
}

export function createUpdatedConfig(
  existing: ProjectConfig,
  updates: Partial<ProjectConfig>,
): ProjectConfig {
  return {
    ...existing,
    ...updates,
    enabledIntegrations:
      updates.enabledIntegrations ?? existing.enabledIntegrations,
    designSystem: updates.designSystem ?? existing.designSystem,
  }
}

export function isProjectDir(dir: string): boolean {
  return fs.pathExistsSync(path.join(dir, CONFIG_FILE))
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
