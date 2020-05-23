import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

import './index.css';

function PaletteColor({ color, index, handleColorEdit }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [paletteColor, setPaletteColor] = useState(null);

  useEffect(() => {
    setPaletteColor(color);
  }, [color]);

  const handleChange = (color) => {
    setPaletteColor(color.hex);
  };

  const handleChangeComplete = color => {
    setPaletteColor(color.hex);
    handleColorEdit(color.hex, index);
  };


  if (!color) return <div />;
  return (
    <div className="palette-color" style={{ backgroundColor: paletteColor }}>
      <div className="hex-container">
        <span onClick={() => setDisplayColorPicker(!displayColorPicker)} className="hex">
          {paletteColor}
          <span className="hex-tooltip">Edit</span>
        </span>
        {displayColorPicker ? (
          <div className="picker-popover">
            <div className="picker-cover" onClick={() => setDisplayColorPicker(false)} />
            <ChromePicker
              disableAlpha={true} 
              color={paletteColor}
              onChange={handleChange}
              onChangeComplete={handleChangeComplete}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PaletteColor;
