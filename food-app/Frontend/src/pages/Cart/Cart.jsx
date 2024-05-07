import React, { useContext } from 'react'  // ייבוא של React וה-hook useContext לשימוש בקונטקסט
import './Cart.css'  // ייבוא עיצובים מקומיים עבור הרכיב
import { StoreContext } from '../../context/StoreContext'  // ייבוא קונטקסט האחסון לקבלת מידע על העגלה והמוצרים
import { useNavigate } from 'react-router-dom'  // ייבוא ה-hook useNavigate לניהול ניווט באפליקציה

const Cart = () => {
  const {cartItem, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext)  // השימוש בקונטקסט לקבלת פונקציות ונתונים נדרשים
  const navigate = useNavigate()  // הגדרת משתנה לניהול הניווט

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>  // כותרות לעמודות: פריט, שם, מחיר, כמות, סך הכל, הסרה
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "images/" + item.image} alt="" />  // תמונת המוצר
                  <p>{item.name}</p>  // שם המוצר
                  <p>${item.price}</p>  // מחיר יחידתי
                  <p>{cartItem[item._id]}</p>  // כמות
                  <p>${item.price * cartItem[item._id]}</p>  // סך הכל למוצר
                  <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>  // כפתור להסרת מוצר
                </div>
                <hr/>
              </>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>  // סכום ביניים
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>  // עלות משלוח
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? getTotalCartAmount() : getTotalCartAmount() + 2}</b>  // סך הכל לתשלום
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>  // כפתור להמשך לתשלום
        </div>
        <div className="cart-promocode">
          <div className="">
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />  // קלט לקוד פרומו
              <button>submit</button>  // כפתור לשליחת קוד פרומו
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart  // ייצוא הרכיב לשימוש בחלקים אחרים של האפליקציה

