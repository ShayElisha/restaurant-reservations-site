import React, { useState } from 'react'  // ייבוא של React וה-hook useState מהספרייה 'react'
import NavBar from './components/NavBar'  // ייבוא של רכיב NavBar מתיקייה תת-התיקייה components
import { Route, Routes } from 'react-router-dom'  // ייבוא של Route ו-Routes מהספרייה 'react-router-dom' לניהול מסלולי דפים באפליקציה
import Home from './pages/Home/Home'  // ייבוא של רכיב Home מתיקיית הדפים
import Cart from './pages/Cart/Cart'  // ייבוא של רכיב Cart
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'  // ייבוא של רכיב PlaceOrder
import Footer from './components/Footer/Footer'  // ייבוא של רכיב Footer
import LoginPopup from './components/LoginPopup/LoginPopup'  // ייבוא של רכיב LoginPopup
import Verify from './pages/Verify/Verify'  // ייבוא של רכיב Verify
import MyOrders from "./pages/MyOrders/MyOrders"  // ייבוא של רכיב MyOrders

const App = () => {

  const [showLogin, setShowLogin] = useState(false)  // יצירת משתנה מצב עם useState לניהול הצגה של פופאפ התחברות

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}  // תנאי: אם showLogin נכון, הצג את הפופאפ LoginPopup, אחרת - תציג תוכן ריק
      <div className='app'>
        <NavBar setShowLogin={setShowLogin}/>  // יצירת רכיב NavBar עם העברת הפונקציה לשליטה בהצגת הפופאפ
        <Routes>
          <Route path='/' element={<Home/>}/>  // ניתוב לדף הבית
          <Route path='/cart' element={<Cart/>}/>  // ניתוב לדף עגלת הקניות
          <Route path='/order' element={<PlaceOrder/>}/>  // ניתוב לדף ביצוע הזמנה
          <Route path='/verify' element={<Verify/>}/>  // ניתוב לדף אימות משתמש
          <Route path='/myorders' element={<MyOrders/>}/>  // ניתוב לדף ההזמנות שלי
        </Routes>
      </div>
      <Footer/>  // הוספת רכיב פוטר בתחתית הדף
    </>
  )
}

export default App  // ייצוא רכיב App כך שניתן יהיה להשתמש בו במקומות אחרים באפליקציה
