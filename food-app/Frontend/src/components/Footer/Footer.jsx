import React from 'react'; // מייבאים את מודול ה-React מהספרייה של React
import './Footer.css'; // מייבאים את קובץ ה-CSS של ה-Footer
import { assets } from '../../assets/assets'; // מייבאים את קובץ ה-assets מהתיקייה assets בתוך התיקייה assets

// קומפוננטת Footer היא פונקציונלית, משתמשת בסינטקסיס של ES6
const Footer = () => {
  return (
    <div className='footer' id="footer"> {/* יצירת אלמנט div עם מחלקת CSS שנקראת 'footer' ועם זיהוי ייחודי של 'footer' */}
      <div className="footer-content"> {/* יצירת קלט div עם מחלקת CSS שנקראת 'footer-content' */}
        <div className="footer-content-left"> {/* יצירת קלט div עם מחלקת CSS שנקראת 'footer-content-left' */}
          <img src={assets.logo} className='logo' /> {/* יצירת תמונה מתוך ה-assets */}
          <p>
            {/* יצירת פסקה */}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod quis nobis nostrum tempora ut hic dolor debitis quidem officia consectetur alias reiciendis vel placeat dolorem nulla culpa, cumque cupiditate est?,
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dolorum eveniet magni iusto! Odit, possimus atque accusamus, molestias quos numquam explicabo ad veniam vero deleniti ullam minus voluptatem dolorum nulla?
          </p>
          <div className="footer-social-icons"> {/* יצירת קלט div עם מחלקת CSS שנקראת 'footer-social-icons' */}
            <img src={assets.facebook_icon} alt="" /> {/* יצירת תמונה מתוך ה-assets */}
            <img src={assets.twitter_icon} alt="" /> {/* יצירת תמונה מתוך ה-assets */}
            <img src={assets.linkedin_icon} alt="" /> {/* יצירת תמונה מתוך ה-assets */}
          </div>
        </div>
        <div className="footer-content-center"> {/* יצירת קלט div עם מחלקת CSS שנקראת 'footer-content-center' */}
          <h2>Company</h2> {/* יצירת כותרת של רמה 2 */}
          <ul>
            <li>Home</li> {/* יצירת רשימת פריטים */}
            <li>About Us</li> {/* יצירת רשימת פריטים */}
            <li>Delivery</li> {/* יצירת רשימת פריטים */}
            <li>Private Policy</li> {/* יצירת רשימת פריטים */}
          </ul>
        </div>
        <div className="footer-content-right"> {/* יצירת קלט div עם מחלקת CSS שנקראת 'footer-content-right' */}
          <h2>Get In Touch</h2> {/* יצירת כותרת של רמה 2 */}
          <ul>
            <li>+972-537171884</li> {/* יצירת רשימת פריטים */}
            <li>Shayelisha2312@gmail.com</li> {/* יצירת רשימת פריטים */}
          </ul>
        </div>
      </div>
      <hr /> {/* הכנסת קו אופקי */}
      <p className='copyright'>Copyright 2024 &copy; Shay Elisha- All Right Reserved.</p>
    </div>
  );
};

export default Footer; // יצוא הקומפוננטה Footer כברירת מחדל עבור שימוש במקום אחר בקוד
