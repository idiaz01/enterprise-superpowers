import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import { confirm } from '@inquirer/prompts'
import { readProjectConfig } from '../core/config.js'

export async function destroyCommand(projectPath?: string): Promise<void> {
  const targetDir = projectPath
    ? path.resolve(projectPath)
    : process.cwd()

  const config = await readProjectConfig(targetDir)

  if (!config) {
    console.log(
      chalk.red(
        `\nError: "${path.basename(targetDir)}" is not an Enterprise Superpowers project.\n`,
      ),
    )
    process.exit(1)
  }

  const dirName = path.basename(targetDir)

  console.log(
    `\n${chalk.yellow('Warning:')} This will permanently delete the following project:\n`,
  )
  console.log(`  ${chalk.bold(dirName)}`)
  console.log(`  Company: ${chalk.cyan(config.companyName)}`)
  console.log(`  Integrations: ${chalk.cyan(config.enabledIntegrations.join(', ') || 'none')}`)
  console.log(`  Path: ${chalk.dim(targetDir)}\n`)

  const confirmed = await confirm({
    message: `Are you sure you want to delete "${dirName}"?`,
    default: false,
  })

  if (!confirmed) {
    console.log('\nCancelled. Nothing was deleted.\n')
    return
  }

  const doubleConfirmed = await confirm({
    message: `This cannot be undone. Type yes to confirm deletion:`,
    default: false,
  })

  if (!doubleConfirmed) {
    console.log('\nCancelled. Nothing was deleted.\n')
    return
  }

  try {
    await fs.remove(targetDir)
    console.log(
      `\n${chalk.green('Deleted:')} ${chalk.bold(dirName)} has been removed.\n`,
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error(chalk.red(`\nError: Failed to delete — ${message}\n`))
    process.exit(1)
  }
}
