import User from "../models/user.model"; // MongoDB model import karala
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

const refreshTokens = new Set<string>();

export const authenticateUser = async (email: string, password: string) => {
    try {

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return null;
        }


        const isValidPassword = bcrypt.compareSync(password, existingUser.password);

        if (!isValidPassword) {
            return null;
        }


        const accessToken = jwt.sign({
            id: existingUser.id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            role: existingUser.role
        }, JWT_SECRET, { expiresIn: "24h" });

        const refreshToken = jwt.sign({
            email: existingUser.email
        }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

        refreshTokens.add(refreshToken);

        return {
            accessToken,
            refreshToken,
            user: {
                id: existingUser.id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                role: existingUser.role
            }
        };

    } catch (error) {
        console.error("Authentication error:", error);
        return null;
    }
};