import React, { useState } from 'react'  // ייבוא של React וה-hook useState לניהול מצב ברכיב
import './Home.css'  // ייבוא קובץ ה-CSS שמגדיר את העיצוב של עמוד הבית
import Header from '../../components/Header/Header'  // ייבוא של רכיב ה-Header
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'  // ייבוא של רכיב ExploreMenu לסיור בתפריט
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'  // ייבוא של רכיב FoodDisplay להצגת מאכלים
import AppDownload from '../../components/AppDownload/AppDownload'  // ייבוא של רכיב AppDownload להורדת האפליקציה

const Home = () => {

  const [category, setCategory] = useState("All")  // יצירת משתנה מצב לניהול קטגוריית המאכלים הנבחרת, עם ערך ברירת מחדל "All"

  return (
    <div>
      <Header/>  
      <ExploreMenu category={category} setCategory={setCategory}/>  
      <FoodDisplay category={category}/>  
      <AppDownload/>  
    </div>
  )
}

export default Home  // ייצוא הרכיב Home לשימוש בחלקים אחרים של האפליקציה
