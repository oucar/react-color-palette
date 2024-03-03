import React, { Component } from 'react';
import './styles/DraggableColorBox.scss';

interface DraggableColorBoxProps {
  color: string;
}

class DraggableColorBox extends Component<DraggableColorBoxProps> {
  render() {
    const { color } = this.props;

    return (
      <div className="draggableColorBoxRoot" style={{ backgroundColor: color }}>
        {color}
      </div>
    );
  }
}

export default DraggableColorBox;
