import React, { Component } from "react";
import "./styles/ColorBox.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

class ColorBox extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const { name, background, showLink, paletteId, id } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="colorBox">
          <div
            style={{ background }}
            className={`copyOverlay ${copied && "show"}`}
          />
          <div className={`copyMsg ${copied && "show"}`}>
            <h1>copied!</h1>
            <p>{this.props.background}</p>
          </div>
          <div className="copy-container">
            <div className="boxContent">
              <span>{name}</span>
            </div>
            <button className="copyButton">Copy</button>
          </div>
          {/* Individual color palettes */}

          {showLink && (
            <Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
              <span className="seeMore">More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
