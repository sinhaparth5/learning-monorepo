import React from "react";
import useGridStore from "../../../packages/ui/src/utils/GridState";
import Grid from "../../../packages/ui/src/Grid";
import astar from "../../../packages/ui/src/utils/AStar";
import { GridNode, CellStatus } from '../../../packages/ui/src/utils/types';

const Map: React.FC = () => {
    const { grid, setGrid } = useGridStore();

    const handleStart = async () => {
        // Check if grid exists and has valid dimensions
        if (!grid?.length || !grid[0]?.length) {
            console.warn('Grid is not properly initialized');
            return;
        }
    
        const start = grid[0]?.[0];
        const end = grid[grid.length - 1]?.[grid[0].length - 1];
    
        if (!start || !end) {
            console.warn('Start or end node not found');
            return;
        }
    
        const newGrid = grid.map((row, y) => 
            row.map((node, x) => ({
                x,
                y,
                g: 0,
                h: 0,
                f: 0,
                status: (
                    node.status === 'obstacle' || 
                    node.status === 'start' || 
                    node.status === 'end'
                ) ? node.status : ('open' as CellStatus),
                parent: undefined
            } satisfies GridNode))
        );
    
        const updateNode = (node: GridNode, status: CellStatus) => {
            const row = newGrid[node.y];
            if (row) {
                const target = row[node.x];
                if (target) {
                    target.status = status;
                    setGrid([...newGrid]);
                }
            }
        };
    
        try {
            await astar(start, end, newGrid, updateNode);
        } catch (error) {
            console.error('Pathfinding error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Grid rows={20} cols={20} />
            <button 
                onClick={handleStart}
                disabled={!grid || grid.length === 0}
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                Start A*
            </button>
        </div>
    );
};

export default Map;