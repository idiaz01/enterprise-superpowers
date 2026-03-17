import chalk from 'chalk'
import ora from 'ora'
import { readProjectConfig } from '../core/config.js'
import { addIntegrationsToProject } from '../core/generator.js'
import { promptAddIntegrations } from '../prompts/add-prompts.js'
import { isInstallerAvailable } from '../integrations/registry.js'

export async function addCommand(integrationArg?: string): Promise<void> {
  const projectDir = process.cwd()
  const config = await readProjectConfig(projectDir)

  if (!config) {
    console.log(
      chalk.red(
        '\nError: Not inside an Enterprise Superpowers project. Run "enterprise-superpowers init" first.\n',
      ),
    )
    process.exit(1)
  }

  let integrationIds: readonly string[]

  if (integrationArg) {
    if (!isInstallerAvailable(integrationArg)) {
      console.log(
        chalk.red(
          `\nError: Integration "${integrationArg}" is not available.\n`,
        ),
      )
      process.exit(1)
    }
    if (config.enabledIntegrations.includes(integrationArg)) {
      console.log(
        chalk.yellow(
          `\nIntegration "${integrationArg}" is already enabled.\n`,
        ),
      )
      return
    }
    integrationIds = [integrationArg]
  } else {
    integrationIds = await promptAddIntegrations(
      config.enabledIntegrations,
    )
  }

  if (integrationIds.length === 0) {
    console.log('\nNo integrations selected.\n')
    return
  }

  const spinner = ora(
    `Adding ${integrationIds.length} integration(s)...`,
  ).start()

  try {
    await addIntegrationsToProject(projectDir, integrationIds, config)
    spinner.succeed('Integrations added!')
    console.log(
      `\n${chalk.green('Added:')} ${chalk.cyan(integrationIds.join(', '))}\n`,
    )
  } catch (error) {
    spinner.fail('Failed to add integrations')
    const message =
      error instanceof Error ? error.message : 'Unknown error'
    console.error(chalk.red(`\nError: ${message}\n`))
    process.exit(1)
  }
}
