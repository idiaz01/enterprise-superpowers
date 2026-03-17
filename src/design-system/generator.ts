import fs from 'fs-extra'
import path from 'path'
import type { DesignSystem, TemplateContext } from '../core/types.js'
import { renderTemplateFile } from '../core/template-engine.js'
import { writeDesignSystem } from '../core/config.js'
import { getTemplatesRoot } from '../core/paths.js'

export async function generateDesignSystem(
  projectDir: string,
  designSystem: DesignSystem,
  context: TemplateContext,
): Promise<void> {
  await writeDesignSystem(projectDir, designSystem)
  await generateDesignSystemSkill(projectDir, context)
  await generateDesignSystemRule(projectDir, context)
  await copyLogoFiles(projectDir, designSystem)
}

async function generateDesignSystemSkill(
  projectDir: string,
  context: TemplateContext,
): Promise<void> {
  const templatePath = path.join(
    getTemplatesRoot(import.meta.dirname),
    'skills',
    'design-system',
    'SKILL.md.hbs',
  )

  const outputPath = path.join(
    projectDir,
    'skills',
    'company-design-system',
    'SKILL.md',
  )

  await renderTemplateFile(templatePath, outputPath, context)
}

async function generateDesignSystemRule(
  projectDir: string,
  context: TemplateContext,
): Promise<void> {
  const templatePath = path.join(
    getTemplatesRoot(import.meta.dirname),
    'skills',
    'design-system',
    'rule.md.hbs',
  )

  const outputPath = path.join(projectDir, 'rules', 'design-system.md')

  await renderTemplateFile(templatePath, outputPath, context)
}

async function copyLogoFiles(
  projectDir: string,
  designSystem: DesignSystem,
): Promise<void> {
  for (const logo of designSystem.logos) {
    const srcPath = logo.path
    const exists = await fs.pathExists(srcPath)

    if (exists) {
      const fileName = path.basename(srcPath)
      const destPath = path.join(projectDir, 'assets', 'logos', fileName)
      await fs.ensureDir(path.dirname(destPath))
      await fs.copy(srcPath, destPath)
    }
  }
}
