import React, { useContext, useEffect, useState } from 'react'  // ייבוא של React, וכן ה-hooks useContext, useEffect, ו-useState
import './PlaceOrder.css'  // ייבוא קובץ ה-CSS לעיצוב הרכיב
import { useNavigate } from 'react-router-dom'  // ייבוא של ה-hook useNavigate לניהול ניווט בין דפים
import { StoreContext } from '../../context/StoreContext'  // ייבוא של הקונטקסט StoreContext לשימוש בנתונים גלובליים
import axios from 'axios'  // ייבוא של הספרייה axios לביצוע בקשות HTTP

function PlaceOrder() {
  const navigate = useNavigate();  // הגדרת משתנה לניהול הניווט
  const {getTotalCartAmount, token, food_list, cartItem, url} = useContext(StoreContext)  // קבלת ערכים מה-StoreContext
  const [data, setData] = useState({  // יצירת משתנה מצב לשמירת נתונים של טופס ההזמנה
    firstName: "", lastName: "", email: "", street: "", city: "", state: "", zipcode: "", country: "", phone: ""
  })

  const onChangeHandler = (event) => {  // פונקציה לעדכון נתוני המשתמש בטופס
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  useEffect(() => {  // הדפסת נתוני המשתמש בכל שינוי במצב ה-data
    console.log(data);
  }, [data]);

  const placeOrder = async (event) => {  // פונקציה אסינכרונית לשליחת פרטי ההזמנה לשרת
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {  // יצירת מערך של פריטים להזמנה
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {  // הכנת נתוני ההזמנה לשליחה
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "api/order/place", orderData, {headers: {token}});  // שליחת הבקשה לשרת
    if (response.data.success) {  // אם ההזמנה התקבלה בהצלחה
      const { session_url } = response.data
      window.location.replace(session_url)  // הפניית המשתמש לדף התשלום
    }
    else { alert("Error") }  // הצגת שגיאה אם הבקשה נכשלה
  }

  useEffect(() => {  // בדיקה אם יש טוקן ואם סכום הסל הוא אפס
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart')  // אם אחד מהתנאים מתקיים, הפניית המשתמש חזרה לעגלה
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>  // טופס להזמנת מוצרים
      // כאן פרטי ההזמנה ופרטים נוספים שניתן למלא, כמו כתובת ופרטים אישיים
      <div className="cart-total">
          <h2>Cart Total</h2>  // הצגת סכום סופי לתשלום
          <button type='submit'>PROCEED TO PAYMENT</button>  // כפתור למעבר לתשלום
      </div>
    </form>
  )
}

export default PlaceOrder  // ייצוא הרכיב
