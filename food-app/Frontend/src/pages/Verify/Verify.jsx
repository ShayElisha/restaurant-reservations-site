import React, { useContext, useEffect } from 'react'  // ייבוא של React, useContext לשימוש בקונטקסט, ו-useEffect להפעלת פונקציות במועדי זמן מסוימים
import "./Verify.css"  // ייבוא קובץ הסטיילינג של הרכיב
import { useNavigate, useSearchParams } from 'react-router-dom'  // ייבוא של useNavigate לניהול ניווט ו-useSearchParams לקריאת פרמטרים מה-URL
import { StoreContext } from '../../context/StoreContext';  // ייבוא של קונטקסט StoreContext מתיקייה context
import axios from 'axios';  // ייבוא של axios לביצוע בקשות HTTP

const Verify = () => {

     const [searchParams, setSearchParams] = useSearchParams();  // שימוש ב-hook useSearchParams לקבלת פרמטרים מה-URL
     const success = searchParams.get("success")  // קריאת הפרמטר 'success' מה-URL
     const orderId = searchParams.get("orderId")  // קריאת הפרמטר 'orderId' מה-URL
     const { url } = useContext(StoreContext)  // שימוש ב-useContext לקבלת ערכים מה-StoreContext, כאן משתמשים ב-url
     const navigate = useNavigate();  // הקצאת הפונקציה navigate לניהול ניווט

     const verifyPayment = async () => {  // פונקציה אסינכרונית לאימות תשלום
          const response = await axios.post(url + "api/order/verify", { success, orderId })  // ביצוע בקשת POST עם axios ל-API לאימות תשלום
          if (response.data.success) {  // אם התשלום אומת בהצלחה
               navigate("/myorders")  // ניווט לדף 'ההזמנות שלי'
          }
          else { navigate("/") }  // אם האימות נכשל, ניווט חזרה לדף הבית
     }

     useEffect(() => {  // useEffect לביצוע הפונקציה לאחר טעינת הקומפוננטה
          verifyPayment();  // קריאה לפונקציה verifyPayment
     }, [])  // רשימת תלויות ריקה מבטיחה שהפונקציה תופעל פעם אחת בלבד לאחר טעינת הקומפוננטה

  return (
    <div className='verify'>  // שימוש ב-class verify לסגנון הרכיב
     <div className="spinner"></div>  // יצירת אלמנט spinner להצגת אינדיקציה חזותית של תהליך בעיבוד
    </div>
  )
}

export default Verify  // ייצוא הרכיב Verify לשימוש בחלקים אחרים של האפליקציה
