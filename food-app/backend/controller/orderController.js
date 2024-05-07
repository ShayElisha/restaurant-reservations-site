import orderModel from '../modules/orderModel.js'; // ייבוא מודל הזמנות
import userModel from '../modules/usermodel.js'; // ייבוא מודל משתמשים
import Stripe from 'stripe'; // ייבוא מודול Stripe לעיבוד תשלומים
import "dotenv/config"; // ייבוא הגדרות משתני סביבה

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // יצירת מופע של Stripe עם מפתח סודי

// הזמנת משתמש
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174"; // כתובת ה-frontend

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save(); // שמירת ההזמנה במסד נתונים
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); // ריקון עגלת הקניות של המשתמש

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "ils",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 3.72 // מרווח עבור מחיר בשקלים
            },
            quantity: item.quantity
        }));
        line_items.push({
            price_data: {
                currency: "ils",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 3.72 // עלות משלוח
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// אימות הזמנה
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        res.json({ success: false, message: "error" });
    }
};

// רשימת ההזמנות של משתמש לפי ממשק המשתמש
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// רשימת כל ההזמנות
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: true, data: orders });
    }
};

// עדכון סטטוס הזמנה
const updateStatus = async (req, res) => {
    const updatedOrder = await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status }, { new: true });
    if (updatedOrder) {
        res.json({ success: true, message: "Status Updated" });
    } else {
        res.json({ success: false, message: "Order not found" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }; // ייצוא כל הפונקציות
