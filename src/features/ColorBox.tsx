import React, { Component } from "react";
import "./styles/ColorBox.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class ColorBox extends Component<any, any> {
  render() {
    const { name, background } = this.props;
    return (
      <CopyToClipboard text={background}>
        <div style={{ background }} className="ColorBox">
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <span className="see-more">More</span>
        </div>
      </CopyToClipboard>
    );
  }
}
