// src/components/Graybox2.jsx
import React from 'react';

/**
 * Graybox2 컴포넌트
 * - 첫 번째는 텍스트, 두 번째는 이미지와 중앙 텍스트가 표시됩니다.
 *
 * Props:
 *   - title: 첫 번째 텍스트
 *   - imageSrc: 이미지 경로
 *   - altText: 이미지의 대체 텍스트
 *   - overlayText: 이미지 위에 표시할 텍스트
 */
const Graybox2 = ({ title, imageSrc, altText, overlayText }) => {
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

  const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    height: 'auto'
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '5px'
  };

  const overlayTextStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'var(--Background-ui-background, #FFF)',
    textAlign: 'center',
    fontFamily: 'IBM Plex Serif',
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '40px'
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>{title}</div>
      <div style={imageContainerStyle}>
        <img src={imageSrc} alt={altText} style={imageStyle} />
        <div style={overlayTextStyle}>{overlayText}</div>
      </div>
    </div>
  );
};

export default Graybox2;
