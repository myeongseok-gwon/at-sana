// src/components/HistoryList.jsx
import React, { useState, useEffect } from 'react';

/* ────────── 유틸리티 함수들 ────────── */

// 현재 사용자의 로컬 시간 기준 오늘 자정 시각 계산
const getStartOfToday = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.getTime();
};

// 지난 한 달(1개월) 전 시각 계산
const getOneMonthAgo = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.getTime();
};

// 체류시간(머문 시간) 계산 함수  
// 연속 방문 간격이 30분 이하인 경우를 하나의 세션으로 보고, 세션당 최대 30분까지만 반영
const calculateDuration = (visits, startTime = 0) => {
  if (!visits || visits.length === 0) return 0;
  
  let totalDuration = 0;
  const validVisits = visits.filter(visit => visit.visitTime >= startTime);
  
  // 방문 기록을 시간순으로 정렬
  validVisits.sort((a, b) => a.visitTime - b.visitTime);
  
  // 세션별로 그룹화 (연속 방문 간격이 30분 미만이면 같은 세션)
  let sessions = [];
  let currentSession = [validVisits[0]];
  
  for (let i = 1; i < validVisits.length; i++) {
    const currentVisit = validVisits[i];
    const lastVisit = currentSession[currentSession.length - 1];
    const timeDiff = currentVisit.visitTime - lastVisit.visitTime;
    
    if (timeDiff < 1800000) { // 30분 미만이면 같은 세션
      currentSession.push(currentVisit);
    } else {
      sessions.push(currentSession);
      currentSession = [currentVisit];
    }
  }
  sessions.push(currentSession);
  
  // 각 세션의 체류시간 계산 (최대 30분으로 제한)
  sessions.forEach(session => {
    if (session.length > 1) {
      const sessionDuration = Math.min(
        session[session.length - 1].visitTime - session[0].visitTime,
        1800000 // 최대 30분
      );
      totalDuration += sessionDuration;
    }
  });
  
  return totalDuration;
};

// URL 그룹화를 위한 키 생성 함수
// 구글 검색의 경우 검색어(q 파라미터) 기준, 그 외는 origin + pathname 기준으로 그룹화
const getGroupingKey = (url) => {
  try {
    const urlObj = new URL(url);
    if (
      (urlObj.hostname === 'www.google.com' || urlObj.hostname === 'google.com') &&
      urlObj.pathname === '/search'
    ) {
      const query = urlObj.searchParams.get('q');
      if (query) {
        return `${urlObj.hostname}/search?q=${query}`;
      }
    }
    return urlObj.origin + urlObj.pathname;
  } catch (e) {
    return url;
  }
};

// chrome.history.search의 결과를 그룹화하는 함수 (getGroupingKey 기준)
const groupHistoryByDomain = (historyItems) => {
  const domainGroups = {};
  
  historyItems.forEach(item => {
    const groupingKey = getGroupingKey(item.url);
    if (!domainGroups[groupingKey]) {
      domainGroups[groupingKey] = {
        groupingKey,
        title: item.title || groupingKey,
        urls: new Set(),
        // chrome.history.search에서 받은 visitCount는 이후 실제 방문 집계로 대체
        totalVisits: item.visitCount || 0,
        lastVisitTime: 0,
        favicon: `https://www.google.com/s2/favicons?sz=32&domain=${groupingKey}`
      };
    }
    
    domainGroups[groupingKey].urls.add(item.url);
    if (item.lastVisitTime > domainGroups[groupingKey].lastVisitTime) {
      domainGroups[groupingKey].lastVisitTime = item.lastVisitTime;
      if (item.title) domainGroups[groupingKey].title = item.title;
    }
  });
  
  return Object.values(domainGroups);
};

// 체류시간(ms)을 보기 좋게 포맷팅 (예: 1시간 32분)
// 60,000ms(1분) 미만이면 "1분 미만"으로 표시
const formatDuration = (ms) => {
  if (ms < 60000) return '1분 미만';
  
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}시간`);
  if (minutes % 60 > 0) parts.push(`${minutes % 60}분`);
  if (seconds % 60 > 0 && hours === 0) parts.push(`${seconds % 60}초`);
  
  return parts.length > 0 ? parts.join(' ') : '1분 미만';
};

// 방문 시간을 보기 좋게 포맷팅 (예: 2월 7일 22:33)
const formatVisitTime = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${month}월 ${day}일 ${hours}:${minutes}`;
};

