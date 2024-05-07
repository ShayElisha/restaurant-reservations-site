import React from 'react';
import './ExploreMenu.css';  // ייבוא קבצי סטיילים עבור הקומפוננטה
import { menu_list } from '../../assets/assets';  // ייבוא רשימת התפריטים מהנכסים

// קומפוננטת React עבור תפריט הגלישה
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>  // קונטיינר ראשי לתפריט הגלישה
      <h1>Explore Menu</h1>  // כותרת עבור התפריט
      <p className='explore-text'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>  // טקסט המתאר את תכלית התפריט
      <div className="explore-menu-list">  // רשימת הפריטים בתפריט
        {menu_list.map((item, index) => {  // מעבר על כל הפריטים ברשימה והצגתם
          return (
            <div onClick={() => { setCategory(prev => prev === item.menu_name ? "All" : item.menu_name); }} key={index} className='explore-menu-list-item'>  // פריט ברשימה עם אירוע לחיצה שמשנה קטגוריה
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} />  // תמונת התפריט עם הדגשה אם נבחרה
              <p>{item.menu_name}</p>  // שם התפריט
            </div>
          );
        })}
      </div>
      <hr />  // קו מפריד
    </div>
  );
}

export default ExploreMenu;  // ייצוא הקומפוננטה כדי שניתן יהיה להשתמש בה במקומות אחרים באפליקציה
