import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AppState {
  allowed: boolean
  updateAllowed: (isAllowed: boolean) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        allowed: false,
        updateAllowed: (isAllowed: boolean) => set(() => ({ allowed: isAllowed})),
      }),
      {
        name: 'app-storage',
      },
    ),
  ),
)