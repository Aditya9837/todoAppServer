import jwt from 'jsonwebtoken';
import { User } from "../models/users.js";

export const isAuthenticated = async (req, res, next) => { // Add req, res, next parameters
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login First"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded._id);
        next();

    } catch (error) {
        return res.status(500).json({ // Return the response
            success: false,
            message: error.message,
        });
    }
};
