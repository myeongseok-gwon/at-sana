// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import BorderBox from './components/BorderBox';
import KeywordCard from './components/KeywordCard';
import TimeTable from './components/TimeTable';
import CategoryChipList from './components/CategoryChipList';
import Bookmark from './components/Bookmark';
import Graybox1 from './components/Graybox1';
import Graybox2 from './components/Graybox2';
import { starImageBase64, gifBase64, headerBase64 } from './assets/base64';

const { GoogleGenerativeAI } = require("@google/generative-ai");

// import OpenAI from "openai";

const App = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_GENERATIVE_AI_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [keywordData, setKeywordData] = useState([]);

  const sampleData = [
    ['#E0E0E0', '#E0E0E0', '#E0E0E0', '#74E792', '#74E792', '#74E792'], // Green
    ['#74E792', '#74E792', '#74E792', '#74E792', '#74E792', '#74E792'],
    ['#74E792', '#74E792', '#74E792', '#74E792', '#74E792', '#74E792'],
    ['#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0'],
    ['#E0E0E0', '#E0E0E0', '#E0E0E0', '#99DAFF', '#99DAFF', '#99DAFF'], // Cyan, Gray, Magenta
    ['#99DAFF', '#FFD6E8', '#FFD6E8', '#FFD6E8', '#FFD6E8', '#FFD6E8'], // Magenta
    ['#FFD6E8', '#FFD6E8', '#FFD6E8', '#FFD6E8', '#FFD6E8', '#FFD6E8'], // Cyan
    ['#FFD6E8', '#FFD6E8', '#FFD6E8', '#FFD6E8', '#FFD6E8', '#FFD6E8'],
    ['#FFD6E8', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0'],
    ['#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0'],
    ['#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0'],
    ['#E0E0E0', '#E0E0E0', '#99DAFF', '#99DAFF', '#99DAFF', '#99DAFF'],
    ['#74E792', '#99DAFF', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0'],
    ['#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0'],
    ['#E0E0E0', '#99DAFF', '#99DAFF', '#FFD6E8', '#FFD6E8', '#FFD6E8'],
    ['#99DAFF', '#FFD6E8', '#FFD6E8', '#FFD6E8', '#99DAFF', '#FFD6E8'],
    ['#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0'],
    ['#E0E0E0', '#E0E0E0', '#E0E0E0', '#99DAFF', '#99DAFF', '#99DAFF'],
    ['#99DAFF', '#99DAFF', '#99DAFF', '#99DAFF', '#99DAFF', '#E0E0E0'],
  ];

  useEffect(() => {
    const fetchHistory = () => {
      if (chrome && chrome.history) {
        chrome.history.search({ text: '', startTime: 0, maxResults: 20 }, async (results) => {
          const historyData = results.map(item => ({ url: item.url, title: item.title || item.url }));

          // Send data to Gemini API
          const prompt = `Analyze the following browser history. Based on frequency, uniqueness of the topic, and content relevance, filter out unnecessary items. Provide 5 main topics with their summary and categorize them into: 0 (Development), 1 (Lifestyle), or 2 (Entertainment).

          Data:
          ${JSON.stringify(historyData, null, 2)}

          Respond in the following JSON format:
          [
            {"title": "", "summary": "", "category": 0},
            {"title": "", "summary": "", "category": 1},
            {"title": "", "summary": "", "category": 2},
            {"title": "", "summary": "", "category": 1},
            {"title": "", "summary": "", "category": 2}
          ]`;

          try {
            const result = await model.generateContent(prompt);
            let content = result.response.text();

            // ✅ Strip code block wrappers (```json ... ```)
            content = content.replace(/```json|```/g, '').trim();

            // ✅ Now safely parse the cleaned JSON
            const processedData = JSON.parse(content);
            console.log(content);
            console.log(processedData);
            setKeywordData(processedData);
          } catch (error) {
            console.error("Error fetching data from Gemini:", error);
          }
        });
      }
    };

    fetchHistory();
  }, []);

  const containerStyle = {
    display: 'inline-flex',
    padding: '24px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    borderRadius: '5px',
    border: '1px solid var(--Accessibility-Black-in-light-themes, #000)',
    background: 'var(--Notification-success-background-color, #DEFBE6)',
    boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.30)',
    width: '1505px',
    height: '899px',
    position: 'absolute',
    top: '283.76px',
    left: '56.5px',
    zIndex: 1
  };

  const bookmarksContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    position: 'absolute',
    top: '323.76px',
    left: '1610px',
    zIndex: 0
  };

  const innerContainerStyle = {
    width: '1457px',
    height: '824px',
    margin: '24px',
    gap: '16px',
    display: 'flex',
    justifyContent: 'space-between'
  };

  const column1Style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const column2Style = {
    flex: 1,
  };

  const keywordContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const titleStyle = {
    fontFamily: 'IBM Plex Sans',
    fontWeight: 600,
    fontSize: '36px',
    lineHeight: '44px',
    letterSpacing: '0px',
    color: '#000'
  };
  const topVisitedContainerStyle = {
    display: 'flex',
    justifyContent: 'center',  // 가운데 정렬
    gap: '10px',               // 원들 사이 간격
    marginTop: '10px'          // 제목과 간격 조정
  };
  
  const circleImageStyle = {
    width: '50px',             // 원 크기
    height: '50px',
    borderRadius: '50%',       // 동그랗게 만들기
    objectFit: 'cover',        // 이미지가 원을 가득 채우도록 설정
    border: '2px solid #ccc'   // 테두리 추가 (선택 사항)
  };
  

  return (
    <div>
      <img src={headerBase64} alt="Header" />
      <div style={bookmarksContainerStyle}>
        <Bookmark isActive={true} label="MAIN" />
        <Bookmark isActive={false} label="ANALYSIS" />
        <Bookmark isActive={false} label="SAVED" />
        <Bookmark isActive={false} label="SETTING" />
      </div>
      <div style={containerStyle}>
        <div style={innerContainerStyle}>
          <div style={column1Style}>
            <BorderBox>
              <div style={titleStyle}>Focus</div>
              <Graybox1 title="Peak Duration" subtitle="0'32''" />
              <Graybox2 title="Level" imageSrc={starImageBase64} altText="level" overlayText="5" />
            </BorderBox>
            <BorderBox>
              <div style={titleStyle}>Top Visited</div>
              <div style={topVisitedContainerStyle}>
                <img src={starImageBase64} alt="Visited 1" style={circleImageStyle} />
                <img src={starImageBase64} alt="Visited 2" style={circleImageStyle} />
                <img src={starImageBase64}s alt="Visited 3" style={circleImageStyle} />
              </div>
            </BorderBox>
            <img src={gifBase64} alt="Animation" style={{ width: '100%', height: 'auto' }} />
          </div>

          <div style={column2Style}>
            <BorderBox>
              <div style={
                {
                  fontFamily: 'IBM Plex Sans',
                  fontWeight: 600,
                  fontSize: '36px',
                  lineHeight: '44px',
                  letterSpacing: '0px',
                  color: '#000',
                  marginBottom: '10px'
                }
              }>
                Today's Picks
              </div>
              <div style={keywordContainerStyle}>
                {keywordData.map((item, index) => (
                  <KeywordCard
                    key={index}
                    iconText={['D', 'L', 'E'][item.category]}  // Set based on category
                    title={item.title}
                    label={`Category: ${['Development', 'Lifestyle', 'Entertainment'][item.category]}`}
                    description={item.summary}
                  />
                ))}
              </div>
            </BorderBox>
          </div>

          <div style={column2Style}>
            <BorderBox>
              <div style={titleStyle}>Time Table</div>
              <CategoryChipList />
              <TimeTable rows={6} columns={6} data={sampleData} style={{maxHeight:'100%', overflow: 'auto'}} />
            </BorderBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
