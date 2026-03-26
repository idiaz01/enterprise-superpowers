import { input, checkbox, confirm } from '@inquirer/prompts'
import { collectDesignSystem } from '../design-system/collector.js'
import { collectEnterpriseSkills } from '../enterprise-skills/collector.js'
import {
  getAvailableIntegrations,
  getGroupedIntegrations,
  getCategories,
  isInstallerAvailable,
} from '../integrations/registry.js'
import type { DesignSystem, EnterpriseSkill } from '../core/types.js'
import { toSlug } from '../core/config.js'

export interface InitAnswers {
  readonly companyName: string
  readonly companySlug: string
  readonly enterpriseSkills: readonly EnterpriseSkill[]
  readonly designSystem: DesignSystem
  readonly selectedIntegrations: readonly string[]
}

export async function promptInit(
  companyNameArg?: string,
): Promise<InitAnswers> {
  const companyName =
    companyNameArg ??
    (await input({
      message: 'Company or project name:',
      validate: (value) => value.trim().length > 0 || 'Please enter a name',
    }))

  const companySlug = toSlug(companyName)

  console.log(
    `\nSetting up ${companyName} Superpowers (${companySlug}-superpowers)\n`,
  )

  const enterpriseSkills = await collectEnterpriseSkills()

  const designSystem = await collectDesignSystem(companyName)

  const selectedIntegrations = await promptIntegrations()

  return {
    companyName,
    companySlug,
    enterpriseSkills,
    designSystem,
    selectedIntegrations,
  }
}

async function promptIntegrations(): Promise<readonly string[]> {
  const available = getAvailableIntegrations()

  const installAll = await confirm({
    message: `Install all ${available.length} integrations? (recommended)`,
    default: true,
  })

  if (installAll) {
    return available.map((i) => i.id)
  }

  const grouped = getGroupedIntegrations()
  const categories = getCategories()

  const choices = []

  for (const category of categories) {
    const integrations = grouped.get(category.id)
    if (!integrations) continue

    choices.push({
      name: `--- ${category.name} ---`,
      value: `__separator_${category.id}`,
      disabled: category.description,
    })

    for (const integration of integrations) {
      const isAvailable = isInstallerAvailable(integration.id)
      choices.push({
        name: `${integration.name} - ${integration.description}`,
        value: integration.id,
        disabled: isAvailable ? false : '(coming soon)',
      })
    }
  }

  const selected = await checkbox({
    message: 'Select integrations to include:',
    choices,
    pageSize: 20,
  })

  return selected.filter((s) => !s.startsWith('__separator_'))
}
