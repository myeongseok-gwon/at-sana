import React from 'react';
import TimeBlock from './TimeBlock';

const TimeTable = ({ rows, columns, data }) => {
  const tableStyle = {
    display: 'grid',
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `auto repeat(${columns}, 1fr)`, // 레이블 열 추가
    gap: 0,
    // border: '1px solid #ddd',
    maxWidth: 'fit-content',
  };

  const labelStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
    // backgroundColor: '#ffffff',
    color: 'var(--Text-text-03, #A8A8A8)',
    textAlign: 'center',
    fontFamily: 'var(--Fixed-Body-Font-family, "IBM Plex Sans")',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.16px',
    // borderRight: '1px solid #ddd',
  };
  

  return (
    <div style={tableStyle}>
      {data.flatMap((row, rowIndex) => [
        // 각 행 시작에 레이블 추가
        <div key={`label-${rowIndex}`} style={labelStyle}>
          {String(6 + rowIndex).padStart(2, '0')}
        </div>,
        // 기존 타임 블록 렌더링
        ...row.map((color, colIndex) => (
          <TimeBlock key={`${rowIndex}-${colIndex}`} bgColor={color} />
        )),
      ])}
    </div>
  );
};

export default TimeTable;