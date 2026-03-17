import { describe, it, expect } from 'vitest'
import {
  getAllIntegrations,
  getIntegrationById,
  getIntegrationsByCategory,
  getAvailableIntegrations,
  getGroupedIntegrations,
  isInstallerAvailable,
  loadInstaller,
} from '../../../src/integrations/registry.js'
import { MVP_INTEGRATION_IDS } from '../../../src/core/constants.js'

describe('registry', () => {
  describe('getAllIntegrations', () => {
    it('should return all registered integrations', () => {
      const all = getAllIntegrations()
      expect(all.length).toBeGreaterThan(0)
    })

    it('should include all MVP integrations', () => {
      const all = getAllIntegrations()
      const ids = all.map((i) => i.id)
      for (const mvpId of MVP_INTEGRATION_IDS) {
        expect(ids).toContain(mvpId)
      }
    })
  })

  describe('getIntegrationById', () => {
    it('should find integration by id', () => {
      const jira = getIntegrationById('jira')
      expect(jira).toBeDefined()
      expect(jira?.name).toBe('Jira')
    })

    it('should return undefined for unknown id', () => {
      const result = getIntegrationById('nonexistent')
      expect(result).toBeUndefined()
    })
  })

  describe('getIntegrationsByCategory', () => {
    it('should filter by category', () => {
      const quality = getIntegrationsByCategory('quality')
      expect(quality.length).toBeGreaterThan(0)
      for (const i of quality) {
        expect(i.category).toBe('quality')
      }
    })

    it('should return empty for unknown category', () => {
      const result = getIntegrationsByCategory('unknown')
      expect(result).toEqual([])
    })
  })

  describe('getAvailableIntegrations', () => {
    it('should return only integrations with installers', () => {
      const available = getAvailableIntegrations()
      expect(available.length).toBe(MVP_INTEGRATION_IDS.length)
      for (const i of available) {
        expect(isInstallerAvailable(i.id)).toBe(true)
      }
    })
  })

  describe('isInstallerAvailable', () => {
    it('should return true for MVP integrations', () => {
      for (const id of MVP_INTEGRATION_IDS) {
        expect(isInstallerAvailable(id)).toBe(true)
      }
    })

    it('should return false for unimplemented integrations', () => {
      expect(isInstallerAvailable('nonexistent-integration')).toBe(false)
    })
  })

  describe('getGroupedIntegrations', () => {
    it('should group integrations by category', () => {
      const grouped = getGroupedIntegrations()
      expect(grouped.size).toBeGreaterThan(0)
      for (const [category, integrations] of grouped) {
        expect(integrations.length).toBeGreaterThan(0)
        for (const i of integrations) {
          expect(i.category).toBe(category)
        }
      }
    })
  })

  describe('loadInstaller', () => {
    it('should load a valid installer', async () => {
      const installer = await loadInstaller('jira')
      expect(installer).toBeDefined()
      expect(installer.meta.id).toBe('jira')
      expect(typeof installer.install).toBe('function')
    })

    it('should throw for unknown integration', async () => {
      await expect(loadInstaller('nonexistent')).rejects.toThrow(
        'No installer found',
      )
    })
  })
})
