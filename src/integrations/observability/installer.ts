import {
  createIntegration,
  addMcpServer,
} from '../base-integration.js'
import type { InstallerOptions, IntegrationMeta } from '../../core/types.js'

const meta: IntegrationMeta = {
  id: 'observability',
  name: 'Observability',
  category: 'development',
  description:
    'Grafana dashboards, Sentry error tracking, and monitoring via official MCP servers',
  components: ['mcp'],
}

async function install(options: InstallerOptions): Promise<void> {
  await addMcpServer(options.projectDir, 'grafana', {
    command: 'uvx',
    args: ['mcp-grafana'],
    env: {
      GRAFANA_URL: 'YOUR_GRAFANA_URL_HERE',
      GRAFANA_SERVICE_ACCOUNT_TOKEN: 'YOUR_GRAFANA_TOKEN_HERE',
    },
    description:
      'Grafana — dashboards, alerts, Prometheus/Loki queries, incidents, oncall',
  })

  await addMcpServer(options.projectDir, 'sentry', {
    type: 'http',
    url: 'https://mcp.sentry.dev/sse',
    description:
      'Sentry error tracking — issues, events, releases, and performance monitoring',
  })
}

export const observabilityInstaller = createIntegration(meta, install)
