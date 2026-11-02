import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const authMiddleware = async (req: any, res: any, next: any) => {
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:" Not authorizes!"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = await User.findById((decoded as any).id).select("-password");
        next();
    }catch(error){

    }
}