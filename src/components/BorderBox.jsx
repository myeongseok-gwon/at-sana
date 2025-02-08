// src/components/BorderBox.jsx
import React from 'react';

/**
 * BorderBox 컴포넌트
 * - 내부에 자식 요소(children)를 감싸는 컨테이너로 사용됩니다.
 * - display: inline-flex; 패딩, flex-direction, gap 등의 스타일이 적용됩니다.
 * - 둥근 모서리와 테두리, 배경색을 지정합니다.
 *
 * Props:
 *   - children: BorderBox 내부에 표시할 내용
 */
const BorderBox = ({ children }) => {
  const boxStyle = {
    display: 'inline-flex',
    padding: '32px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '24px',
    borderRadius: '5px',
    border: '1px solid var(--Accessibility-Black-in-light-themes, #000)',
    background: 'var(--Background-ui-background, #FFF)',
  };

  return <div style={boxStyle}>{children}</div>;
};

export default BorderBox;