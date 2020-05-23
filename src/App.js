import React, { useState, useEffect } from 'react';
import niceColors from 'nice-color-palettes/1000';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReactComponent as Logo } from './assets/github-logo.svg';

import PaletteColor from './components/PaletteColor';
import './App.css';

function App() {
  const [randomColors, setRandomColors] = useState(null);
  const [shareButtonText, setShareButtonText] = useState('Share');

  useEffect(() => {
    let queriedPalette = getURLParams();
    if (queriedPalette) {
      let queriedColors = (queriedPalette.split(',')).map(color => `#${color}`);
      setRandomColors(queriedColors);
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
    setRandomColors(niceColors[index]);
  };

  const handleShareClick = () => {
    setShareButtonText('Link copied!');
    setTimeout(() => {
      setShareButtonText('Share');
    }, 2400);
  };

  const handleColorEdit = (color, index) => {
    let newColors = randomColors;
    newColors[index] = color;
    setRandomColors([...newColors]);
  };

  const renderRandomColors = () => {
    return randomColors.map((color, i) => {
      return (
        <PaletteColor key={`${i}${color}`} color={color} index={i} handleColorEdit={handleColorEdit} />
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
              window.location.href.includes('?palette') 
                ? `${window.location.href.split('/?')[0]}/?palette=${(randomColors.join(',')).replace(/#/gi, '')}`
                : `${window.location.href}?palette=${(randomColors.join(',')).replace(/#/gi, '')}`
            }
          >
            <button onClick={() => handleShareClick()} className="toolbar-button">{shareButtonText}</button>
          </CopyToClipboard>
        </div>
        <a className="github" href="https://github.com/zeroproduct/palette-pls" target="_blank" rel="noopener noreferrer">
          <Logo />
        </a>
      </div>
    </div>
  );
}

export default App;
