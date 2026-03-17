import {
  createIntegration,
  addMcpServer,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'confluence',
  name: 'Confluence',
  category: 'collaboration',
  description: 'Wiki documentation and knowledge base',
  components: ['mcp'],
}

async function install(options: InstallerOptions): Promise<void> {
  // Official MCP server from ECC's mcp-servers.json
  await addMcpServer(options.projectDir, 'confluence', {
    command: 'npx',
    args: ['-y', 'confluence-mcp-server'],
    env: {
      CONFLUENCE_BASE_URL: '${CONFLUENCE_BASE_URL}',
      CONFLUENCE_EMAIL: '${CONFLUENCE_EMAIL}',
      CONFLUENCE_API_TOKEN: '${CONFLUENCE_API_TOKEN}',
    },
  })
}

export const confluenceInstaller = createIntegration(meta, install)
