export type CellStatus = 'start' | 'end' | 'obstacle' | 'open' | 'visited' | 'path';

export interface GridNode {
    x: number;
    y: number;
    g: number;
    h: number;
    f: number;
    status: CellStatus;
    parent?: GridNode;
}