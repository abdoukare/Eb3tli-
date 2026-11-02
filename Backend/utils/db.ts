import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if(!uri) throw new Error("MONGO_URI is not defined in the environment variables");

    try{
        await mongoose.connect(uri, {dbName: "eb3tli"})
    }catch(error){
        console.error("Failed to connect to the database", error);
        process.exit(1);
    }
}