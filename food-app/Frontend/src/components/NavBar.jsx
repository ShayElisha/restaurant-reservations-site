import React, { useContext, useState } from 'react'  // ייבוא React וכמה hooks מתוך הספריה
import './NavBar.css'  // ייבוא קובץ עיצובי CSS
import { assets } from '../assets/assets'  // ייבוא כתובות קבצי מדיה וסמלים מתוך תיקיית הנכסים
import { Link, useNavigate } from 'react-router-dom'  // ייבוא רכיבים מ-React Router לניהול ניווט
import { StoreContext } from '../context/StoreContext'  // ייבוא הקונטקסט של החנות לשימוש בנתוני העגלה והמשתמש

const NavBar = ({ setShowLogin }) => {
     const [menu, setMenu] = useState("home")  // ניהול מצב של הפריט בתפריט הנבחר
     const { getTotalCartAmount, token, setToken } = useContext(StoreContext)  // שימוש בקונטקסט לקבלת נתונים ופונקציות

    const navigate = useNavigate()  // הקצאת הפונקציה לניווט

    const logout = () => {  // פונקציית התנתקות
      localStorage.removeItem("token");  // מחיקת טוקן מהאחסון המקומי
      setToken("")  // ריקון טוקן במצב הגלובלי
      navigate("/")  // חזרה לעמוד הבית
    }

  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt='' className='logo'/></Link>  // לוגו עם קישור לדף הבית
      <ul className='navbar-menu'>
          <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>  // קישורים לחלקים שונים באתר עם הדגשה על הפריט הנוכחי
          <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
          <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
          <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
          <img src={assets.search_icon} alt="" />  // סמל חיפוש
          <div className="navbar-search-icon">
               <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>  // קישור לעגלה עם תצוגה של סימון עגלה עמוסה אם יש פריטים
               <div className={getTotalCartAmount()===0?"":"dot"}></div>
          </div>
          {!token ? <button onClick={()=>setShowLogin(true)}>sign in</button> : <div className='navbar-profile'>  // כפתור התחברות או תצוגת פרופיל משתמש
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
            </div>}
      </div>
    </div>
  )
}

export default NavBar  // ייצוא רכיב ה-Navigation Bar
