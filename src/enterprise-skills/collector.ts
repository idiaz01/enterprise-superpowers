import { input, confirm } from '@inquirer/prompts'
import fs from 'fs-extra'
import path from 'path'
import type { EnterpriseSkill } from '../core/types.js'

export async function collectEnterpriseSkills(): Promise<
  readonly EnterpriseSkill[]
> {
  const hasSkills = await confirm({
    message:
      'Do you have existing enterprise skills or plugins to include? (e.g. company-specific skills, custom workflows)',
    default: false,
  })

  if (!hasSkills) return []

  const pathsInput = await input({
    message:
      'Path to skills directory or individual SKILL.md files (comma-separated):',
    validate: (value) =>
      value.trim().length > 0 || 'Please enter at least one path',
  })

  const rawPaths = pathsInput
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  const skills: EnterpriseSkill[] = []

  for (const rawPath of rawPaths) {
    const resolved = path.resolve(rawPath)
    const exists = await fs.pathExists(resolved)

    if (!exists) {
      console.log(`  Warning: Path not found, skipping: ${resolved}`)
      continue
    }

    const stat = await fs.stat(resolved)

    if (stat.isDirectory()) {
      const dirSkills = await collectSkillsFromDirectory(resolved)
      skills.push(...dirSkills)
    } else if (resolved.endsWith('SKILL.md')) {
      const name = path.basename(path.dirname(resolved))
      skills.push({
        name: name === '.' ? path.basename(resolved, '.md') : name,
        sourcePath: stat.isFile() ? path.dirname(resolved) : resolved,
        isDirectory: false,
      })
    } else {
      console.log(
        `  Warning: Not a SKILL.md file or directory, skipping: ${resolved}`,
      )
    }
  }

  if (skills.length > 0) {
    console.log(`\n  Found ${skills.length} enterprise skill(s):`)
    for (const skill of skills) {
      console.log(`    - ${skill.name}`)
    }
    console.log()
  }

  return skills
}

async function collectSkillsFromDirectory(
  dirPath: string,
): Promise<EnterpriseSkill[]> {
  const skills: EnterpriseSkill[] = []

  const skillMd = path.join(dirPath, 'SKILL.md')
  if (await fs.pathExists(skillMd)) {
    skills.push({
      name: path.basename(dirPath),
      sourcePath: dirPath,
      isDirectory: true,
    })
    return skills
  }

  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const entrySkillMd = path.join(dirPath, entry.name, 'SKILL.md')
    if (await fs.pathExists(entrySkillMd)) {
      skills.push({
        name: entry.name,
        sourcePath: path.join(dirPath, entry.name),
        isDirectory: true,
      })
    }
  }

  if (skills.length === 0) {
    console.log(`  Warning: No skills found in directory: ${dirPath}`)
  }

  return skills
}
