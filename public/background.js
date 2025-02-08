// background.js
// 백그라운드 서비스 워커: chrome.history API를 사용해 방문 기록을 가져옵니다.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_HISTORY') {
    // chrome.history.search()를 사용해 최대 10개의 방문 기록 항목을 가져옵니다.
    chrome.history.search({ text: '', maxResults: 10000000 }, (results) => {
      sendResponse({ history: results });
    });
    // 비동기 응답을 사용함을 알리기 위해 true를 반환합니다.
    return true;
  }
});