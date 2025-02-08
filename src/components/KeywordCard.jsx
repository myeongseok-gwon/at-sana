// src/components/KeywordCard.jsx
import React from 'react';
import CategoryIcon from './CategoryIcon';

/**
 * KeywordCard 컴포넌트
 * - 전체 카드 컨테이너는 600px 너비, 24px 패딩, 둥근 모서리, 테두리 및 배경색을 가집니다.
 * - 내부 프레임은 두 개의 컬럼(아이콘, 텍스트 영역)으로 구성됩니다.
 * 
 * Props:
 *   - iconText: CategoryIcon에 표시할 텍스트
 *   - title: 컬럼2의 첫 번째 행(Text1)에 표시할 제목 텍스트
 *   - label: 컬럼2의 첫 번째 행(Text2)에 표시할 부가 정보 텍스트
 *   - description: 컬럼2의 두 번째 행에 표시할 설명 텍스트
 */
const KeywordCard = ({ iconText, title, label, description }) => {
  // 전체 카드 컨테이너 스타일
  const bgColor = (iconText == 'L')
    ? '#74E792'
    : (
        (iconText == 'D')
        ? '#FFD6E8'
        : '#99DAFF'
      )
  const cardStyle = {
    display: 'flex',
    width: '600px',
    padding: '24px',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    gap: '7px 23px',
    flexWrap: 'wrap',
    borderRadius: '5px',
    border: '1px solid var(--Accessibility-Black-in-light-themes, #000)',
    background: 'var(--Background-ui-background, #FFF)',
  };

  // 내부 프레임 스타일 (두 컬럼을 담는 컨테이너)
  const frameStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    flex: '1 0 0',
  };

  // 컬럼1 스타일 (CategoryIcon이 들어갈 영역)
  const col1Style = {
    display: 'flex',
    width: '28px',
    height: '28px',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // 컬럼2 스타일 (텍스트 영역)
  const col2Style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    flex: '1 0 0',
  };

  // 컬럼2의 Row1 스타일 (제목과 라벨을 가로로 배치)
  const row1Style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: '100%',
  };

  // 컬럼2 Row1 - Text1 (제목) 스타일
  const text1Style = {
    display: '-webkit-box',
    maxWidth: '400px',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    color: 'var(--Text-text-01, #161616)',
    textOverflow: 'ellipsis',
    fontFamily: '"IBM Plex Sans"',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '28px', // 140%
  };

  // 컬럼2 Row1 - Text2 (라벨) 스타일
  const text2Style = {
    color: 'var(--Text-text-05, #6F6F6F)',
    textAlign: 'right',
    fontFamily: 'var(--fixed-utility-label-0102-font-family, "IBM Plex Sans")',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '18px', // 128.571%
    letterSpacing: '0.16px',
  };

  // 컬럼2의 Row2 (설명 텍스트) 스타일
  const row2Style = {
    maxHeight: '72px',
    alignSelf: 'stretch',
    color: 'var(--Text-text-01, #161616)',
    fontFamily: 'var(--Fixed-Body-Font-family, "IBM Plex Sans")',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px', // 150%
    textAlign: 'left', // 왼쪽 정렬 추가
  };

  return (
    <div style={cardStyle}>
      <div style={frameStyle}>
        {/* 컬럼1: Category Icon */}
        <div style={col1Style}>
          <CategoryIcon text={iconText} bgColor={bgColor} />
        </div>
        {/* 컬럼2: 텍스트 영역 */}
        <div style={col2Style}>
          {/* Row1: 제목과 라벨 */}
          <div style={row1Style}>
            <div style={text1Style}>{title}</div>
            <div style={text2Style}>{label}</div>
          </div>
          {/* Row2: 설명 텍스트 */}
          <div style={row2Style}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default KeywordCard;