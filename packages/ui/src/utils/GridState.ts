import { create } from 'zustand';
import { GridNode } from './types.js';

interface GridState {
    grid: GridNode[][];
    setGrid: (newGrid: GridNode[][]) => void;
}

const useGridStore = create<GridState>((set) => ({
    grid: [],
    setGrid: (newGrid) => set({ grid: newGrid }),
}));

export default useGridStore;