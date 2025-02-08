// src/components/TimeBlock.jsx
import React from 'react';

/**
 * TimeBlock 컴포넌트
 * bgColor
 *  var(--Tag-Cyan-hover, #99DAFF)
 *  var(--Tag-Gray-background, #E0E0E0)
 *  var(--Tag-Magenta-background, #FFD6E8)
 *  var(--Tag-Green-hover, #74E792)
 */
const TimeBlock = ({ bgColor }) => {
  const containerStyle = {
    display: 'flex',
    width: '15px',
    height: '8px',
    padding: '13px 17px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
    border: '1px solid var(--Background-ui-background, #FFF)',
    background: bgColor || 'var(--Tag-Gray-background, #E0E0E0)'

    // var(--Tag-Cyan-hover, #99DAFF)
    // var(--Tag-Gray-background, #E0E0E0)
    // var(--Tag-Magenta-background, #FFD6E8)
    // var(--Tag-Green-hover, #74E792)
  };

  return <div style={containerStyle}></div>;
};

export default TimeBlock;