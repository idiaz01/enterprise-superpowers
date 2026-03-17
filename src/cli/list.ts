import chalk from 'chalk'
import {
  getGroupedIntegrations,
  getCategories,
  isInstallerAvailable,
} from '../integrations/registry.js'
import { readProjectConfig } from '../core/config.js'

export async function listCommand(): Promise<void> {
  const config = await readProjectConfig(process.cwd())
  const enabledIds = config?.enabledIntegrations ?? []

  console.log(chalk.bold('\nAvailable Integrations\n'))

  const grouped = getGroupedIntegrations()
  const categories = getCategories()

  for (const category of categories) {
    const integrations = grouped.get(category.id)
    if (!integrations) continue

    console.log(chalk.bold.underline(`${category.name}`))
    console.log(chalk.dim(`  ${category.description}\n`))

    for (const integration of integrations) {
      const available = isInstallerAvailable(integration.id)
      const enabled = enabledIds.includes(integration.id)

      let status = ''
      if (enabled) {
        status = chalk.green(' [enabled]')
      } else if (!available) {
        status = chalk.dim(' (coming soon)')
      }

      const components = integration.components.join(', ')

      console.log(
        `  ${chalk.cyan(integration.name)}${status}`,
      )
      console.log(
        `    ${integration.description}`,
      )
      console.log(
        chalk.dim(`    Components: ${components}\n`),
      )
    }
  }

  if (config) {
    console.log(
      chalk.dim(
        `\nProject: ${config.companyName} | Enabled: ${enabledIds.length} integration(s)\n`,
      ),
    )
  } else {
    console.log(
      chalk.dim(
        '\nRun "enterprise-superpowers init <company>" to create a new project.\n',
      ),
    )
  }
}
