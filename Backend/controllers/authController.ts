import bcrypt from "bcryptjs"
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { generateUniqueConnectCode } from "../utils/generateUniqueConneectCode.js";
class AuthController {
    static async register(req: any, res: any) {
        try {
            const {fullname, username, email, password} = req.body;

            if(!fullname || !username || !email || !password){
                return res.status(400).json({message: "All fields are required"});
            }
            if((password.length < 6)){
                return res.status(400).json({message:"Password must be at least 8 chars"});
            }

            const existingUser = await User.findOne({
                $or: [{username}, {email}]
            });

            if(existingUser){
                return res.status(400).json({message: "the user is already exist"});
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const connectCode = await generateUniqueConnectCode();

            const user = new User({
                username, 
                fullname, 
                email,
                password: hashedPassword,
                connectCode,
            });

            await user.save();
            res.status(200).json({success:true});

            
        }catch(error){
            console.error("Regestration errror: ", error);
            res.status(500).json({message: "internal server error"});
        }
    }

    // Login functionality 
    static async Login(req: any, res:any){
        try {
            const {email, password} = req.body;
            if(!email || !password) {
                return res.status(400).json({message: "Invalid email or password"});}
            
                const user = await User.findOne({email});

                if (!user) {
                    return res.status(400).json({
                        message: "Invalid email or password",
                    });
                }
                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(400).json({
                        message: "Invalid email or password",
                    });
                }
                // generating jsonwebtoken and store it in cookie 
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET!, {expiresIn: "3d"});

                res.cookie("jwt", token, {
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", // Set to true in production
                    sameSite: "strict", // Adjust based on your requirements
                });
                res.status(200).json({
                    message: "Login successful",
                    user: {
                        id: user._id,
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                        connectCode: user.connectCode,
                    }
                });
        } catch (error) {
            console.error("Login error: ", error);
            res.status(500).json({message: "internal server error"});
        }
    }

    // Logout functionality 

    static async Logout(req:any, res:any){
        try {
            const token = req.token;

            res.clearCookie("jwt", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            res.status(200).json({success: true, message: "Logout successful"
            });
        } catch (error) {
            console.error("Login error: ", error);
            res.status(500).json({message: "internal server error"});
        } 
    }

    // find user by id 
    static async findUser(req:any, res:any) {
        try{
            const {id} = req.params;
            const user = await User.findById(id);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json({message: "User found: ", 
                user: {
                    id: user._id,
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                        connectCode: user.connectCode,
                }
            });
        }catch(error){
            console.error("Find user error: ", error);
            res.status(500).json({message: "internal server error"});
        }
    }
}

export default AuthController;