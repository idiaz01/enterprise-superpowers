import { checkbox } from '@inquirer/prompts'
import {
  getAvailableIntegrations,
  getCategories,
  getGroupedIntegrations,
  isInstallerAvailable,
} from '../integrations/registry.js'

export async function promptAddIntegrations(
  existingIntegrations: readonly string[],
): Promise<readonly string[]> {
  const grouped = getGroupedIntegrations()
  const categories = getCategories()

  const choices = []

  for (const category of categories) {
    const integrations = grouped.get(category.id)
    if (!integrations) continue

    const availableInCategory = integrations.filter(
      (i) =>
        isInstallerAvailable(i.id) &&
        !existingIntegrations.includes(i.id),
    )
    if (availableInCategory.length === 0) continue

    choices.push({
      name: `--- ${category.name} ---`,
      value: `__separator_${category.id}`,
      disabled: category.description,
    })

    for (const integration of availableInCategory) {
      choices.push({
        name: `${integration.name} - ${integration.description}`,
        value: integration.id,
      })
    }
  }

  if (choices.length === 0) {
    console.log('All available integrations are already enabled.')
    return []
  }

  const selected = await checkbox({
    message: 'Select integrations to add:',
    choices,
    pageSize: 20,
  })

  return selected.filter((s) => !s.startsWith('__separator_'))
}

export function getAvailableToAdd(
  existing: readonly string[],
): readonly string[] {
  return getAvailableIntegrations()
    .filter((i) => !existing.includes(i.id))
    .map((i) => i.id)
}
