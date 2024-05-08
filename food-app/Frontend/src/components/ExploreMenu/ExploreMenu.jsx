import React from 'react';
import './ExploreMenu.css';  // ייבוא קבצי סטיילים עבור הקומפוננטה
import { menu_list } from '../../assets/assets';  // ייבוא רשימת התפריטים מהנכסים

// קומפוננטת React עבור תפריט הגלישה
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>  
      <h1>Explore Menu</h1>  
      <p className='explore-text'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>  // טקסט המתאר את תכלית התפריט
      <div className="explore-menu-list">  
        {menu_list.map((item, index) => {  // מעבר על כל הפריטים ברשימה והצגתם
          return (
            <div onClick={() => { setCategory(prev => prev === item.menu_name ? "All" : item.menu_name); }} key={index} className='explore-menu-list-item'>  
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} />  
              <p>{item.menu_name}</p>  
            </div>
          );
        })}
      </div>
      <hr />  
    </div>
  );
}

export default ExploreMenu;  // ייצוא הקומפוננטה כדי שניתן יהיה להשתמש בה במקומות אחרים באפליקציה
