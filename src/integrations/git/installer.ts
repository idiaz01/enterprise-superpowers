import {
  createIntegration,
  copyContentSkill,
  copyContentAgent,
  copyContentRule,
  addMcpServer,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'git',
  name: 'Git (Lab/Hub)',
  category: 'development',
  description: 'Git workflows, branch conventions, and commit standards',
  components: ['skill', 'agent', 'rule', 'mcp'],
}

async function install(options: InstallerOptions): Promise<void> {
  // Superpowers skills (real content)
  await copyContentSkill('finishing-a-development-branch', options.projectDir, options.templateContext)
  await copyContentSkill('using-git-worktrees', options.projectDir, options.templateContext)

  // Superpowers agent (real content)
  await copyContentAgent('code-reviewer', options.projectDir, options.templateContext)

  // ECC rule (real content)
  await copyContentRule('common/git-workflow.md', options.projectDir, options.templateContext)

  // GitHub MCP server (official package from ECC)
  await addMcpServer(options.projectDir, 'github', {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: '${GITHUB_PERSONAL_ACCESS_TOKEN}',
    },
  })
}

export const gitInstaller = createIntegration(meta, install)
