// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css'; // 전역 CSS

// React 18의 createRoot API를 사용하여 앱 렌더링
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);