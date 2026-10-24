import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  favorites: string[]
  bestScore: number
  toggleFavorite: (id: string) => void
  setBestScore: (score: number) => void
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      favorites: [],
      bestScore: 0,
      toggleFavorite: (id) =>
        set({
          favorites: get().favorites.includes(id)
            ? get().favorites.filter((x) => x !== id)
            : [...get().favorites, id],
        }),
      setBestScore: (score) => set({ bestScore: Math.max(get().bestScore, score) }),
    }),
    { name: 'cosmos-atlas' },
  ),
)
