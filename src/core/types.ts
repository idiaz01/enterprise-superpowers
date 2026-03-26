export interface ColorEntry {
  readonly name: string
  readonly hex: string
}

export interface FontConfig {
  readonly name: string
  readonly filePath?: string
  readonly weight?: string
}

export interface LogoConfig {
  readonly path: string
  readonly type: 'primary' | 'icon'
}

export interface DesignSystem {
  readonly companyName: string
  readonly logos: readonly LogoConfig[]
  readonly fonts: readonly FontConfig[]
  readonly colors: readonly ColorEntry[]
  readonly examplesDir?: string
}

export interface EnterpriseSkill {
  readonly name: string
  readonly sourcePath: string
  readonly isDirectory: boolean
}

export interface IntegrationCategory {
  readonly id: string
  readonly name: string
  readonly description: string
}

export interface IntegrationMeta {
  readonly id: string
  readonly name: string
  readonly category: string
  readonly description: string
  readonly components: readonly IntegrationComponent[]
}

export type IntegrationComponent =
  | 'skill'
  | 'agent'
  | 'hook'
  | 'mcp'
  | 'command'
  | 'rule'

export interface TemplateContext {
  readonly companyName: string
  readonly companySlug: string
  readonly designSystem: DesignSystem
  readonly integrations: readonly IntegrationMeta[]
  readonly generatedAt: string
  readonly version: string
}

export interface InstallerOptions {
  readonly projectDir: string
  readonly companyName: string
  readonly companySlug: string
  readonly designSystem: DesignSystem
  readonly templateContext: TemplateContext
}

export interface Installer {
  readonly meta: IntegrationMeta
  install(options: InstallerOptions): Promise<void>
}

export interface ProjectConfig {
  readonly companyName: string
  readonly companySlug: string
  readonly designSystem: DesignSystem
  readonly enterpriseSkills: readonly string[]
  readonly enabledIntegrations: readonly string[]
  readonly version: string
  readonly generatedAt: string
}

export interface McpServerConfig {
  readonly command?: string
  readonly args?: readonly string[]
  readonly url?: string
  readonly env?: Record<string, string>
}

export interface McpConfig {
  readonly mcpServers: Record<string, McpServerConfig>
}

export interface HookEntry {
  readonly type: string
  readonly command: string
  readonly description: string
}

export interface HooksConfig {
  readonly hooks: Record<string, readonly HookEntry[]>
}
