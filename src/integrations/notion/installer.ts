import {
  createIntegration,
  addMcpServer,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'notion',
  name: 'Notion',
  category: 'collaboration',
  description: 'Project docs, wikis, and databases',
  components: ['mcp'],
}

async function install(options: InstallerOptions): Promise<void> {
  await addMcpServer(options.projectDir, 'notion', {
    command: 'npx',
    args: ['-y', '@notionhq/notion-mcp-server'],
    env: {
      NOTION_API_KEY: '${NOTION_API_KEY}',
    },
  })
}

export const notionInstaller = createIntegration(meta, install)
