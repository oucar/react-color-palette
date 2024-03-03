import React from 'react';
import './styles/DraggableColorBox.scss';

interface DraggableColorBoxProps {
  color: string;
  name: string;
}

const DraggableColorBox: React.FC<DraggableColorBoxProps> = ({ color, name }) => {
  return (
    <div className="draggableColorBoxRoot" style={{ backgroundColor: color }}>
      {name}
    </div>
  );
};

export default DraggableColorBox;
