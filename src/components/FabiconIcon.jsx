// src/components/FabiconIcon.jsx
import React from 'react';

/**
 * FabiconIcon 컴포넌트
 * - 원형의 아이콘 컨테이너로, 내부에 아이콘이나 텍스트 등을 중앙에 배치합니다.
 *
 * Props:
 *   - children: 컨테이너 내부에 표시할 내용 (예: 아이콘, 텍스트 등)
 */
const FabiconIcon = ({ children }) => {
  const containerStyle = {
    display: 'flex',
    width: '50px',
    height: '50px',
    padding: '9px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
    borderRadius: '50px',
    background: 'var(--UI-ui-01, #F4F4F4)',
  };

  return <div style={containerStyle}>{children}</div>;
};

export default FabiconIcon;