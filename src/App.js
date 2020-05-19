import React, { useState, useEffect } from 'react';
import niceColors from 'nice-color-palettes/1000';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';

function App() {
  const [randomColorIndex, setRandomColorIndex] = useState(null);
  const [randomColors, setRandomColors] = useState(null);
  const [shareButtonText, setShareButtonText] = useState('Share');

  useEffect(() => {
    let paletteIndex = getURLParams();
    if (paletteIndex) {
      setRandomColorIndex(paletteIndex);
      setRandomColors(niceColors[paletteIndex]);
    } else {
      randomize();
    }
  }, []);

  const getURLParams = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const palette = params.get('palette');
    return palette;
  };

  const randomize = () => {
    let index = Math.floor(Math.random() * niceColors.length);
    setRandomColorIndex(index);
    setRandomColors(niceColors[index]);
  };

  const handleShareClick = () => {
    setShareButtonText('Link copied!');
    setTimeout(() => {
      setShareButtonText('Share');
    }, 2400);
  };

  const renderRandomColors = () => {
    return randomColors.map(color => {
      return (
        <CopyToClipboard key={color} text={color}>
          <div className="palette-color" style={{ backgroundColor: color }}>
            <div className="hex-container">
              <span className="hex">{color}<span className="hex-tooltip">Copy</span></span>
            </div>
          </div>
        </CopyToClipboard>
      );
    })
  };

  if (!randomColors) return <div />;

  return (
    <div className="app">
      {renderRandomColors()}
      <div className="toolbar">
        <span className="toolbar-title" role="img" aria-label="palette-pls">🎨🤲</span>
        <div>
          <button className="toolbar-button" onClick={() => randomize()}>Randomize</button>
          <CopyToClipboard 
            text={
              window.location.href.includes('palette') 
                ? `${window.location.href.split('/?')[0]}/?palette=${randomColorIndex}`
                : `${window.location.href}?palette=${randomColorIndex}`
            }
          >
            <button onClick={() => handleShareClick()} className="toolbar-button">{shareButtonText}</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default App;
