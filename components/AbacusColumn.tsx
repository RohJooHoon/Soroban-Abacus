import React from 'react';
import type { ColumnState } from '../types';
import Bead from './Bead';

interface AbacusColumnProps {
  columnIndex: number;
  state: ColumnState;
  onUpperBeadClick: (columnIndex: number) => void;
  onLowerBeadClick: (columnIndex: number, beadIndex: number) => void;
}

const AbacusColumn: React.FC<AbacusColumnProps> = ({
  columnIndex,
  state,
  onUpperBeadClick,
  onLowerBeadClick,
}) => {
  return (
    <div className="w-[50px] h-full flex flex-col relative">
      {/* Rod */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#8d745a] z-0" />

      {/* Upper Deck */}
      <div className="flex-[2] flex flex-col justify-start items-center z-10">
        <Bead
          isActive={state.upperBeadActive}
          onClick={() => onUpperBeadClick(columnIndex)}
          isUpper={true}
        />
      </div>

      {/* Spacer for the beam */}
      <div className="h-[12px] flex-shrink-0" />

      {/* Lower Deck */}
      <div className="flex-[5] flex flex-col-reverse justify-start items-center gap-1 z-10">
        {[...Array(4)].map((_, beadIndex) => (
          <Bead
            key={beadIndex}
            isActive={state.lowerBeads[beadIndex]}
            onClick={() => onLowerBeadClick(columnIndex, beadIndex)}
            isUpper={false}
          />
        ))}
      </div>
    </div>
  );
};

export default AbacusColumn;
