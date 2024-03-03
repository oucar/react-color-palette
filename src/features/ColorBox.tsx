import React, { useState, useEffect } from "react";
import "./styles/ColorBox.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useLocation } from "react-router-dom";
import chroma from "chroma-js";

const ColorBox = ({ name, background, showLink, paletteId, id }) => {
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  const changeCopyState = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    // Reset copied state when the route changes
    setCopied(false);
  }, [location.pathname]);

  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className="colorBox">
        <div
          style={{ background }}
          className={`copyOverlay ${copied ? "show" : ""}`}
        />
        <div className={`copyMsg ${copied ? "show" : ""}`}>
          <h1>copied!</h1>
          <p className={isLightColor ? "darkText" : ""}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="boxContent">
            <span className={isDarkColor ? "lightText" : ""}>{name}</span>
          </div>
          <button className={`copyButton ${isLightColor ? "darkText" : ""}`}>
            Copy
          </button>
        </div>

        {/* Individual color palettes */}
        {showLink && (
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`seeMore ${isLightColor && "darkText"}`}>
              MORE
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
