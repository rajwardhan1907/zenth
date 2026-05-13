import { create } from 'zustand'
import { Site } from '@/types/site'

type SiteStore = {
  activeSite: Site | null
  setActiveSite: (site: Site) => void
}

export const useSiteStore = create<SiteStore>((set) => ({
  activeSite: null,
  setActiveSite: (site) => set({ activeSite: site }),
}))
