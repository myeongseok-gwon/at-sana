// src/components/Graybox.jsx
import React from 'react';

/**
 * Graybox 컴포넌트
 * - 두 개의 텍스트가 수직으로 배치됩니다.
 *
 * Props:
 *   - title: 첫 번째 텍스트
 *   - subtitle: 두 번째 텍스트
 */
const Graybox1 = ({ title, subtitle }) => {
  const containerStyle = {
    display: 'flex',
    padding: '16px 24px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    borderRadius: '5px',
    border: '1px solid var(--Accessibility-Black-in-light-themes, #000)',
    background: 'var(--UI-ui-01, #F4F4F4)'
  };

  const titleStyle = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    color: 'var(--Text-text-01, #161616)',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    fontFamily: 'IBM Plex Sans',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '28px'
  };

  const subtitleStyle = {
    display: 'flex',
    width: '156px',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 0 0',
    color: 'var(--Link-link-visited, #8A3FFC)',
    textAlign: 'center',
    fontFamily: 'IBM Plex Serif',
    fontSize: '60px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '70px'
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>{title}</div>
      <div style={subtitleStyle}>{subtitle}</div>
    </div>
  );
};

export default Graybox1;