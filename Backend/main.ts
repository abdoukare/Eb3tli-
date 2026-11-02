import dotenv from "dotenv"
dotenv.config();

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import http from "http"
import { connectDB } from "./utils/db.js";
import authRouter from "./routes/authRouter.js";

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}))
app.use(cookieParser());

app.use(express.json());
app.use('/api/auth', authRouter);
try{
await connectDB();
console.log("Mongodb connected")
const port = process.env.PORT || 4000;


httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

}catch(error){
    console.error("An error occurred while starting the server", error);
    process.exit(1);
}   