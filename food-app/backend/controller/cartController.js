import userModel from '../modules/usermodel.js'; // ייבוא מודל המשתמש

// הוספת פריטים לעגלת הקניות של המשתמש
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.body.userId }); // מציאת נתוני המשתמש לפי זיהוי
        let cartData = await userData.cartData; // שליפת נתוני העגלה מהמשתמש
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1; // אם המוצר לא קיים בעגלה, הוספתו עם כמות 1
        } else {
            cartData[req.body.itemId] += 1; // אם המוצר כבר קיים, הגדלת כמותו בעגלה
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData }); // עדכון נתוני העגלה במסד הנתונים
        res.json({ success: true, message: "Added To Cart" }); // החזרת מענה חיובי
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); // החזרת שגיאה במקרה של תקלה
    }
};

// הסרת פריטים מעגלת הקניות של המשתמש
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.body.userId }); // מציאת נתוני המשתמש לפי זיהוי
        let cartData = await userData.cartData; // שליפת נתוני העגלה מהמשתמש
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1; // חיסור כמות המוצר מהעגלה אם הכמות גדולה מאפס
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData }); // עדכון נתוני העגלה במסד הנתונים
        res.json({ success: true, message: "Removed From Cart" }); // החזרת מענה חיובי
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); // החזרת שגיאה במקרה של תקלה
    }
};

// שליפת נתוני העגלה של המשתמש
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.body.userId }); // מציאת נתוני המשתמש לפי זיהוי
        let cartData = await userData.cartData; // שליפת נתוני העגלה מהמשתמש
        res.json({ success: true, cartData }); // החזרת נתוני העגלה
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); // החזרת שגיאה במקרה של תקלה
    }
};

export { addToCart, removeFromCart, getCart }; // ייצוא הפונקציות לשימוש חוץ
