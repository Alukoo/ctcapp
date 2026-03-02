import { create } from "zustand";

interface FavoritesStore {
  favorites: string[];
  recentlyOpened: string[];
  toggleFavorite: (id: string) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addRecentlyOpened: (id: string) => void;
  getRecentlyOpened: () => string[];
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  recentlyOpened: [],

  toggleFavorite: (id: string) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fav) => fav !== id)
        : [...state.favorites, id],
    })),

  addFavorite: (id: string) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites
        : [...state.favorites, id],
    })),

  removeFavorite: (id: string) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav !== id),
    })),

  isFavorite: (id: string) => {
    return get().favorites.includes(id);
  },

  addRecentlyOpened: (id: string) =>
    set((state) => {
      let recent = state.recentlyOpened.filter((item) => item !== id);
      recent.unshift(id);
      recent = recent.slice(0, 10);
      return { recentlyOpened: recent };
    }),

  getRecentlyOpened: () => get().recentlyOpened,
}));

