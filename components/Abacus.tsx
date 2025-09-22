import React from 'react';
import type { ColumnState } from '../types';
import AbacusColumn from './AbacusColumn';

interface AbacusProps {
  columns: ColumnState[];
  onUpperBeadClick: (columnIndex: number) => void;
  onLowerBeadClick: (columnIndex: number, beadIndex: number) => void;
}

const Abacus: React.FC<AbacusProps> = ({ columns, onUpperBeadClick, onLowerBeadClick }) => {
  return (
    <div className="w-[850px] h-[280px] bg-[#c4a98a] p-4 rounded-lg border-8 border-[#5f4632] shadow-2xl relative select-none">
      <div className="w-full h-full relative">
        <div className="flex justify-between w-full h-full">
          {columns.map((col, index) => (
            <AbacusColumn
              key={col.id}
              columnIndex={index}
              state={col}
              onUpperBeadClick={onUpperBeadClick}
              onLowerBeadClick={onLowerBeadClick}
            />
          ))}
        </div>
        
        {/* Beam with reference dots */}
        <div className="absolute top-[calc(2/7*100%-5px)] left-0 right-0 h-3 bg-[#5f4632] shadow-md flex justify-between items-center px-[calc(50px/2)] z-20">
          {[...Array(17)].map((_, index) => (
            <div key={index} className="w-0 relative h-full flex items-center">
              {/* Show dots on 3rd, 6th, 9th, 12th, and 15th columns (indices 2, 5, 8, 11, 14) */}
              {[2, 5, 8, 11, 14].includes(index) && (
                <div className="absolute w-2 h-2 bg-white rounded-full -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Abacus;