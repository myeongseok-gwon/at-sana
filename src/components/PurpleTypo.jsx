// src/components/PurpleTypo.jsx
import React from 'react';

/**
 * PurpleTypo 컴포넌트
 * - 지정된 폭과 flex 스타일, 그리고 타이포그래피 스타일을 적용한 텍스트 컴포넌트입니다.
 * - 주로 제목이나 인용구와 같이 두드러지는 텍스트에 사용됩니다.
 *
 * Props:
 *   - children: 컴포넌트 내부에 표시할 텍스트나 다른 요소
 */
const PurpleTypo = ({ children }) => {
  const textStyle = {
    display: 'flex',
    width: '156px',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 0 0',
    color: 'var(--Link-link-visited, #8A3FFC)',
    textAlign: 'center',
    fontFamily: '"IBM Plex Serif"',
    fontSize: '60px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '70px', // 116.667%
  };

  return <div style={textStyle}>{children}</div>;
};

export default PurpleTypo;