// 방문 기록을 같은 "분 단위"로 그룹화하기 위한 키 생성 함수  
// (초와 밀리초를 제거하여 같은 분 내 방문은 하나로 인식)
const getVisitTimeKey = (timestamp) => {
  const date = new Date(timestamp);
  date.setSeconds(0, 0);
  return date.getTime();
};

/* ────────── HistoryList 컴포넌트 ────────── */

const HistoryList = () => {
  const [historyGroups, setHistoryGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const startOfToday = getStartOfToday();
    const oneMonthAgo = getOneMonthAgo();
    
    // 지난 한 달 동안의 방문 기록을 chrome.history.search로 가져옵니다.
    chrome.history.search(
      {
        text: '',
        startTime: oneMonthAgo,
        maxResults: 5000
      },
      (results) => {
        if (!results || results.length === 0) {
          setHistoryGroups([]);
          setLoading(false);
          return;
        }
        
        // 그룹 키(전체 URL 또는 구글 검색의 경우 검색어 기준)로 방문 기록들을 그룹화
        const domainGroups = groupHistoryByDomain(results);
        
        // 최신 방문 시간순으로 그룹 정렬
        domainGroups.sort((a, b) => b.lastVisitTime - a.lastVisitTime);
        
        // 각 그룹에 대해 해당 그룹의 URL들에 대한 방문 기록을 가져와 추가 통계 계산
        Promise.all(
          domainGroups.map(group => {
            return Promise.all(
              [...group.urls].map(url => {
                return new Promise(resolve => {
                  chrome.history.getVisits({ url }, resolve);
                });
              })
            ).then(visitArrays => {
              let allVisits = visitArrays.flat();
              allVisits.sort((a, b) => b.visitTime - a.visitTime);
              
              // 동일한 '분' 단위로 방문을 그룹화 (초와 밀리초 제거)
              const visitsByMinute = {};
              allVisits.forEach(visit => {
                const key = getVisitTimeKey(visit.visitTime);
                if (!visitsByMinute[key]) {
                  visitsByMinute[key] = { visitTime: key, count: 1 };
                } else {
                  visitsByMinute[key].count++;
                }
              });
              
              const groupedVisits = Object.values(visitsByMinute).sort((a, b) => b.visitTime - a.visitTime);
              
              // 전체 방문수와 오늘 방문수를 "각 그룹(분 단위)"로 계산
              const totalVisitCount = Object.values(visitsByMinute).length;
              const todayVisitCount = Object.values(visitsByMinute).filter(
                entry => entry.visitTime >= startOfToday
              ).length;
              
              // 체류시간 계산은 유니크 방문(각 그룹 대표 시각)을 기준으로 진행
              const uniqueVisits = groupedVisits.map(entry => ({ visitTime: entry.visitTime }));
              const totalDuration = calculateDuration(uniqueVisits);
              const todayDuration = calculateDuration(
                uniqueVisits.filter(v => v.visitTime >= startOfToday),
                startOfToday
              );
              
              return {
                ...group,
                totalVisitCount,
                todayVisitCount,
                totalDuration,
                todayDuration,
                groupedVisits
              };
            });
          })
        ).then(enhancedGroups => {
          setHistoryGroups(enhancedGroups);
          setLoading(false);
        });
      }
    );
  }, []);
  
  return (
    <div className="history-list">
      <h2>최근 방문 기록</h2>
      {loading ? (
        <p>방문 기록을 불러오는 중...</p>
      ) : historyGroups.length === 0 ? (
        <p>방문 기록이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {historyGroups.map(group => (
            <li
              key={group.groupingKey}
              className="history-item"
              style={{
                marginBottom: '20px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '10px'
              }}
            >
              {/* 기본 정보 (파비콘 및 제목) */}
              <div className="main-info" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <img
                  src={group.favicon}
                  alt="favicon"
                  width="16"
                  height="16"
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontWeight: 'bold' }}>{group.title}</span>
              </div>
              
              {/* 통계 정보 */}
              <div className="info" style={{ marginBottom: '8px' }}>
                <p>
                  <strong>Total Visits (Monthly):</strong> {group.totalVisitCount}회
                </p>
                <p>
                  <strong>Total Duration of Stay (Monthly):</strong> {formatDuration(group.totalDuration)}
                </p>
                <p>
                  <strong>Today's Duration of Stay:</strong> {formatDuration(group.todayDuration)}
                </p>
                <p>
                  <strong>Today's Visits:</strong> {group.todayVisitCount}회
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryList;