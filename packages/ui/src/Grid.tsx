import React from "react";
import { Stage, Layer, Rect } from 'react-konva';

interface CellProps {
    x: number;
    y: number;
    status: 'start' | 'end' | 'obstacle' | 'open' | 'visited';
}

const colors = {
    start: 'green',
    end: 'red',
    obstacle: 'black',
    open: 'white',
    visited: 'blue',
};

const Cell: React.FC<CellProps> = ({ x, y, status }) => {
    return (
        <Rect
            x={x * 20}
            y={y * 20}
            width={20}
            height={20}
            fill={colors[status]}
            stroke="grey"
        />
    );
};

const Grid: React.FC<{ rows: number; cols: number}> = ({ rows, cols }) => {
    const grid = Array.from({ length: rows }, (_, y) => 
        Array.from({ length: cols }, (_, x) => ({
            x,
            y,
            status: 'open' as 'open',
        })));

    return (
        <Stage width={cols * 20} height={rows * 20}>
            <Layer>
                {grid.flat().map((cell, i) => (
                    <Cell key={i} {...cell} />
                ))}
            </Layer>
        </Stage>
    );
};


export default Grid;
