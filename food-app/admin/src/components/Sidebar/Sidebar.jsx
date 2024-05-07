import React from 'react';
import './Sidebar.css';  // ייבוא קבצי סטיילים עבור הסיידבר
import { assets } from '../../assets/assets';  // ייבוא האסטים של האפליקציה
import { NavLink } from 'react-router-dom';  // ייבוא רכיב לניווט בין דפים

// קומפוננטת Sidebar
const Sidebar = () => {
  return (
    <div className='sidebar'>  // קונטיינר עבור הסיידבר
      <div className="sidebar-options">  // קונטיינר עבור האפשרויות בסיידבר
        <NavLink to='/add' className="sidebar-option">  // קישור ניווט לדף הוספת פריטים
          <img src={assets.order_icon} alt="" />  // תמונה לקישור
          <p>Add Items</p>  // טקסט של הקישור
        </NavLink>
        <NavLink to='/list' className="sidebar-option">  // קישור ניווט לדף רשימת פריטים
          <img src={assets.order_icon} alt="" />  // תמונה לקישור
          <p>List Items</p>  // טקסט של הקישור
        </NavLink>
        <NavLink to='/order' className="sidebar-option">  // קישור ניווט לדף הזמנות
          <img src={assets.order_icon} alt="" />  // תמונה לקישור
          <p>Orders</p>  // טקסט של הקישור
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;  // ייצוא הקומפוננטה כדי שניתן יהיה להשתמש בה במקומות אחרים באפליקציה
