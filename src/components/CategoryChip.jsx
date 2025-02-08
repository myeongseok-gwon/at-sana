// src/components/CategoryChip.jsx
import React from 'react';

/**
 * CategoryChip 컴포넌트
 * 깎인 직사각형 형태로 텍스트를 표시합니다.
 */
const CategoryChip = ({ text, bgColor }) => {
  const containerStyle = {
    display: 'inline-flex',
    padding: '5px 12px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '10px',
    flexShrink: 0,
    borderRadius: '5px',
    border: '1px solid #000',
    background: bgColor,
  };

  const textStyle = {
    color: 'var(--Text-text-01, #161616)',
    textAlign: 'center',
    fontFamily: 'var(--Fixed-Body-Font-family, "IBM Plex Sans")',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '22px',
  };

  return (
    <div style={containerStyle}>
      <span style={textStyle}>{text}</span>
    </div>
  );
};

export default CategoryChip;