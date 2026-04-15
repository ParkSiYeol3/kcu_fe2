import { count } from "console";

interface CounterStore {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export const useCounterStore = create<CounterStore>( (set) => {
    return {
        count: 0,
        increment: () => set( (state) => ({ count: state.count + 1 }) ),
        decrement: () => set( (state) => ({ count: state.count - 1 }) ),
        reset: () => set({ count: 0 })
    }
})