import { PokemonTypeKey } from "@/config/pokemonTypes";
import { create } from "zustand";

interface PokeTypeState {
    selectedTypes: PokemonTypeKey[];
    toggleType: (type: PokemonTypeKey) => void;
    resetTypes: () => void;
}

export const usePokeTypeStore = create<PokeTypeState>((set) => ({
    selectedTypes: [],
    toggleType: (type) => {
        set((state) => {
            const newSelectedTypes = state.selectedTypes.includes(type)
            ? state.selectedTypes.filter
        })
    },

    resetTypes:
}))