import React, { Component } from 'react';

import './styles/DraggableColorBox.scss';

interface DraggableColorBoxProps {
  color: string;
  name: string;
}

class DraggableColorBox extends Component<DraggableColorBoxProps> {
  render() {
    const { color, name } = this.props;

    return (
      <div className="draggableColorBoxRoot" style={{ backgroundColor: color }}>
        {name}
      </div>
    );
  }
}

export default DraggableColorBox;
