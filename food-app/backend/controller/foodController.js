import foodModel from "../modules/foodModel.js"; // ייבוא מודל המזון
import fs from 'fs'; // ייבוא מודול fs לטיפול בקבצים

// הוספת מוצר למאגר
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`; // שמירת שם קובץ התמונה
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        await food.save(); // שמירת המוצר במסד הנתונים
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
    }
};

// רשימת כל המזון
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({}); // שליפת כל המזון ממסד הנתונים
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
    }
};

// מחיקת מוצר מזון
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id); // חיפוש המוצר לפי ID
        fs.unlink(`uploads/${food.image}`, () => {}); // מחיקת התמונה מהשרת
        await foodModel.findByIdAndDelete(req.body.id); // מחיקת המוצר ממסד הנתונים
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removed" });
    }
};

export { addFood, listFood, removeFood }; // ייצוא הפונקציות לשימוש חוץ
