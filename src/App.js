import React, { useState, useEffect } from 'react';
import niceColors from 'nice-color-palettes/1000';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ReactComponent as Logo } from './assets/github-logo.svg';
import { Canvas } from 'react-three-fiber'
import { Physics, usePlane, useBox } from 'use-cannon'

import './App.css';

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <shadowMaterial attach="material" color="#171717" />
    </mesh>
  )
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={props.color} />
    </mesh>
  )
}

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

  const renderColorBoxes = () => {
    return randomColors.map((color, i) => {
      return <Cube position={[(i-2)*2, (i+1)*4, 0]} color={color} />;
    });
  };

  if (!randomColors) return <div />;

  return (
    <div className="app">
      {/* {renderRandomColors()} */}
      <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [-2, 2, 10], fov: 50 }}>
        <color attach="background" args={['#555555']} />
        <hemisphereLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} castShadow />
        <Physics>
          <Plane />
          {renderColorBoxes()}
        </Physics>
      </Canvas>
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
        <a className="github" href="https://github.com/zeroproduct/palette-pls" target="_blank" rel="noopener noreferrer">
          <Logo />
        </a>
      </div>
    </div>
  );
}

export default App;
