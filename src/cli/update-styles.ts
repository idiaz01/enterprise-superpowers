import chalk from 'chalk'
import ora from 'ora'
import { readProjectConfig, readDesignSystem } from '../core/config.js'
import { generateDesignSystem } from '../design-system/generator.js'
import { promptUpdateStyles } from '../prompts/styles-prompts.js'
import type { IntegrationMeta, TemplateContext } from '../core/types.js'
import { VERSION } from '../core/constants.js'
import { getIntegrationById } from '../integrations/registry.js'

export async function updateStylesCommand(): Promise<void> {
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

  const existingDesignSystem = await readDesignSystem(projectDir)

  if (!existingDesignSystem) {
    console.log(
      chalk.red('\nError: No design system configuration found.\n'),
    )
    process.exit(1)
  }

  const updatedDesignSystem = await promptUpdateStyles(existingDesignSystem)

  const integrationMetas = config.enabledIntegrations
    .map(getIntegrationById)
    .filter((i): i is IntegrationMeta => i !== undefined)

  const context: TemplateContext = {
    companyName: config.companyName,
    companySlug: config.companySlug,
    designSystem: updatedDesignSystem,
    integrations: integrationMetas,
    generatedAt: new Date().toISOString().split('T')[0],
    version: VERSION,
  }

  const spinner = ora('Updating design system...').start()

  try {
    await generateDesignSystem(projectDir, updatedDesignSystem, context)
    spinner.succeed('Design system updated!')
    console.log(
      `\n${chalk.green('Updated:')} Design system for ${chalk.bold(config.companyName)}\n`,
    )
  } catch (error) {
    spinner.fail('Failed to update design system')
    const message =
      error instanceof Error ? error.message : 'Unknown error'
    console.error(chalk.red(`\nError: ${message}\n`))
    process.exit(1)
  }
}
