// src/components/Bookmark.jsx
import React from 'react';

/**
 * Bookmark 컴포넌트
 * - active prop에 따라 스타일이 변경됩니다.
 *
 * Props:
 *   - isActive: 북마크의 활성화 상태를 나타내는 불리언 값
 *   - label: 북마크에 표시할 텍스트
 */
const Bookmark = ({ isActive, label }) => {
  const textColor = isActive? '#FFF':'#161616'
  const commonStyle = {
    display: 'flex',
    padding: '16px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    alignSelf: 'stretch',
    borderRadius: '5px',
    border: '1px solid var(--Accessibility-Black-in-light-themes, #000)',
    fontFamily: "IBM Plex Sans",
    fontSize: '16px',   // 수정: font-size → fontSize
    fontStyle: 'normal', // 수정: font-style → fontStyle
    fontWeight: 400,     // 수정: font-weight → fontWeight
    lineHeight: '24px',  // 수정: line-height → lineHeight
    color: textColor
  };
  

  const activeStyle = {
    background: 'var(--Carbon-for-IBM-Products-User-profile-images-light-purple, #8A3FFC)',
  };

  const inactiveStyle = {
    background: 'var(--Notification-warning-background-color, #FCF4D6)',
  };

  return (
    <div style={{ ...commonStyle, ...(isActive ? activeStyle : inactiveStyle) }
    }>
      {label}
    </div>
  );
};

export default Bookmark;
