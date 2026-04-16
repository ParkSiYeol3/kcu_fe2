import { Session } from "next-auth";
import { create } from "zustand";

interface UserState {
  favorites: number[],
  setFavorite: (favorites:number[]) => void;
  addFavorite: (id:number) => void;
  removeFavorite: (id:number) => void;
  loadFavorites: (session:Session | null) => Promise<void>
}
// const state = { favorites: []}
export const useUserStore = create<UserState>( (set) => {
  return {
    favorites: [],
    setFavorite: (favorites) => set({favorites}),
    addFavorite: (id) => set((state)=>(
      {favorites:[...state.favorites, id]}
    )),
    removeFavorite: (id) => set((state)=>(
      {favorites : state.favorites.filter(f=>f!==id) }
    )),
    loadFavorites: async (session:Session | null) => {
      if(!session) {
        set({favorites:[]})
        return
      }
      try {
        const data = await fetch('/api/favorites').then(res=>res.json());
        set({favorites:data})
      } catch(err) {
        console.log('loadFavorites Error: ', err)
        set({favorites:[]})
      }
    }
  }
} )