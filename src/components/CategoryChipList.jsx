import React from 'react';
import CategoryChip from './CategoryChip'; // CategoryChip 컴포넌트를 임포트하세요.

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%', // row의 width를 100%로 지정
  marginBottom: '10px', // row 간 간격 (필요시)
  paddingLeft: '9px'
};

const text2Style = {
  color: 'var(--Text-text-05, #6F6F6F)',
  textAlign: 'right',
  fontFamily: 'var(--fixed-utility-label-0102-font-family, "IBM Plex Sans")',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '15px', // 128.571%
  letterSpacing: '0.16px',
  paddingRight: '12px'
};

const LayoutRows = () => {
  return (
    // 최상위 컨테이너도 width 100%로 지정합니다.
    <div style={{ width: '100%' }}>
      {/* 첫 번째 Row */}
      <div style={rowStyle}>
        <CategoryChip text="Development" bgColor="#99DAFF" />
        <span style={text2Style}>02:12:32</span>
      </div>
      
      {/* 두 번째 Row */}
      <div style={rowStyle}>
        <CategoryChip text="Lifestyle" bgColor= '#A7F0BA' />
        <span style={text2Style}>01:24:52</span>
      </div>
      
      {/* 세 번째 Row */}
      <div style={rowStyle}>
        <CategoryChip text="Entertainment" bgColor='#FFD6E8' />
        <span style={text2Style}>04:22:37</span>
      </div>
    </div>
  );
};

export default LayoutRows;
