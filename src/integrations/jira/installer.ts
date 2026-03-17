import {
  createIntegration,
  copySkillTemplate,
  copyAgentTemplate,
  addMcpServer,
  getCustomTemplateDir,
} from '../base-integration.js'
import path from 'path'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'jira',
  name: 'Jira',
  category: 'project-management',
  description: 'Task management, sprint tracking, and backlog analysis',
  components: ['skill', 'mcp', 'agent'],
}

async function install(options: InstallerOptions): Promise<void> {
  const templateDir = getCustomTemplateDir('jira')

  await copySkillTemplate(
    path.join(templateDir, 'skills', 'SKILL.md.hbs'),
    options.projectDir,
    'jira-workflow',
    options.templateContext,
  )

  await copyAgentTemplate(
    path.join(templateDir, 'agents', 'jira-analyst.md.hbs'),
    options.projectDir,
    'jira-analyst',
    options.templateContext,
  )

  await addMcpServer(options.projectDir, 'jira', {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-jira'],
    env: {
      JIRA_BASE_URL: 'https://your-company.atlassian.net',
      JIRA_API_TOKEN: '${JIRA_API_TOKEN}',
      JIRA_USER_EMAIL: '${JIRA_USER_EMAIL}',
    },
  })
}

export const jiraInstaller = createIntegration(meta, install)
