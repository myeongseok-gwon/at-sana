// src/components/CategoryIcon.jsx
import React from 'react';

/**
 * CategoryIcon 컴포넌트
 * 원형의 아이콘 안에 텍스트를 표시합니다.
 */
const CategoryIcon = ({ text, bgColor }) => {
  // 아이콘의 컨테이너 스타일 (지정된 CSS 속성 반영)
  const containerStyle = {
    display: 'flex',
    width: '25px',
    height: '25px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: '50px',
    border: '1px solid #000',
    background: bgColor,
  };

  // 내부 텍스트 스타일
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

export default CategoryIcon;