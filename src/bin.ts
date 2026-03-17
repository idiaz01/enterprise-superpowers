import { Command } from 'commander'
import { VERSION } from './core/constants.js'
import { initCommand } from './cli/init.js'
import { addCommand } from './cli/add.js'
import { updateStylesCommand } from './cli/update-styles.js'
import { listCommand } from './cli/list.js'
import { destroyCommand } from './cli/destroy.js'

const program = new Command()

program
  .name('enterprise-superpowers')
  .description(
    'CLI tool that scaffolds AI coding assistant plugins for enterprise teams',
  )
  .version(VERSION)

program
  .command('init [company-name]')
  .description('Create a new enterprise superpowers plugin')
  .action(async (companyName?: string) => {
    await initCommand(companyName)
  })

program
  .command('add [integration]')
  .description('Add an integration to an existing project')
  .action(async (integration?: string) => {
    await addCommand(integration)
  })

program
  .command('update-styles')
  .description('Update company design system assets')
  .action(async () => {
    await updateStylesCommand()
  })

program
  .command('list')
  .description('List all available integrations')
  .action(async () => {
    await listCommand()
  })

program
  .command('destroy [path]')
  .description('Delete a generated superpowers project')
  .action(async (projectPath?: string) => {
    await destroyCommand(projectPath)
  })

program.parse()
