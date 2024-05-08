import React, { useContext, useState } from 'react'  // ייבוא React, useContext לקבלת גישה לקונטקסט, ו-useState לניהול מצב
import './LoginPopup.css'  // ייבוא קובץ ה-CSS לעיצוב הקומפוננטה
import { assets } from '../../assets/assets'  // ייבוא נכסים, כולל תמונות וסמלים
import { StoreContext } from '../../context/StoreContext'  // ייבוא ה-StoreContext
import axios from 'axios'  // ייבוא ספריית axios לביצוע בקשות HTTP

const LoginPopup = ({ setShowLogin }) => {
     const { url, setToken } = useContext(StoreContext)  // שימוש בקונטקסט לקבלת ה-URL ופונקציה לעדכון הטוקן
     const [currState, setCurrState] = useState("Login")  // ניהול מצב נוכחי של הטופס, התחברות או הרשמה
     const [data, setData] = useState({  // ניהול מצב של נתוני הטופס
          name: "",
          email: "",
          password: ""
     })

     const onChangeHandler = (event) => {  // פונקציה לעדכון הנתונים במצב לפי שינויים בטופס
          const name = event.target.name
          const value = event.target.value
          setData(data => ({...data, [name]: value}))
     }

     const onLogin = async (event) => {  // פונקציה לשליחת הטופס, התחברות או הרשמה
          event.preventDefault();
          let newUrl = url + (currState === "Login" ? "api/user/login" : "api/user/register")  // בחירת ה-API בהתאם למצב
          const response = await axios.post(newUrl, data)  // שליחת הבקשה

          if (response.data.success) {
               setToken(response.data.token);  // עדכון הטוקן במצב הגלובלי
               localStorage.setItem("token", response.data.token)  // שמירת הטוקן באחסון המקומי
               setShowLogin(false)  // סגירת חלון הפופאפ
          } else {
               alert(response.data.message)  // הצגת הודעת שגיאה אם יש כזו
          }
     }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
               <h2>{currState}</h2>  // כותרת לפי המצב, התחברות או הרשמה
               <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" /> 
          </div>
          <div className="login-popup-input">
               {currState !== "Login" && <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
               <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required/>
               <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
          </div>
          <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
          <div className="login-popup-condition">
               <input type="checkbox" required />  
               <p>By continuing, i agree the terms of use & privacy policy</p>
          </div>
          {currState === "Login" ?  // קישור לשינוי בין מצבי הרישום וההתחברות
          <p>Create new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p> :
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>}
          
      </form>
    </div>
  )
}

export default LoginPopup  // ייצוא רכיב הפופאפ להתחברות/הרשמה
