// src/components/Tab.jsx
import React from 'react';

/**
 * Tab 컴포넌트
 * - 탭 영역 컨테이너와 내부에 표시할 텍스트를 렌더링합니다.
 *
 * Props:
 *   - text: 탭에 표시할 문자열.
 */
const Tab = ({ text }) => {
  // 컨테이너 스타일
  const containerStyle = {
    display: 'flex',
    padding: '16px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '10px',
    alignSelf: 'stretch',
    borderRadius: '5px',
    border: '1px solid var(--Accessibility-Black-in-light-themes, #000)',
    background: 'var(--Carbon-for-IBM-Products-User-profile-images-light-purple, #8A3FFC)',
  };

  // 내부 텍스트 스타일
  const innerTextStyle = {
    color: 'var(--Background-ui-background, #FFF)',
    textAlign: 'center',
    fontFamily: 'var(--Fixed-Heading-Font-family, "IBM Plex Sans")',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '24px', // 150%
  };

  return (
    <div style={containerStyle}>
      <span style={innerTextStyle}>{text}</span>
    </div>
  );
};

export default Tab;