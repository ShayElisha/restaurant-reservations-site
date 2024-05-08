import React from 'react'; // מייבאים את מודול ה-React מהספרייה של React
import './Header.css'; // מייבאים את קובץ ה-CSS של ה-Header

// קומפוננטת Header היא פונקציונלית, משתמשת בסינטקסיס של ES6
const Header = () => {
  return (
    <div className='header'> 
      <div className="header-contents"> 
        <h2>Order your favorite food here</h2> 
        <p>
          Choose from a diverse menu featuring a delectable array of dishes craft with the finest ingredients and culinary expertise.
          Our mission is to satisfy your carvings and elevate your dining experience, one delicious meal at a time
        </p> 
        <button>View Menu</button> 
      </div>
    </div>
  );
};

export default Header; // יצוא הקומפוננטה Header כברירת מחדל עבור שימוש במקום אחר בקוד

