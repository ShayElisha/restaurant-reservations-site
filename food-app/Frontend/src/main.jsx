import React from 'react'  // ייבוא של הספרייה React לשימוש ב-JSX ובפונקציונליות של React
import ReactDOM from 'react-dom/client'  // ייבוא של הספרייה ReactDOM לניהול ה-Rendering של האפליקציה ב-DOM
import App from './App.jsx'  // ייבוא של הרכיב הראשי App מתוך הקובץ App.jsx
import './index.css'  // ייבוא של קובץ ה-CSS לעיצוב האפליקציה
import { BrowserRouter } from 'react-router-dom'  // ייבוא של הרכיב BrowserRouter מהספרייה 'react-router-dom' לניהול הניווט באפליקציה
import StoreContextProvider from './context/StoreContext.jsx'  // ייבוא של הקונטקסט StoreContextProvider, שמספק מנגנון לניהול והעברת נתונים בין רכיבים

// יצירת שורש האפליקציה באלמנט בעל ה-ID 'root' והכנסת האפליקציה ל-DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>  // הקיפול של כל האפליקציה בתוך BrowserRouter לניהול ניווט
    <StoreContextProvider>  // הקיפול של כל האפליקציה בתוך StoreContextProvider לספק קונטקסט עם נתונים כלליים
      <App />  // הכנסת רכיב App כרכיב הראשי באפליקציה
    </StoreContextProvider>
  </BrowserRouter>
)
