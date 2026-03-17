import path from 'path'
import fs from 'fs-extra'

/**
 * Resolves the package root directory.
 * Works both when bundled (dist/bin.js) and unbundled (src/core/paths.ts).
 * Walks up from import.meta.dirname until it finds package.json.
 */
export function getPackageRoot(startDir: string): string {
  let dir = startDir
  while (dir !== path.dirname(dir)) {
    if (fs.pathExistsSync(path.join(dir, 'package.json'))) {
      return dir
    }
    dir = path.dirname(dir)
  }
  return startDir
}

export function getTemplatesRoot(startDir: string): string {
  return path.join(getPackageRoot(startDir), 'templates')
}

export function getContentRoot(startDir: string): string {
  return path.join(getPackageRoot(startDir), 'content')
}
