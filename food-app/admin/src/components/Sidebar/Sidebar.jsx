import React from 'react';
import './Sidebar.css';  // ייבוא קבצי סטיילים עבור הסיידבר
import { assets } from '../../assets/assets';  // ייבוא האסטים של האפליקציה
import { NavLink } from 'react-router-dom';  // ייבוא רכיב לניווט בין דפים

// קומפוננטת Sidebar
const Sidebar = () => {
  return (
    <div className='sidebar'>  
      <div className="sidebar-options">  
        <NavLink to='/add' className="sidebar-option"> 
          <img src={assets.order_icon} alt="" />  
          <p>Add Items</p>  
        </NavLink>
        <NavLink to='/list' className="sidebar-option">  
          <img src={assets.order_icon} alt="" /> 
          <p>List Items</p>  
        </NavLink>
        <NavLink to='/order' className="sidebar-option">  
          <img src={assets.order_icon} alt="" /> 
          <p>Orders</p>  
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;  // ייצוא הקומפוננטה כדי שניתן יהיה להשתמש בה במקומות אחרים באפליקציה
