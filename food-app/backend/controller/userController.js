import userModel from "../modules/usermodel.js"; // ייבוא מודול של מודל המשתמש
import jwt from "jsonwebtoken"; // ייבוא מודול עבור יצירת ואימות טוקנים
import bcrypt from "bcrypt"; // ייבוא מודול להצפנת סיסמאות
import validator from "validator"; // ייבוא מודול לוולידציה של נתונים (כמו אימייל)
import "dotenv/config"; // ייבוא קובץ ה-config לטעינת משתני סביבה
import { log } from "console"; // ייבוא פונקציית הדפסה לקונסול

// פונקציה להתחברות משתמש
const loginUser = async (req, res) => {
     const { email, password } = req.body; // שליפת אימייל וסיסמה מהבקשה
     try {
          const user = await userModel.findOne({ email }); // חיפוש משתמש לפי אימייל

          if (!user) {
               return res.json({ success: false, message: "User doesn't exist" });
          }
          const isMatch = await bcrypt.compare(password, user.password); // בדיקה אם הסיסמה נכונה
          if (!isMatch) {
               return res.json({ success: false, message: "Invalid credentials" });
          }
          const token = createToken(user._id); // יצירת טוקן למשתמש
          res.json({ success: true, token });
     } catch (error) {
          console.log(error);
          res.json({ success: false, message: "Error" });
     }
};

// פונקציה ליצירת טוקן
const createToken = (id) => {
     return jwt.sign({ id }, process.env.JWT_SECRET); // חתימה על הטוקן עם מזהה המשתמש
};

// פונקציה לרישום משתמש חדש
const registerUser = async (req, res) => {
     const { name, email, password } = req.body; // שליפת שם, אימייל וסיסמה מהבקשה
     const exist = await userModel.findOne({ email }); // בדיקה אם המשתמש כבר קיים
     try {
          if (exist) {
               return res.json({
                    success: false, message: "User already exists"
               });
          }
          if (!validator.isEmail(email)) {
               return res.json({ success: false, message: "Please enter valid email" });
          }
          if (password.length < 8) {
               return res.json({ success: false, message: "Please enter a strong password" });
          }

          // תהליך הצפנת סיסמה
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const newUser = new userModel({
               name: name,
               email: email,
               password: hashedPassword
          });
          const user = await newUser.save(); // שמירת המשתמש החדש במסד הנתונים
          const token = createToken(user._id); // יצירת טוקן למשתמש החדש
          res.json({ success: true, token });

     } catch (error) {
          console.log(error);
          res.json({ success: false, message: "Error" });
     }
};

export { loginUser, registerUser }; // ייצוא הפונקציות לשימוש חוץ
