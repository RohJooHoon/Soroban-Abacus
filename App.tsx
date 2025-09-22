import React, { useState, useCallback, useEffect } from 'react';
import Abacus from './components/Abacus';
import type { ColumnState } from './types';

const getInitialState = (): ColumnState[] => {
  try {
    const savedState = localStorage.getItem('abacusState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (Array.isArray(parsedState) && parsedState.length === 17) {
        return parsedState;
      }
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }
  // Default state if nothing in localStorage or if data is invalid
  return Array.from({ length: 17 }, (_, i) => ({
    id: i,
    upperBeadActive: false,
    lowerBeads: [false, false, false, false],
  }));
};

function App() {
  const [columns, setColumns] = useState<ColumnState[]>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem('abacusState', JSON.stringify(columns));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [columns]);

  const handleUpperBeadClick = useCallback((columnIndex: number) => {
    setColumns(prev =>
      prev.map((col, i) =>
        i === columnIndex
          ? { ...col, upperBeadActive: !col.upperBeadActive }
          : col
      )
    );
  }, []);

  const handleLowerBeadClick = useCallback(
    (columnIndex: number, beadIndex: number) => {
      setColumns(prev =>
        prev.map((col, i) => {
          if (i === columnIndex) {
            const currentBeads = col.lowerBeads;
            const newBeads = [...currentBeads];
            const isClickedBeadActive = currentBeads[beadIndex];

            if (isClickedBeadActive) {
              // Move down: set this bead and all below it to inactive
              for (let j = 0; j <= beadIndex; j++) {
                newBeads[j] = false;
              }
            } else {
              // Move up: set this bead and all above it to active
              for (let j = beadIndex; j < newBeads.length; j++) {
                newBeads[j] = true;
              }
            }
            return { ...col, lowerBeads: newBeads };
          }
          return col;
        })
      );
    },
    []
  );

  const handleReset = useCallback(() => {
    try {
      localStorage.removeItem('abacusState');
    } catch (error)      {
      console.error("Error clearing localStorage:", error);
    }
    setColumns(
      Array.from({ length: 17 }, (_, i) => ({
        id: i,
        upperBeadActive: false,
        lowerBeads: [false, false, false, false],
      }))
    );
  }, []);

  const abacusValue = columns.reduce((acc, col) => {
    const lowerValue = col.lowerBeads.filter(Boolean).length;
    const colValue =
      (col.upperBeadActive ? 5 : 0) + lowerValue;
    return acc * 10n + BigInt(colValue);
  }, 0n);

  return (
    <main className="bg-slate-200 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="text-center">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-slate-800 tracking-tight">
            Soroban Abacus
          </h1>
          <p className="text-slate-600 mt-2">
            An interactive digital abacus built with React & Tailwind CSS
          </p>
        </header>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="bg-slate-800 text-white font-mono text-5xl py-3 px-6 rounded-lg shadow-lg">
            <p>{abacusValue.toLocaleString()}</p>
          </div>
          <button
            onClick={handleReset}
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-colors duration-200 text-xl"
            aria-label="Reset abacus to zero"
          >
            Reset
          </button>
        </div>
        <Abacus
          columns={columns}
          onUpperBeadClick={handleUpperBeadClick}
          onLowerBeadClick={handleLowerBeadClick}
        />
      </div>
    </main>
  );
}

export default App;