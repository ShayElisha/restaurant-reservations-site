import { createContext, useEffect, useState } from "react";  // ייבוא של יכולות של React כולל createContext ליצירת קונטקסט, וה-hooks useEffect ו-useState
export const StoreContext = createContext(null)  // יצירת קונטקסט עם ערך ברירת מחדל null
import axios from 'axios'  // ייבוא של ספריית axios לביצוע בקשות HTTP

const StoreContextProvider = (props) => {

     const [cartItem, setCartItem] = useState({})  // משתנה מצב לשמירת פרטי עגלת הקניות
     const url = "http://localhost:4000/"  // כתובת השרת לבקשות API
     const [token, setToken] = useState("")  // משתנה מצב לשמירת טוקן המשתמש
     const [food_list, setFoodList] = useState([])  // משתנה מצב לשמירת רשימת המאכלים

     const addToCart = async (itemId) => {  // פונקציה להוספת פריט לעגלה
          console.log("Adding item to cart, ID:", itemId);
          if (!cartItem[itemId]) {
              setCartItem((prev) => ({...prev, [itemId]: 1}));
          } else {
              setCartItem((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
          }
          if(token){
               await axios.post(url + "api/cart/add", {itemId}, {headers: {token}})
          }
      }
      
     const removeFromCart = async (itemId) => {  // פונקציה להסרת פריט מהעגלה
          setCartItem((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
          if(token){
               await axios.post(url + "api/cart/remove", {itemId}, {headers: {token}})
          }
     }      
     
     const getTotalCartAmount = () => {  // פונקציה לחישוב סכום כולל של העגלה
          let totalAmount = 0;
          for (const item in cartItem) {
              if (cartItem[item] > 0) {
                  let itemInfo = food_list.find((product) => product._id === item);
                  if (itemInfo) { 
                      totalAmount += itemInfo.price * cartItem[item];
                  } 
              }
          }
          return totalAmount;
      }

     const fetchFoodList = async () => {  // פונקציה לשליפת רשימת מאכלים מהשרת
          const response = await axios.get(url + "api/food/list")
          setFoodList(response.data.data)
          console.log("Fetched food list:", response.data.data);
     }

     const loadCartData = async (token) => {  // פונקציה לטעינת נתוני עגלת הקניות
          const response = await axios.post(url + "api/cart/get", {}, {headers: {token}})
          setCartItem(response.data.cartData)
     }

     useEffect(() => {  // טעינת נתונים בעת טעינת הקומפוננטה
          async function loadData() {
               await fetchFoodList();
               if (localStorage.getItem("token")) {
                    setToken(localStorage.getItem("token"))
                    await loadCartData(localStorage.getItem("token"))
               }
          }
          loadData();
     }, [])

     const contextValue = {  // ערך הקונטקסט שיועבר לצרכנים
          food_list,
          cartItem,
          setCartItem,
          addToCart,
          removeFromCart,
          getTotalCartAmount,
          url,
          token,
          setToken
     }
     return (
          <StoreContext.Provider value={contextValue}>  // ספק הקונטקסט
               {props.children}
          </StoreContext.Provider>
     )
}

export default StoreContextProvider  // ייצוא הקומפוננטה לשימוש כספק קונטקסט באפליקציה
