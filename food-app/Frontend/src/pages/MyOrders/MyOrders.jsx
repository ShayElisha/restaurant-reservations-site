import React, { useContext, useEffect, useState } from 'react'  // ייבוא של React וכמה hooks שימושיים
import './MyOrders.css'  // ייבוא קובץ עיצובי CSS לרכיב
import { StoreContext } from '../../context/StoreContext'  // ייבוא ה-StoreContext לשימוש בנתונים גלובליים
import axios from 'axios'  // ייבוא של axios לביצוע בקשות HTTP
import { assets } from '../../assets/assets'  // ייבוא של אובייקט עם נתיבים לתמונות וסמלים

const MyOrders = () => {
     const { url, token } = useContext(StoreContext)  // שימוש ב-useContext לקבלת נתונים מה-StoreContext
     const [data, setData] = useState([])  // משתנה מצב לשמירת נתוני ההזמנות

     const fetchOrders = async () => {  // פונקציה אסינכרונית לשליפת נתוני ההזמנות מהשרת
          const response = await axios.post(url + "api/order/userorders", {}, { headers: { token } })
          setData(response.data.data)  // עדכון משתנה המצב עם נתוני ההזמנות
     }

     useEffect(() => {  // הרצת הפונקציה fetchOrders בעת טעינת הרכיב או שינוי הטוקן
          if (token) {
               fetchOrders()
          }
     }, [token])

  return (
    <div className='my-orders'>
     <h2>My Orders</h2>  // כותרת לרשימת ההזמנות
     <div className="container">
          {data.map((order, index) => {  // עיבוד והצגת כל הזמנה בלולאה
               return (
                    <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt=""/>  
                    <p>{order.items.map((item, index) => {  // הצגת רשימת הפריטים בהזמנה
                         return index === order.items.length - 1 ? 
                              item.name + " x " + item.quantity : 
                              item.name + " x " + item.quantity + ", "
                    })}</p>
                    <p>${order.amount}.00</p>  
                    <p>Items: {order.items.length}</p> 
                    <p><span>&#x25cf;</span><b>{order.status}</b></p> 
                    <button onClick={fetchOrders}>Track Order</button>  
               </div>
               )
          })}
     </div>
    </div>
  )
}

export default MyOrders  // ייצוא הרכיב
