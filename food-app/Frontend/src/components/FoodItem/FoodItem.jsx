import React, { useContext } from 'react'
import './FoodItem.css' // יבוא קובץ עיצוב
import { assets } from '../../assets/assets' // יבוא משאבים
import { StoreContext } from '../../context/StoreContext' // יבוא של Context של החנות
const FoodItem = ({id,name,price,description,image}) => {

     const { cartItem, addToCart, removeFromCart,url } = useContext(StoreContext); // שימוש ב Context של החנות
  return (
     
    <div className='food-item'>
     <div className="food-item-img-container">
          <img className='food-item-image' src={url+"images/"+image} alt="" /> // תמונת המאכל
          {!cartItem[id]
               ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}/>: // תמונת כפתור הוספה
               <div className='food-item-count'>
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red}/> // תמונת כפתור הסרה
                    <p>{cartItem[id]}</p> // מספר הפריטים בעגלה
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green}/> // תמונת כפתור הוספה
               </div>
          }
     </div>
      <div className="food-item-info">
          <div className="food-item-name-rating">
               <p>{name}</p> // שם המאכל
               <img src={assets.rating_starts} alt="" /> // תמונת דירוג
          </div>
          <p className='food-item-desc'>{description}</p> // תיאור המאכל
          <p className="food-item-price">${price}</p> // מחיר המאכל
      </div>
    </div>
  )
}

export default FoodItem
