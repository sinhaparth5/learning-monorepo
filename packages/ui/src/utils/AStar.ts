import { GridNode, CellStatus } from './types.js';

const astar = async (
    start: GridNode, 
    end: GridNode, 
    grid: GridNode[][], 
    onVisit: (node: GridNode, status: CellStatus) => void
): Promise<GridNode[]> => {
    const openSet: GridNode[] = [start];
    const closedSet: GridNode[] = [];
    const path: GridNode[] = [];

    // Initialize start node
    start.g = 0;
    start.h = heuristic(start, end);
    start.f = start.g + start.h;

    while (openSet.length > 0) {
        let current = openSet.reduce((a, b) => (a.f < b.f ? a : b));

        if (current !== start && current !== end) {
            onVisit(current, 'visited');
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        if (current.x === end.x && current.y === end.y) {
            while (current.parent) {
                path.push(current);
                if (current !== end) {
                    onVisit(current, 'path');
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
                current = current.parent;
            }
            return path.reverse();
        }

        openSet.splice(openSet.indexOf(current), 1);
        closedSet.push(current);

        const neighbors = getNeighbors(current, grid);
        for (const neighbor of neighbors) {
            if (closedSet.includes(neighbor) || neighbor.status === 'obstacle') continue;

            const tentativeG = current.g + 1;
            if (!openSet.includes(neighbor) || tentativeG < neighbor.g) {
                neighbor.g = tentativeG;
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return [];
};

const heuristic = (a: GridNode, b: GridNode): number => 
    Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const getNeighbors = (node: GridNode, grid: GridNode[][]): GridNode[] => {
    const neighbors: GridNode[] = [];
    const { x, y } = node;
    
    const directions = [
        { dy: -1, dx: 0 },
        { dy: 1, dx: 0 },
        { dy: 0, dx: -1 },
        { dy: 0, dx: 1 }
    ];
    
    for (const { dy, dx } of directions) {
        const newY = y + dy;
        const newX = x + dx;
        
        if (
            newY >= 0 && 
            newY < grid.length && 
            newX >= 0 && 
            grid[newY]?.length && 
            newX < grid[newY].length
        ) {
            const neighbor = grid[newY][newX];
            if (neighbor) {
                neighbors.push(neighbor);
            }
        }
    }
    
    return neighbors;
};

export default astar;