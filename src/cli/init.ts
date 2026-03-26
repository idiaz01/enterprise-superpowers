import chalk from 'chalk'
import ora from 'ora'
import fs from 'fs-extra'
import { promptInit } from '../prompts/init-prompts.js'
import { generatePlugin } from '../core/generator.js'

export async function initCommand(companyName?: string): Promise<void> {
  console.log(chalk.bold('\nEnterprise Superpowers\n'))

  const answers = await promptInit(companyName)

  const outputDir = process.cwd()
  const projectDir = `${answers.companySlug}-superpowers`

  if (await fs.pathExists(projectDir)) {
    console.log(
      chalk.red(
        `\nError: Directory "${projectDir}" already exists. Please choose a different name or remove the existing directory.\n`,
      ),
    )
    process.exit(1)
  }

  const spinner = ora('Generating your enterprise superpowers...').start()

  try {
    await generatePlugin({
      companyName: answers.companyName,
      companySlug: answers.companySlug,
      enterpriseSkills: answers.enterpriseSkills,
      designSystem: answers.designSystem,
      selectedIntegrations: answers.selectedIntegrations,
      outputDir,
    })

    spinner.succeed('Enterprise superpowers generated!')

    console.log(
      `\n${chalk.green('Success!')} Created ${chalk.bold(projectDir)}\n`,
    )
    console.log('Next steps:\n')
    console.log(`  1. Install the plugin persistently:`)
    console.log(`     ${chalk.cyan(`cd ${projectDir} && bash setup.sh`)}\n`)
    console.log(`  2. Or load for this session only:`)
    console.log(`     ${chalk.cyan(`claude --plugin-dir ./${projectDir}`)}\n`)
    console.log(
      `  3. For team distribution, push to GitHub and register as a marketplace:`,
    )
    console.log(
      `     ${chalk.cyan(`/plugin marketplace add your-org/${projectDir}`)}\n`,
    )
    console.log(
      `  Use ${chalk.cyan('/reload-plugins')} inside a session to pick up changes without restarting.\n`,
    )

    if (answers.enterpriseSkills.length > 0) {
      console.log(chalk.bold('Enterprise skills:'))
      console.log(
        `  Imported: ${chalk.cyan(answers.enterpriseSkills.map((s) => s.name).join(', '))}`,
      )
      console.log()
    }

    console.log(chalk.bold('Design system:'))
    console.log(
      `  Colors:   ${chalk.cyan(answers.designSystem.colors.length > 0 ? answers.designSystem.colors.map((c) => c.hex).join(', ') : 'defaults')}`,
    )
    console.log(
      `  Fonts:    ${chalk.cyan(answers.designSystem.fonts.length > 0 ? answers.designSystem.fonts.map((f) => f.name).join(', ') : 'not set')}`,
    )
    console.log(
      `  Logos:    ${chalk.cyan(answers.designSystem.logos.length > 0 ? answers.designSystem.logos.map((l) => `${l.type} → assets/logos/`).join(', ') : 'not set')}`,
    )
    console.log(
      `  Examples: ${chalk.cyan(answers.designSystem.examplesDir ? `copied to assets/examples/` : 'not set')}`,
    )

    if (answers.selectedIntegrations.length > 0) {
      console.log(
        `\nIntegrations enabled: ${chalk.cyan(answers.selectedIntegrations.join(', '))}`,
      )
    }

    console.log(`\nCustomize skills in ${chalk.cyan(`${projectDir}/skills/`)}`)
    console.log(
      `Update design system with ${chalk.cyan('enterprise-superpowers update-styles')}\n`,
    )
  } catch (error) {
    spinner.fail('Failed to generate superpowers')
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error(chalk.red(`\nError: ${message}\n`))
    process.exit(1)
  }
}
