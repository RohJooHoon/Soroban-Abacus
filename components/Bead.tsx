import React from 'react';

interface BeadProps {
  isActive: boolean;
  isUpper: boolean;
  onClick: () => void;
}

const Bead: React.FC<BeadProps> = ({ isActive, isUpper, onClick }) => {
  const movementClass = isUpper
    ? isActive
      ? 'translate-y-9'
      : 'translate-y-0'
    : isActive
    ? '-translate-y-9'
    : 'translate-y-0';

  return (
    <div
      onClick={onClick}
      className={`w-11 h-7 bg-[#4a3222] hover:bg-[#6a4d3a] rounded-full cursor-pointer transition-transform duration-300 ease-in-out shadow-inner ${movementClass}`}
      style={{
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(255,255,255,0.1)'
      }}
    />
  );
};

export default Bead;